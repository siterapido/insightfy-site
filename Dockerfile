# syntax=docker/dockerfile:1
#
# Multi-stage build for the Next.js standalone app (@insightfy/web) in a
# pnpm + Turborepo monorepo. Produces a small runtime image.
#
# Next.js `output: "standalone"` in a monorepo PRESERVES the workspace path:
#   .next/standalone/apps/web/server.js   <-- entrypoint
#   .next/standalone/apps/web/.next/      <-- server chunks
#   .next/standalone/node_modules/        <-- pruned deps (hoisted at root)
# Static assets are NOT bundled into standalone and must be copied separately:
#   apps/web/.next/static  and  apps/web/public

# ---------- base ----------
FROM node:20-alpine AS base
# libc compat for some native deps; safe no-op otherwise.
RUN apk add --no-cache libc6-compat
# Enable pnpm via corepack, pinned to the version in root package.json.
RUN corepack enable && corepack prepare pnpm@9.12.3 --activate
WORKDIR /app

# ---------- deps ----------
# Install workspace deps using only manifests so this layer is cached until a
# package.json or the lockfile changes. Each manifest is copied to its real
# path so pnpm can resolve the workspace graph.
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY packages/config/package.json ./packages/config/package.json
COPY packages/ui/package.json     ./packages/ui/package.json
COPY packages/db/package.json     ./packages/db/package.json
COPY apps/web/package.json        ./apps/web/package.json
COPY apps/crm/package.json        ./apps/crm/package.json
RUN pnpm install --frozen-lockfile

# ---------- build ----------
FROM base AS build
ENV NEXT_TELEMETRY_DISABLED=1
# Reuse installed node_modules, then bring in the full source.
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages ./packages
COPY --from=deps /app/apps ./apps
COPY . .
# Ensure public/ exists so the runner COPY never fails (it may be absent in v1).
RUN mkdir -p apps/web/public
RUN pnpm --filter @insightfy/web build

# ---------- runner ----------
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Run as an unprivileged user.
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Standalone server + its node_modules (paths preserve the apps/web/ prefix).
COPY --from=build --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
# Static assets and public files go next to the standalone server output.
COPY --from=build --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=build --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

USER nextjs
EXPOSE 3000

# Entrypoint lives under apps/web/ because of the monorepo standalone layout.
CMD ["node", "apps/web/server.js"]
