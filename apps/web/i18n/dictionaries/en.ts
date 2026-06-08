import type { Dictionary } from "../types";

/** EN copy — professional placeholders, refined later by the copy agent. */
export const en: Dictionary = {
  nav: {
    links: [
      { label: "Services", href: "#pilares" },
      { label: "Agents", href: "#agentes" },
      { label: "Process", href: "#processo" },
      { label: "Cases", href: "#casos" },
    ],
    cta: "Book a call",
  },
  hero: {
    badge: "Software house · Systems + AI Agents",
    titleLines: ["Custom engineering", "and AI agents in production"],
    subtitle:
      "We turn manual processes and ideas into custom systems and AI agents that actually run — from MVP to production.",
    ctaPrimary: "Book a diagnosis",
    ctaSecondary: "See cases",
    terminalTitle: "insightfy@deploy:~",
  },
  socialProof: {
    label: "Teams and companies that trust Insightfy",
  },
  pillars: {
    title: "What we build",
    subtitle: "Three connected fronts: solid engineering, applied AI, and our own products.",
    items: {
      systems: {
        title: "Custom systems",
        description:
          "Web and SaaS applications designed for your process, from MVP to production.",
        bullets: ["Web & SaaS", "Integrations & APIs", "MVP to scale"],
      },
      agents: {
        title: "AI agents",
        description:
          "Intelligent automation for support, data, operations, and integrations.",
        bullets: ["Support", "Data analysis", "Workflow automation"],
      },
      products: {
        title: "Our own products",
        description: "Insightfy's CRM and SaaS tools, in active development.",
        bullets: ["CRM", "SaaS tools", "Open roadmap"],
      },
    },
  },
  agentsDemo: {
    title: "Insightfy agents at work",
    subtitle: "Live logs of agents solving client cases in parallel.",
    agents: [
      {
        name: "AGENT-01 // SUPPORT",
        task: "Ticket triage and replies",
        logs: [
          "› receiving ticket #4821",
          "› classifying intent: support",
          "✓ reply sent in 1.2s",
        ],
      },
      {
        name: "AGENT-02 // DATA",
        task: "Reporting pipeline",
        logs: [
          "› extracting period metrics",
          "› consolidating 12 sources",
          "✓ report generated",
        ],
      },
      {
        name: "AGENT-03 // INTEGRATION",
        task: "Cross-system sync",
        logs: [
          "› connecting ERP ↔ CRM",
          "› mapping 340 records",
          "✓ sync complete",
        ],
      },
    ],
  },
  metrics: {
    items: [
      { value: "30+", label: "Projects delivered" },
      { value: "99.9%", label: "Production uptime" },
      { value: "10x", label: "Faster with agents" },
      { value: "24/7", label: "Active automations" },
    ],
  },
  process: {
    title: "How we work",
    subtitle: "A lean process, from diagnosis to continuous delivery.",
    steps: [
      { title: "Diagnosis", description: "We understand your process, pains, and goals." },
      { title: "Architecture", description: "We design the solution and delivery plan." },
      { title: "Build", description: "We develop with solid engineering and AI agents." },
      { title: "Operate", description: "We ship to production and keep improving." },
    ],
  },
  cases: {
    title: "Cases & portfolio",
    subtitle: "Examples of systems and agents we've built.",
    items: [
      {
        title: "Support automation",
        summary: "An AI agent that cut ticket response time.",
        tags: ["AI", "Support", "Integration"],
      },
      {
        title: "Custom SaaS platform",
        summary: "From MVP to production for a B2B client.",
        tags: ["SaaS", "Web", "MVP"],
      },
      {
        title: "Data pipeline",
        summary: "Source consolidation and automated reporting.",
        tags: ["Data", "Automation"],
      },
    ],
  },
  finalCta: {
    title: "Let's build your next system",
    subtitle: "Tell us your challenge. We'll reply with a diagnosis and next steps.",
    form: {
      name: "Name",
      email: "Email",
      company: "Company",
      message: "How can we help?",
      submit: "Send message",
    },
    successMessage: "Message sent! We'll be in touch shortly.",
  },
  footer: {
    tagline: "Insightfy — custom systems and AI agents.",
    columns: [
      {
        title: "Company",
        links: [
          { label: "Services", href: "#pilares" },
          { label: "Process", href: "#processo" },
          { label: "Cases", href: "#casos" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Agents", href: "#agentes" },
          { label: "Contact", href: "#contato" },
        ],
      },
    ],
    copyright: "© 2026 Insightfy. All rights reserved.",
  },
};
