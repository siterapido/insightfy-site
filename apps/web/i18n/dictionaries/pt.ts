import type { Dictionary } from "../types";

/** pt-BR copy — professional placeholders, refined later by the copy agent. */
export const pt: Dictionary = {
  nav: {
    links: [
      { label: "Serviços", href: "#pilares" },
      { label: "Agentes", href: "#agentes" },
      { label: "Processo", href: "#processo" },
      { label: "Casos", href: "#casos" },
    ],
    cta: "Agendar conversa",
  },
  hero: {
    badge: "Software house · Sistemas + Agentes de IA",
    titleLines: ["Engenharia sob medida", "e agentes de IA em produção"],
    subtitle:
      "Transformamos processos manuais e ideias em sistemas sob medida e agentes de IA que rodam de verdade — do MVP ao produto em produção.",
    ctaPrimary: "Agendar diagnóstico",
    ctaSecondary: "Ver casos",
    terminalTitle: "insightfy@deploy:~",
  },
  socialProof: {
    label: "Times e empresas que confiam na Insightfy",
  },
  pillars: {
    title: "O que construímos",
    subtitle: "Três frentes que se conectam: engenharia sólida, IA aplicada e produtos próprios.",
    items: {
      systems: {
        title: "Sistemas sob medida",
        description:
          "Aplicações web e SaaS desenhadas para o seu processo, do MVP ao produto em produção.",
        bullets: ["Web e SaaS", "Integrações e APIs", "Do MVP à escala"],
      },
      agents: {
        title: "Agentes de IA",
        description:
          "Automações inteligentes para atendimento, dados, operações e integrações.",
        bullets: ["Atendimento", "Análise de dados", "Automação de fluxos"],
      },
      products: {
        title: "Produtos próprios",
        description:
          "CRM e ferramentas SaaS da Insightfy, em desenvolvimento ativo.",
        bullets: ["CRM", "Ferramentas SaaS", "Roadmap aberto"],
      },
    },
  },
  agentsDemo: {
    title: "Agentes Insightfy em ação",
    subtitle: "Logs reais de agentes resolvendo casos de cliente em paralelo.",
    agents: [
      {
        name: "AGENT-01 // ATENDIMENTO",
        task: "Triagem e resposta de tickets",
        logs: [
          "› recebendo ticket #4821",
          "› classificando intenção: suporte",
          "✓ resposta enviada em 1.2s",
        ],
      },
      {
        name: "AGENT-02 // DADOS",
        task: "Pipeline de relatórios",
        logs: [
          "› extraindo métricas do período",
          "› consolidando 12 fontes",
          "✓ relatório gerado",
        ],
      },
      {
        name: "AGENT-03 // INTEGRAÇÃO",
        task: "Sincronização entre sistemas",
        logs: [
          "› conectando ERP ↔ CRM",
          "› mapeando 340 registros",
          "✓ sincronização concluída",
        ],
      },
    ],
  },
  metrics: {
    items: [
      { value: "30+", label: "Projetos entregues" },
      { value: "99.9%", label: "Uptime em produção" },
      { value: "10x", label: "Mais rápido com agentes" },
      { value: "24/7", label: "Automações ativas" },
    ],
  },
  process: {
    title: "Como trabalhamos",
    subtitle: "Um processo enxuto, do diagnóstico à entrega contínua.",
    steps: [
      { title: "Diagnóstico", description: "Entendemos seu processo, dores e objetivos." },
      { title: "Arquitetura", description: "Desenhamos a solução e o plano de entrega." },
      { title: "Construção", description: "Desenvolvemos com engenharia sólida e agentes de IA." },
      { title: "Operação", description: "Colocamos em produção e evoluímos continuamente." },
    ],
  },
  cases: {
    title: "Casos e portfólio",
    subtitle: "Exemplos de sistemas e agentes que construímos.",
    items: [
      {
        title: "Automação de atendimento",
        summary: "Agente de IA que reduziu o tempo de resposta de tickets.",
        tags: ["IA", "Atendimento", "Integração"],
      },
      {
        title: "Plataforma SaaS sob medida",
        summary: "Do MVP ao produto em produção para um cliente B2B.",
        tags: ["SaaS", "Web", "MVP"],
      },
      {
        title: "Pipeline de dados",
        summary: "Consolidação de fontes e relatórios automáticos.",
        tags: ["Dados", "Automação"],
      },
    ],
  },
  finalCta: {
    title: "Vamos construir o seu próximo sistema",
    subtitle:
      "Conte seu desafio. Retornamos com um diagnóstico e os próximos passos.",
    form: {
      name: "Nome",
      email: "E-mail",
      company: "Empresa",
      message: "Como podemos ajudar?",
      submit: "Enviar mensagem",
    },
    successMessage: "Mensagem enviada! Em breve entraremos em contato.",
  },
  footer: {
    tagline: "Insightfy — sistemas sob medida e agentes de IA.",
    columns: [
      {
        title: "Empresa",
        links: [
          { label: "Serviços", href: "#pilares" },
          { label: "Processo", href: "#processo" },
          { label: "Casos", href: "#casos" },
        ],
      },
      {
        title: "Recursos",
        links: [
          { label: "Agentes", href: "#agentes" },
          { label: "Contato", href: "#contato" },
        ],
      },
    ],
    copyright: "© 2026 Insightfy. Todos os direitos reservados.",
  },
};
