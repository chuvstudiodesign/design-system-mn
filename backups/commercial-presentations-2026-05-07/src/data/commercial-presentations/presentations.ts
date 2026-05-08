import type {
  CommercialPresentation,
  CommercialSlide,
  CommercialSlideCard,
  CommercialSlideStat,
  CommercialSlideType,
  CommercialSlideVisual,
} from "./types";
import brasil3Image from "../../../Imagens/Brasil 3.png";
import brasil4Image from "../../../Imagens/Brasil 4.png";
import moinhoImage from "../../../Imagens/Brasil 2 Moinho.png";
import brasil2Image from "../../../Imagens/Brasil 2.png";

type DeckSeed = Omit<CommercialPresentation, "slides"> & {
  thesis: string;
  market: string;
  problem: string;
  behavior: string;
  opportunity: string;
  framework: string[];
  example: string;
  leaderMove: string;
  decisionAxes: string[];
  actionPlan: string[];
  benefits: string[];
  risks: string[];
  recommendations: string[];
  cta: string;
};

const narrativeSteps: Array<{
  type: CommercialSlideType;
  visual: CommercialSlideVisual;
  eyebrow: string;
}> = [
  { type: "cover", visual: "editorial", eyebrow: "Modelo comercial" },
  { type: "statement", visual: "quote", eyebrow: "Tese central" },
  { type: "context", visual: "split", eyebrow: "Contexto" },
  { type: "problem", visual: "dark", eyebrow: "Problema central" },
  { type: "behavior", visual: "map", eyebrow: "Comportamento" },
  { type: "opportunity", visual: "editorial", eyebrow: "Oportunidade" },
  { type: "stats", visual: "stats", eyebrow: "Insight visual" },
  { type: "framework", visual: "matrix", eyebrow: "Framework" },
  { type: "principle", visual: "quote", eyebrow: "Princípio estratégico" },
  { type: "example", visual: "split", eyebrow: "Exemplo aplicado" },
  { type: "leaders", visual: "cards", eyebrow: "Empresas líderes" },
  { type: "decision", visual: "matrix", eyebrow: "Mapa de decisão" },
  { type: "concept", visual: "map", eyebrow: "Bloco conceitual" },
  { type: "turning-point", visual: "dark", eyebrow: "Ponto de virada" },
  { type: "action-plan", visual: "timeline", eyebrow: "Plano de ação" },
  { type: "benefits", visual: "cards", eyebrow: "Benefícios" },
  { type: "risks", visual: "stats", eyebrow: "Riscos de não agir" },
  { type: "recommendations", visual: "cards", eyebrow: "Recomendações" },
  { type: "cta", visual: "editorial", eyebrow: "Próximo passo" },
  { type: "closing", visual: "closing", eyebrow: "Encerramento" },
];

const seeds: DeckSeed[] = [
  {
    id: "deck-01",
    slug: "futuro-negocios-brasil",
    title: "O Futuro\ndos Negócios\nno Brasil",
    subtitle: "Empreendedorismo, transformação de mercado e inovação aplicada.",
    description: "Modelo para abrir conversas estratégicas sobre novos mercados, mudanças econômicas e oportunidades para empresas brasileiras.",
    theme: "Empreendedorismo, transformação de mercado, inovação aplicada",
    style: "Editorial institucional com mapas de oportunidade e blocos de impacto.",
    useCase: "Propostas consultivas, palestras institucionais e reuniões com lideranças.",
    accent: "#5FC318",
    darkAccent: "#0C1C16",
    tags: ["Brasil", "Inovação", "Mercado"],
    thesis: "O futuro dos negócios no Brasil será decidido por empresas que combinam contexto local, tecnologia acessível e execução disciplinada.",
    market: "O mercado brasileiro amadurece enquanto consumidores, distribuição e capital exigem negócios mais claros, digitais e eficientes.",
    problem: "Muitas empresas ainda operam com ferramentas novas e mentalidade antiga: pouca leitura de dados, baixa velocidade e pouca diferenciação.",
    behavior: "Clientes comparam experiências entre setores e esperam conveniência, transparência e resposta rápida em qualquer relação comercial.",
    opportunity: "Transformar conhecimento do mercado local em produtos, canais e ofertas que resolvem dores reais com mais consistência.",
    framework: ["Mercado", "Produto", "Tecnologia", "Execução"],
    example: "Uma empresa regional pode crescer quando troca campanhas soltas por uma oferta recorrente, dados de demanda e atendimento digital.",
    leaderMove: "Líderes criam mecanismos de aprendizado: medem sinais, simplificam ofertas e ajustam a operação antes do mercado obrigar.",
    decisionAxes: ["Atratividade", "Capacidade", "Diferenciação", "Velocidade"],
    actionPlan: ["Mapear fricções do cliente", "Priorizar ofertas escaláveis", "Digitalizar pontos críticos", "Medir aprendizado mensal"],
    benefits: ["Mais previsibilidade comercial", "Oferta mais clara", "Operação menos dependente de improviso"],
    risks: ["Crescer com margem fraca", "Perder relevância por lentidão", "Confundir tecnologia com estratégia"],
    recommendations: ["Comece pelo problema de maior recorrência", "Conecte metas a indicadores de comportamento", "Trate inovação como rotina de gestão"],
    cta: "Escolha uma frente de mercado e\ntransforme em plano de 90 dias.",
  },
];

