const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fragosnexus.ai";

const faqs: [string, string][] = [
  [
    "¿Qué hace Frago's Nexus Intelligence?",
    "Diseñamos e implementamos infraestructura de IA a medida para empresas: agentes, automatización de procesos, sistemas RAG e integración de LLMs en operaciones reales.",
  ],
  [
    "¿Cuánto cuesta un proyecto de IA?",
    "Cada engagement se define según alcance y objetivos. Los proyectos suelen empezar desde un piloto acotado y escalan a medida que se valida el retorno. Agenda un briefing sin compromiso para una estimación.",
  ],
  [
    "¿En cuánto tiempo se ven resultados?",
    "Un piloto típico entrega valor medible en 4 a 8 semanas. Trabajamos en ciclos cortos para validar impacto antes de escalar.",
  ],
  [
    "¿Trabajan en remoto?",
    "Sí. Operamos desde Madrid con clientes en remoto a nivel global.",
  ],
];

export function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#organization`,
        name: "Frago's Nexus Intelligence",
        url: SITE_URL,
        description:
          "Infraestructura de IA de élite para empresas que operan en la frontera. Agentes, automatización, RAG e integración de LLMs.",
        areaServed: "Worldwide",
        knowsAbout: [
          "Artificial Intelligence",
          "Machine Learning",
          "LLM",
          "RAG",
          "AI Agents",
          "Automation",
          "Enterprise AI",
        ],
        slogan: "Build smarter. Scale faster.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Madrid",
          addressCountry: "ES",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Frago's Nexus Intelligence",
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "es",
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: faqs.map(([q, a]) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

export { faqs };
