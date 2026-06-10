# @insightfy/db

> **Status: esqueleto vazio (v1).** Nenhuma implementação ainda — apenas o
> placeholder em `src/index.ts` documentando o schema planejado.

Camada de dados compartilhada da Insightfy. Será implementada **pós-v1**.
Ver `docs/SPEC.md` seção 11 (Roadmap futuro).

## Stack planejada

- **Postgres** — banco relacional (rodando na própria VPS via Docker ou serviço gerenciado).
- **Drizzle ORM** — schema TypeScript type-safe + query builder.
- **drizzle-kit** — geração e aplicação de migrations.

## Schema planejado — tabela `leads`

| Coluna       | Tipo          | Notas                          |
|--------------|---------------|--------------------------------|
| `id`         | serial / uuid | PRIMARY KEY                    |
| `name`       | text          | NOT NULL                       |
| `email`      | text          | NOT NULL                       |
| `company`    | text          | opcional                       |
| `message`    | text          | opcional                       |
| `locale`     | text          | `'pt'` \| `'en'`               |
| `created_at` | timestamptz   | DEFAULT `now()`                |

## Migrations (como vai funcionar)

1. Schema declarado em TypeScript com Drizzle (`src/schema.ts`).
2. `drizzle-kit generate` cria os arquivos SQL de migration.
3. `drizzle-kit migrate` (ou `push`) aplica no banco apontado por `DATABASE_URL`.

## Variáveis de ambiente

```env
# String de conexão Postgres (não versionar — vai no .env)
DATABASE_URL=postgres://user:password@host:5432/insightfy
```

## Consumidores

- **apps/web** — backend do formulário de contato grava cada submissão como um
  `lead` (hoje o form é apenas stub UI; ver SPEC seção 4/10).
- **apps/crm** — lê/gerencia os leads (dashboard + auth) a partir da mesma base.

## Por que está vazio agora

O v1 não persiste dados (form é stub). Adicionar Drizzle/Postgres só quando o
backend do form entrar evita dependências e mudanças no lockfile prematuras (YAGNI).