function statsFor(seed: DeckSeed, index: number): CommercialSlideStat[] {
  const values = [
    ["3x", "mais aprendizado quando hipóteses são testadas em ciclos curtos"],
    ["90 dias", "para transformar tese estratégica em sinais reais de mercado"],
    ["4 camadas", `para organizar ${seed.framework.join(", ").toLowerCase()}`],
  ];

  return values.map(([value, label], statIndex) => ({
    value: statIndex === 1 ? `${90 - index * 3} dias` : value,
    label,
  }));
}

function cardsFrom(items: string[], descriptions: string[]): CommercialSlideCard[] {
  return items.map((item, index) => ({
    title: item,
    description: descriptions[index] ?? "Transforme o conceito em uma prática clara, mensurável e repetível.",
  }));
}

function createSlides(seed: DeckSeed): CommercialSlide[] {
  const content = [
    {
      title: seed.title,
      subtitle: seed.subtitle,
      body: seed.description,
      bullets: seed.tags,
      imageDirection: `Imagem sugerida: composição editorial sobre ${seed.theme.toLowerCase()}, com arquitetura, negócios e tecnologia.`,
      imageSrc: brasil2Image,
      imageAlt: "Visual editorial da apresentação comercial sobre negócios e inovação.",
    },
    {
      title: seed.thesis,
      quote: seed.thesis,
      body: "Uma tese para alinhar liderança, narrativa comercial e prioridades de execução.",
      imageSrc: moinhoImage,
      imageAlt: "Moinho em composição editorial sobre negócios no Brasil.",
    },
    {
      title: "O mercado mudou de ritmo",
      body: seed.market,
      bullets: ["Mais comparação entre experiências", "Ciclos de decisão menos lineares", "Pressão por eficiência e diferenciação"],
      chart: {
        type: "line",
        valueLabel: "Empresas usando IA",
        insight: "A adoção saiu de maioria simples para padrão de mercado em menos de dois anos.",
        source: "McKinsey, State of AI 2025",
        data: [
          { label: "2023", value: 55 },
          { label: "Início 24", value: 72 },
          { label: "Fim 24", value: 78 },
        ],
      },
    },
    {
      title: "O problema não é falta de ferramentas",
      body: seed.problem,
      bullets: ["Decisões fragmentadas", "Baixa clareza de prioridade", "Aprendizado pouco documentado"],
      chart: {
        type: "bar",
        valueLabel: "Adoção em pequenos negócios",
        insight: "A conectividade existe, mas os sistemas que transformam dados em rotina ainda ficam abaixo de 40%.",
        source: "ABDI/Sebrae, Mapa de Maturidade Digital 2024",
        data: [
          { label: "Bases integradas", value: 27 },
          { label: "E-commerce", value: 29 },
          { label: "Cybersegurança", value: 34 },
          { label: "CRM/dados", value: 36 },
        ],
      },
    },
    {
      title: "O comportamento\ndo cliente reorganiza\no jogo",
      body: seed.behavior,
      bullets: ["Menos paciencia para fricção", "Mais valor para confiança", "Mais expectativa por resposta clara"],
      imageSrc: brasil3Image,
      imageAlt: "Visual editorial para o quinto slide da apresentação comercial.",
    },
    {
      title: "A oportunidade está na conexão",
      body: seed.opportunity,
      bullets: ["Contexto real", "Oferta precisa", "Execução consistente"],
      chart: {
        type: "bar",
        valueLabel: "Base digital disponível",
        insight: "O ponto de partida é forte: canais, monitoramento e conectividade já estão presentes em boa parte do mercado.",
        source: "ABDI/Sebrae, Mapa de Maturidade Digital 2024",
        data: [
          { label: "Novos canais", value: 49 },
          { label: "Monitoramento social", value: 51 },
          { label: "Venda social", value: 50 },
          { label: "Internet rápida", value: 86 },
        ],
      },
    },
    {
      title: "Tres sinais para observar agora",
      body: "Use sinais simples para sair da opinião e aproximar a conversa de evidências.",
      stats: statsFor(seed, Number(seed.id.replace("deck-", ""))),
    },
    {
      title: seed.framework.join(" + "),
      body: "Um framework enxuto para organizar decisões sem transformar estratégia em burocracia.",
      cards: cardsFrom(seed.framework, [
        "Onde existe valor real para capturar.",
        "Como a oferta traduz esse valor.",
        "Quais capacidades sustentam a entrega.",
        "Como a rotina transforma plano em resultado.",
      ]),
    },
    {
      title: "A inovação deixa de ser discurso quando vira método",
      quote: "Estratégia boa aparece no calendário, no indicador e no critério de decisão.",
      body: "O ponto não é parecer inovador. É criar uma rotina que melhora a qualidade das escolhas.",
    },
    {
      title: "Como aplicar em uma situação real",
      body: seed.example,
      bullets: ["Reduza a aposta", "Valide com sinal real", "Documente o aprendizado", "Ajuste antes de escalar"],
      chart: {
        type: "line",
        valueLabel: "Práticas de escala",
        secondaryLabel: "Adoção base",
        insight: "O gargalo não é usar IA; é criar práticas de escala, governança e mensuração.",
        source: "McKinsey, State of AI 2025",
        data: [
          { label: "KPIs", value: 19, secondary: 78 },
          { label: "Workflows", value: 21, secondary: 78 },
          { label: "CEO gov.", value: 28, secondary: 78 },
          { label: "Uso IA", value: 78, secondary: 78 },
        ],
      },
    },
    {
      title: "Como empresas líderes fazem",
      body: seed.leaderMove,
      cards: cardsFrom(["Clareza", "Cadencia", "Evidência"], [
        "Traduzem ambição em escolhas compreensíveis.",
        "Criam rituais que mantêm o time em movimento.",
        "Usam dados e feedback para ajustar a rota.",
      ]),
    },
    {
      title: "Mapa de decisão",
      body: "A decisão melhora quando os critérios estão visíveis antes da reunião.",
      cards: cardsFrom(seed.decisionAxes, [
        "Qual é o tamanho da oportunidade?",
        "Temos condições reais de executar?",
        "O mercado percebe diferença?",
        "Quanto tempo até aprender?",
      ]),
    },
    {
      title: "O sistema por\ntrás da narrativa",
      body: "Toda apresentação comercial precisa mostrar uma lógica simples: contexto, tensão, escolha e movimento.",
      bullets: seed.framework,
      imageSrc: brasil4Image,
      imageAlt: "Visual editorial do sistema por trás da narrativa comercial.",
    },
    {
      title: "O ponto de virada",
      body: "A mudança acontece quando a empresa para de acumular iniciativas e passa a operar por prioridades mensuráveis.",
      quote: "Menos dispersão. Mais critério. Mais ritmo.",
    },
    {
      title: "Plano de ação em quatro movimentos",
      body: "Uma sequência prática para transformar a conversa em execução.",
      cards: cardsFrom(seed.actionPlan, [
        "Encontre o ponto com maior impacto percebido.",
        "Converta a prioridade em uma aposta clara.",
        "Crie um ciclo curto de teste e aprendizado.",
        "Revise resultado, ajuste rota e avance.",
      ]),
    },
    {
      title: "Benefícios esperados",
      body: "O valor aparece quando a organização ganha clareza para decidir e consistência para executar.",
      cards: cardsFrom(seed.benefits, [
        "Aumenta qualidade da decisão comercial.",
        "Reduz ruído entre estratégia e rotina.",
        "Cria base para crescimento mais sustentável.",
      ]),
    },
    {
      title: "Riscos de não agir",
      body: "A inércia também é uma escolha, e costuma cobrar juros em velocidade, margem e relevância.",
      stats: seed.risks.map((risk, index) => ({
        value: `0${index + 1}`,
        label: risk,
      })),
    },
    {
      title: "Recomendações para a liderança",
      body: "A apresentação deve terminar com critérios práticos para guiar a próxima decisão.",
      cards: cardsFrom(seed.recommendations, [
        "Foque onde há recorrência e valor claro.",
        "Crie indicadores que revelem comportamento.",
        "Transforme intenção em ritual de gestão.",
      ]),
    },
    {
      title: "Próximo passo",
      body: seed.cta,
      bullets: ["Definir responsável", "Estábelecer prazo", "Escolher indicador", "Agendar revisão"],
      chart: {
        type: "bar",
        valueLabel: "Sinais de valor em IA",
        insight: "Valor aparece antes do impacto financeiro amplo: inovação e experimentação já lideram a curva.",
        source: "McKinsey, State of AI 2025",
        data: [
          { label: "EBIT", value: 39 },
          { label: "Agentes", value: 62 },
          { label: "Inovação", value: 64 },
        ],
      },
    },
    {
      title: "A decisão agora é transformar clareza em movimento",
      subtitle: seed.title,
      body: "Use este modelo como base para propostas, pitches, conversas executivas e narrativas comerciais com mais consistência.",
      quote: "Negócios fortes são construídos quando visão e execução apontam para o mesmo lugar.",
    },
  ];

  return narrativeSteps.map((step, index) => ({
    id: `${seed.slug}-${String(index + 1).padStart(2, "0")}`,
    type: step.type,
    visual: step.visual,
    eyebrow: `${String(index + 1).padStart(2, "0")} / 20 - ${step.eyebrow}`,
    footer: "MASI Negócios - Design System",
    ...content[index],
  })) as CommercialSlide[];
}

export const commercialPresentations: CommercialPresentation[] = seeds.map((seed) => ({
  ...seed,
  slides: createSlides(seed),
}));

export const commercialPresentationCount = commercialPresentations.length;
export const commercialSlideCount = commercialPresentations.reduce(
  (total, presentation) => total + presentation.slides.length,
  0
);
