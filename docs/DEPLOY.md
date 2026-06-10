# Deploy na VPS — Insightfy

Guia para publicar a LP (`apps/web`) em uma VPS com **Docker Compose + Caddy** (HTTPS automático via Let's Encrypt).

## Pré-requisitos

- VPS com Linux (Ubuntu 22.04+ recomendado), acesso SSH.
- **Docker** e **Docker Compose** v2 instalados.
- Domínio **insightfy.com.br** com registro **A** apontando para o IP público da VPS.
- Opcional: registro **A** para `www.insightfy.com.br` (o Caddy redireciona para o apex).

## 1. Preparar a VPS

```bash
# Exemplo Ubuntu — instalar Docker
sudo apt update && sudo apt install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update && sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo usermod -aG docker $USER
```

Reconecte o SSH após adicionar o usuário ao grupo `docker`.

## 2. Clonar o repositório

```bash
git clone <URL_DO_REPO> insightfy-site
cd insightfy-site
git checkout feat/lp-scaffold   # ou a branch de produção
```

## 3. Variáveis de ambiente

```bash
cp .env.example .env
```

Edite `.env`:

```env
NEXT_PUBLIC_SITE_URL=https://insightfy.com.br
```

## 4. Configurar Caddy

Edite `Caddyfile` na raiz do projeto:

- Substitua `your-email@example.com` pelo e-mail real (notificações ACME).
- Confirme o domínio `insightfy.com.br` (ou ajuste se usar staging).

## 5. Subir os serviços

Na raiz do monorepo:

```bash
docker compose up -d --build
```

Isso sobe:

- **web** — Next.js standalone na porta interna 3000.
- **caddy** — reverse proxy nas portas 80/443 com certificado TLS automático.

Primeira execução: o build do Docker pode levar alguns minutos (`pnpm install` + `next build` dentro da imagem).

## 6. Verificar HTTPS

Após o DNS propagar e os containers estarem `healthy`:

```bash
curl -I https://insightfy.com.br
docker compose logs -f caddy
docker compose logs -f web
```

O Caddy obtém o certificado Let's Encrypt na primeira requisição HTTPS válida ao domínio.

## 7. Atualizar após mudanças no código

```bash
git pull
docker compose up -d --build
```

## Estrutura de deploy

```text
Internet → :443/:80 (Caddy) → web:3000 (Next.js standalone)
```

Volumes nomeados `caddy_data` e `caddy_config` persistem certificados e config do Caddy entre reinícios.

## Troubleshooting

| Problema | Ação |
|----------|------|
| Certificado não emitido | Confirme DNS A → IP da VPS; portas 80/443 abertas no firewall |
| `web` reinicia em loop | `docker compose logs web` — erro de build ou `server.js` não encontrado |
| Página sem CSS | Verifique cópia de `.next/static` no Dockerfile (runner stage) |
| 502 do Caddy | Aguarde `web` subir; `docker compose ps` |

## Standalone (monorepo)

O entrypoint da imagem é:

```bash
node apps/web/server.js
```

O output `standalone` do Next preserva o caminho `apps/web/` dentro do monorepo. Se o build falhar no Docker, rode localmente `pnpm --filter @insightfy/web build` e confira `apps/web/.next/standalone/apps/web/server.js`.
