export type Lesson = {
  id: string;
  module: number;
  title: string;
  durationMin: number;
  summary: string;
  objectives: string[];
  videoPlaceholder?: boolean;
};

export const HERMES_COURSE_SLUG = "agente-pessoal-hermes";

export const hermesLessons: Lesson[] = [
  {
    id: "aula-01",
    module: 1,
    title: "Por que Hermes e mapa do ecossistema",
    durationMin: 30,
    summary:
      "Agente auto-melhorável: skills, memória, cron e perfis — visão 2026 para operação Insightfy.",
    objectives: [
      "Diferenciar chat avulso de agente com procedimentos",
      "Nomear CLI, gateway e perfis",
      "Listar 3 tarefas repetíveis para virar skill",
    ],
    videoPlaceholder: true,
  },
  {
    id: "aula-02",
    module: 2,
    title: "Instalação, perfis e primeiro fluxo",
    durationMin: 30,
    summary: "config.yaml, .env por perfil, SOUL.md e primeiro chat com skill.",
    objectives: [
      "Configurar provider sem vazar chave",
      "Reiniciar gateway após .env",
      "Rodar um fluxo com skill_view",
    ],
    videoPlaceholder: true,
  },
  {
    id: "aula-03",
    module: 3,
    title: "Segundo cérebro Markdown/Git",
    durationMin: 30,
    summary: "CONTEXTO, SKILLS, ROTINAS, active_context e Protocolo Mnemosine.",
    objectives: [
      "Executar boot MAP → active_context",
      "Depositar conhecimento no inbox",
      "Commit no SB",
    ],
    videoPlaceholder: true,
  },
  {
    id: "aula-04",
    module: 4,
    title: "Memória persistente (MEMORY / USER)",
    durationMin: 30,
    summary: "O que vai em memory vs skill vs session_search.",
    objectives: [
      "Escrever 3 fatos duráveis compactos",
      "Evitar TODO em memory",
      "Buscar sessão passada",
    ],
    videoPlaceholder: true,
  },
  {
    id: "aula-05",
    module: 5,
    title: "Skills: criar, patch e skill-first",
    durationMin: 30,
    summary: "SKILL.md, skill_manage, espelho repo ↔ perfil Hermes.",
    objectives: [
      "Patch de pitfall após erro",
      "Criar how-to.md versionado",
      "Carregar skill no boot",
    ],
    videoPlaceholder: true,
  },
  {
    id: "aula-06",
    module: 6,
    title: "MCPs e economia de contexto",
    durationMin: 30,
    summary: "context-mode, ctx_execute, política MCP no orquestrador.",
    objectives: [
      "Ler arquivo grande via sandbox",
      "Evitar fan-out MCP",
      "Batch com queries",
    ],
    videoPlaceholder: true,
  },
  {
    id: "aula-07",
    module: 7,
    title: "Modelos, fallback e orçamento",
    durationMin: 30,
    summary: "xAI composer + Grok fallback, Ollama aux, pool Ordem $9/dia.",
    objectives: [
      "Ler ledger_consumo_ordem.py",
      "Escolher modelo por tarefa",
      "Modo frugal quando pool alto",
    ],
    videoPlaceholder: true,
  },
  {
    id: "aula-08",
    module: 8,
    title: "Operação: cron, Kanban e delegação",
    durationMin: 30,
    summary: "no_agent, deliver, insightfy-ops, quando não delegar.",
    objectives: [
      "Criar cron script-only",
      "Card Kanban com DoD",
      "Plano 7 dias de boot",
    ],
    videoPlaceholder: true,
  },
];

export function lessonById(id: string): Lesson | undefined {
  return hermesLessons.find((l) => l.id === id);
}