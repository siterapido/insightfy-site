// @insightfy/db — esqueleto (v1). Sem implementação ainda.
//
// Stack planejada (pós-v1): Postgres + Drizzle ORM.
// Ver docs/SPEC.md seção 11 (Roadmap futuro) e packages/db/README.md.
//
// Schema planejado — tabela `leads` (origem: formulário de contato da LP):
//
//   leads
//   ├─ id          serial / uuid   PRIMARY KEY
//   ├─ name        text            NOT NULL
//   ├─ email       text            NOT NULL
//   ├─ company     text            NULL
//   ├─ message     text            NULL
//   ├─ locale      text            NOT NULL  -- 'pt' | 'en'
//   └─ created_at  timestamptz     NOT NULL DEFAULT now()
//
// Quando implementar:
//   - Adicionar deps `drizzle-orm` + driver Postgres (ex. `postgres` ou `pg`).
//   - Definir o schema Drizzle e exportar daqui (`export const leads = ...`).
//   - Configurar migrations (drizzle-kit) lendo `DATABASE_URL`.
//   - apps/web (backend do form) e apps/crm consomem este pacote.

export const DB_PLACEHOLDER = true;
