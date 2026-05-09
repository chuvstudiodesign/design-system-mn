"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { BarChart3, Boxes, Building2, ChevronLeft, ChevronRight, CircleDollarSign, Cpu, Goal, Layers, Store } from "lucide-react";
import { ChamferedPanel } from "@/components/chamfered-panel";
import { CarouselViewer, POST_H, POST_W } from "../CarouselViewer";

const W = 1080;
const H = 1350;
const PAGE = "#D4D4D4";
const SECTION = "#ECECEC";
const CARD = "#FFFFFF";
const PRIMARY = "#5FC318";
const BRAND = "#AFF000";
const DARK = "#0C1C16";
const TEXT = "#000000";
const MUTED = "#474747";
const RADIUS = 10;
const GAP = 30;
const SECTION_X = 60;
const SECTION_Y = 80;
const FOOTER_LOGO_W = 182 * 2.1 * 1.05 * 1.03;
const SUBTITLE_SIZE = 46;
const CHAMFER = 50.4;
const LOGO_DARK = "/logos/primary/masi-primary-dark.svg";
const LOGO_LIGHT = "/logos/primary/masi-primary-light.svg";
const IMG = "https://images.unsplash.com/";
const CROP = "?auto=format&fit=crop&w=1200&q=80";

type Theme = "light" | "dark";

interface ImageSlot {
  page: number;
  src: string;
}

interface CopyPage {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  support?: string;
  metric?: string;
  context?: string;
  statement?: string;
  source?: string;
  paragraph?: string;
  closingTitle?: string;
  closingInsight?: string;
  finalLine?: string;
  synthesis?: string[];
  items?: Array<{ title: string; detail: string }>;
}

interface SocialPost {
  id: string;
  name: string;
  theme: string;
  accentIcon: ReactNode;
  pages: CopyPage[];
  images: ImageSlot[];
}

const posts: SocialPost[] = [
  {
    id: "ia-servico-implantacao",
    name: "IA virou serviço de implantação",
    theme: "Anthropic, private equity e adoção operacional",
    accentIcon: <Cpu size={86} strokeWidth={1.7} />,
    images: [
      { page: 1, src: "https://www-cdn.anthropic.com/images/4zrzovbb/website/1576ae23eaf481f33bd36ab468171cc69d12361a-1000x1000.svg" },
      { page: 5, src: "https://upload.wikimedia.org/wikipedia/commons/f/f0/The_Blackstone_Group_logo.svg" },
      { page: 7, src: "https://cdn.gs.com/images/goldman-sachs/v1/gs-vertical-lg.svg" },
    ],
    pages: [
      {
        eyebrow: "IA nos negócios",
        title: "IA saiu do laboratório",
        subtitle: "Agora a disputa é levar modelo para dentro da operação.",
      },
      {
        eyebrow: "O movimento",
        title: "Anthropic criou uma firma de IA",
        support: "A empresa nasce para levar Claude a operações críticas de companhias médias, com engenheiros aplicados da Anthropic apoiando soluções sob medida.",
        source: "Anthropic, 4 mai. 2026",
      },
      {
        metric: "4",
        context: "Blackstone, H&F e Goldman entram junto da Anthropic.",
        statement: "O canal virou produto.",
        source: "Anthropic / Blackstone",
      },
      {
        title: "O que isso ensina para empresas",
        items: [
          { title: "Serviço", detail: "tecnologia precisa chegar ao fluxo." },
          { title: "Distribuição", detail: "parceiro acelera adoção." },
          { title: "Operação", detail: "ganho aparece no processo." },
        ],
      },
      {
        eyebrow: "A virada",
        title: "Modelo bom sem implantação vira custo",
        paragraph: "A vantagem não está só em acessar um modelo poderoso. Ela aparece quando a IA entra no fluxo real, reduz retrabalho, ganha dono operacional e passa a ser medida como rotina de negócio.",
      },
      {
        eyebrow: "Consequência",
        statement: "Consultoria vira infraestrutura",
        support: "Quem domina o caminho até a operação captura mais valor que quem só vende acesso.",
        paragraph: "A mensagem é clara: vender software deixa de bastar quando a transformação depende de desenho de processo, integração técnica, treinamento e acompanhamento de resultado.",
      },
      {
        title: "O mercado quer menos promessa",
        paragraph: "Empresas não compram IA. Compram redução de gargalo, tempo e retrabalho, com uma implantação que consiga sobreviver ao dia a dia.",
        synthesis: ["processo", "engenharia", "adoção"],
      },
      {
        closingTitle: "IA vence quando entra no trabalho",
        closingInsight: "O futuro não será decidido só por modelos melhores, mas por quem consegue implantá-los melhor.",
        finalLine: "Estratégia é distribuição aplicada.",
      },
    ],
  },
  {
    id: "enter-vantagem-vertical",
    name: "Enter e a vantagem vertical",
    theme: "IA brasileira, legaltech e especialização",
    accentIcon: <Building2 size={86} strokeWidth={1.7} />,
    images: [
      { page: 1, src: `${IMG}photo-1450101499163-c8848c66ca85${CROP}` },
      { page: 5, src: `${IMG}photo-1554224155-6726b3ff858f${CROP}` },
      { page: 7, src: `${IMG}photo-1573164713714-d95e436ab8d6${CROP}` },
    ],
    pages: [
      { eyebrow: "Brasil e IA", title: "Especializar também escala", subtitle: "A Enter virou unicórnio atacando uma dor específica." },
      {
        eyebrow: "O fato",
        title: "US$ 100M+ em Série B",
        support: "A Série B, liderada pela Founders Fund, avaliou a Enter em US$ 1,2 bilhão e reforçou a tese de um sistema operacional jurídico global.",
        source: "Enter, 5 mai. 2026",
      },
      {
        metric: "10x",
        context: "A empresa afirma que a receita cresceu mais de 10 vezes em um ano.",
        statement: "Nicho pode virar escala.",
        source: "Enter",
      },
      {
        title: "A tese por trás do crescimento",
        items: [
          { title: "Dor cara", detail: "contencioso consome margem." },
          { title: "Base rica", detail: "processos geram dados." },
          { title: "Fluxo claro", detail: "IA atua em tarefas repetíveis." },
        ],
      },
      {
        eyebrow: "Vantagem",
        title: "Verticalizar reduz ruído comercial",
        paragraph: "Quando o problema é específico, produto, venda e entrega falam a mesma língua. A Enter mostra que IA vertical ganha força quando entende dados, rotina e métrica de um setor concreto.",
      },
      {
        eyebrow: "Consequência",
        statement: "O foco criou autoridade",
        support: "A empresa não vende IA genérica. Vende sistema operacional para departamentos jurídicos.",
        paragraph: "Essa diferença muda a conversa comercial: o cliente não avalia uma ferramenta abstrata, mas um sistema que conversa com processos, documentos e riscos já existentes.",
      },
      {
        title: "Para empreender em IA, comece pela dor",
        paragraph: "Mercado grande não basta. A dor precisa ser frequente, cara e mensurável, com dados suficientes para virar produto defensável.",
        synthesis: ["dor", "dados", "workflow"],
      },
      {
        closingTitle: "O nicho certo abre o mercado",
        closingInsight: "Escala não nasce de falar com todos. Nasce de resolver muito bem um problema que importa.",
        finalLine: "Especialização também é estratégia.",
      },
    ],
  },
  {
    id: "checkout-autonomo-varejo",
    name: "Checkout autônomo no varejo brasileiro",
    theme: "Retailtech, fricção operacional e dados",
    accentIcon: <Store size={86} strokeWidth={1.7} />,
    images: [
      { page: 1, src: `${IMG}photo-1556742049-0cfed4f6a45d${CROP}` },
      { page: 5, src: `${IMG}photo-1556742502-ec7c0e9f34b1${CROP}` },
      { page: 7, src: `${IMG}photo-1519389950473-47ba0277781c${CROP}` },
    ],
    pages: [
      { eyebrow: "Varejo", title: "A fila também é custo", subtitle: "A Beepay mostra que fricção operacional pode virar mercado." },
      {
        eyebrow: "A rodada",
        title: "R$ 2M para checkout autônomo",
        support: "A seed foi liderada pelo Comunitá, CVC ligado ao Sicredi, com ACATE Invest e Ventiur para expandir checkout autônomo em pontos físicos.",
        source: "Startups, 7 mai. 2026",
      },
      {
        metric: "44%",
        context: "A CEO afirmou que essa fatia do aporte vai para tecnologia e produto.",
        statement: "Produto puxa escala.",
        source: "Startups",
      },
      {
        title: "O que está em jogo no ponto físico",
        items: [
          { title: "Fila", detail: "perda de tempo vira perda de venda." },
          { title: "Custo", detail: "caixa pesa na operação." },
          { title: "Dados", detail: "loja física aprende em tempo real." },
        ],
      },
      {
        eyebrow: "Operação",
        title: "Autonomia não é só conveniência",
        paragraph: "Ela muda a economia da loja: menos atrito no atendimento, mais disponibilidade de compra e mais dados sobre o comportamento no ponto físico. A fila deixa de ser detalhe e vira variável de margem.",
      },
      {
        eyebrow: "Consequência",
        statement: "O varejo vira software",
        support: "Quando pagamento, acesso e dados ficam no mesmo fluxo, a loja muda de categoria.",
        paragraph: "A loja passa a operar com uma camada digital permanente: ela mede jornada, reduz espera, identifica gargalos e transforma o checkout em infraestrutura de decisão.",
      },
      {
        title: "Pequeno varejo também precisa de sistema",
        paragraph: "A oportunidade está em levar infraestrutura leve para quem não opera como grande rede, mas sofre com as mesmas perdas de tempo, equipe e conversão.",
        synthesis: ["fluxo", "dados", "margem"],
      },
      {
        closingTitle: "O caixa pode deixar de ser gargalo",
        closingInsight: "Toda fricção repetida no cliente vira oportunidade de produto para o empreendedor.",
        finalLine: "Operação também cria vantagem.",
      },
    ],
  },
  {
    id: "okr-nao-e-lista",
    name: "OKR não é lista de metas",
    theme: "Gestão, foco e cadência executiva",
    accentIcon: <Goal size={86} strokeWidth={1.7} />,
    images: [
      { page: 1, src: `${IMG}photo-1506784983877-45594efa4cbe${CROP}` },
      { page: 5, src: `${IMG}photo-1517245386807-bb43f82c33c4${CROP}` },
      { page: 7, src: `${IMG}photo-1552664730-d307ca884978${CROP}` },
    ],
    pages: [
      { eyebrow: "Gestão", title: "OKR não é lista de metas", subtitle: "É um sistema para decidir foco, medida e cadência." },
      {
        eyebrow: "Definição",
        title: "Objetivo diz o que importa",
        support: "O objetivo define uma direção qualitativa; os Key Results medem avanço com resultados quantitativos, sem virar lista de tarefas.",
        source: "Bain / OKR framework",
      },
      {
        metric: "3-5",
        context: "A prática comum usa poucos resultados-chave por objetivo.",
        statement: "Menos meta, mais foco.",
        source: "OKR references",
      },
      {
        title: "Um OKR bom separa três coisas",
        items: [
          { title: "Direção", detail: "onde queremos chegar." },
          { title: "Medida", detail: "como saberemos." },
          { title: "Rotina", detail: "quando ajustamos." },
        ],
      },
      {
        eyebrow: "Erro comum",
        title: "Tarefa não é resultado-chave",
        paragraph: "Lançar campanha é tarefa. Aumentar conversão com prazo, linha de base e dono claro é resultado. O OKR força essa diferença para o time não confundir movimento com progresso.",
      },
      {
        eyebrow: "Consequência",
        statement: "Cadência protege foco",
        support: "Sem revisão semanal, o OKR vira documento bonito e perde poder de decisão.",
        paragraph: "A revisão frequente transforma a meta em gestão: mostra desvio cedo, explicita trade-offs e ajuda o time a cortar esforço que não move resultado.",
      },
      {
        title: "O time precisa ver trade-off",
        paragraph: "OKR só funciona quando deixa claro o que não será prioridade neste ciclo e quando essa escolha aparece na agenda, nas reuniões e nas decisões semanais.",
        synthesis: ["foco", "medida", "revisão"],
      },
      {
        closingTitle: "Meta boa muda comportamento",
        closingInsight: "Se o OKR não altera agenda, reunião e decisão, ele ainda não virou gestão.",
        finalLine: "O valor está na cadência.",
      },
    ],
  },
  {
    id: "ideia-produto-negocio",
    name: "Ideia, produto e negócio",
    theme: "Empreendedorismo, modelo econômico e repetição",
    accentIcon: <CircleDollarSign size={86} strokeWidth={1.7} />,
    images: [
      { page: 1, src: `${IMG}photo-1454165804606-c3d57bc86b40${CROP}` },
      { page: 5, src: `${IMG}photo-1522202176988-66273c2fd55f${CROP}` },
      { page: 7, src: `${IMG}photo-1551836022-d5d88e9218df${CROP}` },
    ],
    pages: [
      { eyebrow: "Empreender", title: "Ideia não é negócio", subtitle: "Crescer exige separar invenção, entrega e modelo econômico." },
      {
        eyebrow: "A confusão",
        title: "Uma ideia ainda não prova mercado",
        support: "A ideia formula uma hipótese; o produto testa uso e entrega; o negócio organiza como a solução cria, entrega e captura valor.",
        source: "Framework editorial MN",
      },
      {
        metric: "3",
        context: "Ideia, produto e modelo econômico respondem perguntas diferentes.",
        statement: "Misturar custa caro.",
        source: "Business model canvas",
      },
      {
        title: "Cada camada pede uma pergunta",
        items: [
          { title: "Ideia", detail: "qual dor existe?" },
          { title: "Produto", detail: "quem usa de novo?" },
          { title: "Negócio", detail: "quem paga e por quê?" },
        ],
      },
      {
        eyebrow: "Produto",
        title: "Produto bom ainda pode perder dinheiro",
        paragraph: "Se aquisição, margem e retenção não fecham, a entrega não sustenta a empresa. Um produto pode encantar usuário e ainda assim falhar como negócio quando o modelo econômico não fecha.",
      },
      {
        eyebrow: "Negócio",
        statement: "Modelo é sistema de troca",
        support: "Ele conecta cliente, proposta de valor, canal, receita, custo e operação.",
        paragraph: "A pergunta deixa de ser apenas se alguém gostou da solução. O teste passa a ser se existe repetição econômica, margem possível e um caminho claro para capturar valor.",
      },
      {
        title: "O empreendedor precisa mudar de pergunta",
        paragraph: "Não basta perguntar se a ideia é boa. Pergunte se ela vira repetição econômica, com cliente recorrente, canal viável e entrega que não destrói margem.",
        synthesis: ["dor", "uso", "margem"],
      },
      {
        closingTitle: "Crescer é fechar o sistema",
        closingInsight: "A empresa nasce quando a solução entrega valor e captura valor de forma repetível.",
        finalLine: "Negócio é repetição com margem.",
      },
    ],
  },
];

const pageStyle: CSSProperties = {
  width: W,
  height: H,
  background: PAGE,
  padding: GAP,
  display: "flex",
  flexDirection: "column",
  gap: GAP,
  color: TEXT,
  fontFamily: "inherit",
};

const sectionBase: CSSProperties = {
  background: SECTION,
  border: "1px solid #FFFFFF",
  borderRadius: RADIUS,
  padding: `${SECTION_Y}px ${SECTION_X}px`,
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

const chamferedSection: CSSProperties = {
  ...sectionBase,
  clipPath: `polygon(${CHAMFER}px 0, 100% 0, 100% 100%, 0 100%, 0 ${CHAMFER}px)`,
};

const darkSection: CSSProperties = {
  ...sectionBase,
  background: DARK,
  color: "white",
  borderColor: "rgba(255,255,255,0.08)",
};

const safeTextWrap: CSSProperties = {
  minWidth: 0,
  overflowWrap: "break-word",
};

function Eyebrow({ theme = "light" }: { children?: ReactNode; theme?: Theme }) {
  return (
    <p
      style={{
        margin: 0,
        ...safeTextWrap,
        color: theme === "dark" ? BRAND : PRIMARY,
        fontSize: 24,
        fontWeight: 850,
        lineHeight: 1,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
      }}
    >
      @masinegocios
    </p>
  );
}

function DsFooter({ theme = "light", logoAlign = "end" }: { num: number; total: number; theme?: Theme; logoAlign?: "end" | "center" }) {
  const dark = theme === "dark";

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: logoAlign === "center" ? "center" : "flex-end", marginTop: "auto", paddingTop: 38 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={dark ? LOGO_LIGHT : LOGO_DARK} alt="Masi Negócios" style={{ width: FOOTER_LOGO_W, height: "auto" }} />
    </div>
  );
}

function Title({ children, size = 68, theme = "light" }: { children: ReactNode; size?: number; theme?: Theme }) {
  return (
    <h2
      style={{
        margin: 0,
        ...safeTextWrap,
        color: theme === "dark" ? "white" : DARK,
        fontSize: size,
        fontWeight: 900,
        lineHeight: 1.04,
        letterSpacing: 0,
      }}
    >
      {children}
    </h2>
  );
}

function Body({ children, size = 34, theme = "light" }: { children: ReactNode; size?: number; theme?: Theme }) {
  return (
    <p
      style={{
        margin: 0,
        ...safeTextWrap,
        color: theme === "dark" ? "rgba(255,255,255,0.7)" : MUTED,
        fontSize: size,
        lineHeight: 1.35,
      }}
    >
      {children}
    </p>
  );
}

function Card({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        background: CARD,
        borderRadius: RADIUS,
        padding: 36,
        boxShadow: "0 12px 28px rgba(15,23,42,0.06)",
        minWidth: 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function ImagePanel({ src, dark = false }: { src?: string; dark?: boolean }) {
  const isVector = src?.includes(".svg");

  if (!src) {
    return (
      <div style={{ height: "100%", minHeight: 260, borderRadius: RADIUS, background: dark ? "rgba(255,255,255,0.08)" : "#D4D4D4" }} />
    );
  }

  return (
    <div
      style={{
        height: "100%",
        minHeight: 260,
        borderRadius: RADIUS,
        background: isVector ? CARD : dark ? "rgba(255,255,255,0.08)" : "#D4D4D4",
        overflow: "hidden",
        padding: isVector ? 38 : 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: isVector ? "contain" : "cover",
          display: "block",
        }}
      />
    </div>
  );
}

function SectionSlide({
  children,
  num,
  total,
  dark = false,
  chamfer = false,
  footerLogoAlign = "end",
}: {
  children: ReactNode;
  num: number;
  total: number;
  dark?: boolean;
  chamfer?: boolean;
  footerLogoAlign?: "end" | "center";
}) {
  return (
    <div style={pageStyle}>
      <section style={dark ? darkSection : chamfer ? chamferedSection : sectionBase}>
        {children}
        <DsFooter num={num} total={total} theme={dark ? "dark" : "light"} logoAlign={footerLogoAlign} />
      </section>
    </div>
  );
}

function imageFor(post: SocialPost, page: number) {
  return post.images.find((image) => image.page === page)?.src;
}

function coverImageHeight(post: SocialPost) {
  return post.id === "ideia-produto-negocio-imagens-geradas" ? 468 : 360;
}

function CoverSlide({ post, page, num, total }: { post: SocialPost; page: CopyPage; num: number; total: number }) {
  return (
    <SectionSlide num={num} total={total} chamfer>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 28 }}>
        <Eyebrow>{page.eyebrow}</Eyebrow>
      </div>
      <div style={{ flex: 1, display: "grid", gridTemplateRows: `${coverImageHeight(post)}px minmax(0,1fr)`, gap: 42, paddingTop: 58, minHeight: 0 }}>
        <Card style={{ padding: 0, overflow: "hidden", background: CARD }}>
          <ImagePanel src={imageFor(post, 1)} />
        </Card>
        <div style={{ display: "flex", minHeight: 0, flexDirection: "column", gap: 28 }}>
          <h1 style={{ margin: 0, ...safeTextWrap, color: DARK, fontSize: 104, fontWeight: 900, lineHeight: 1.02, letterSpacing: 0 }}>
            {page.title}
          </h1>
          <div style={{ width: 72, height: 6, borderRadius: 999, background: PRIMARY }} />
          <Body size={SUBTITLE_SIZE}>{page.subtitle}</Body>
        </div>
      </div>
    </SectionSlide>
  );
}

function ContextSlide({ page, num, total }: { page: CopyPage; num: number; total: number }) {
  return (
    <SectionSlide num={num} total={total}>
      <Eyebrow>{page.eyebrow}</Eyebrow>
      <div style={{ flex: 1, display: "grid", gridTemplateRows: "auto auto", gap: 42, alignContent: "center", paddingTop: 48, minHeight: 0 }}>
        <Title size={76}>{page.title}</Title>
        <Card style={{ minHeight: 360, display: "flex", flexDirection: "column", justifyContent: "space-between", borderLeft: `8px solid ${PRIMARY}`, padding: "44px 48px" }}>
          <p style={{ margin: 0, ...safeTextWrap, color: TEXT, fontSize: 42, lineHeight: 1.22, fontWeight: 780 }}>
            {page.support}
          </p>
          <p style={{ margin: "32px 0 0", ...safeTextWrap, color: "#888", fontSize: 28, fontWeight: 700 }}>
            {page.source}
          </p>
        </Card>
      </div>
    </SectionSlide>
  );
}

function MetricSlide({ page, num, total }: { page: CopyPage; num: number; total: number }) {
  return (
    <SectionSlide num={num} total={total}>
      <Eyebrow>Prova</Eyebrow>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 28 }}>
        <Card style={{ padding: 58 }}>
          <p style={{ margin: 0, ...safeTextWrap, color: PRIMARY, fontSize: 150, fontWeight: 900, lineHeight: 0.92, letterSpacing: 0 }}>
            {page.metric}
          </p>
          <p style={{ margin: "24px 0 0", ...safeTextWrap, color: DARK, fontSize: 42, fontWeight: 800, lineHeight: 1.16 }}>
            {page.context}
          </p>
        </Card>
        <Card style={{ borderLeft: `8px solid ${PRIMARY}`, padding: 34 }}>
          <p style={{ margin: 0, ...safeTextWrap, color: TEXT, fontSize: 44, lineHeight: 1.08, fontWeight: 900 }}>
            {page.statement}
          </p>
          <p style={{ margin: "18px 0 0", ...safeTextWrap, color: "#888", fontSize: 26, fontWeight: 700 }}>
            Fonte: {page.source}
          </p>
        </Card>
      </div>
    </SectionSlide>
  );
}

function ListSlide({ page, num, total }: { page: CopyPage; num: number; total: number }) {
  return (
    <SectionSlide num={num} total={total} dark>
      <Eyebrow theme="dark">Leitura</Eyebrow>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 56 }}>
        <div style={{ maxWidth: 760 }}>
          <Title size={78} theme="dark">{page.title}</Title>
        </div>
        <div style={{ display: "grid", gap: 26 }}>
          {page.items?.map((item, index) => (
            <div key={item.title} style={{ display: "grid", gridTemplateColumns: "76px minmax(0,1fr)", gap: 26, alignItems: "flex-start" }}>
              <span style={{ color: BRAND, fontSize: 44, fontWeight: 900, lineHeight: 1 }}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p style={{ margin: "0 0 8px", ...safeTextWrap, color: "white", fontSize: 44, fontWeight: 850, lineHeight: 1.12 }}>
                  {item.title}
                </p>
                <p style={{ margin: 0, ...safeTextWrap, color: "rgba(255,255,255,0.68)", fontSize: SUBTITLE_SIZE, lineHeight: 1.16 }}>
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionSlide>
  );
}

function SecondContextSlide({ post, page, num, total }: { post: SocialPost; page: CopyPage; num: number; total: number }) {
  return (
    <SectionSlide num={num} total={total}>
      <Eyebrow>{page.eyebrow}</Eyebrow>
      <div style={{ flex: 1, display: "grid", gridTemplateRows: "minmax(0,1fr) 330px", gap: 42, alignContent: "center", paddingTop: 42, minHeight: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 28, minHeight: 0 }}>
          <Title size={70}>{page.title}</Title>
          <Body size={SUBTITLE_SIZE}>{page.paragraph}</Body>
        </div>
        <ImagePanel src={imageFor(post, 5)} />
      </div>
    </SectionSlide>
  );
}

function ConsequenceSlide({ page, num, total }: { page: CopyPage; num: number; total: number }) {
  return (
    <SectionSlide num={num} total={total}>
      <Eyebrow>{page.eyebrow}</Eyebrow>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 28 }}>
        <Card style={{ background: DARK, color: "white", minHeight: 500, display: "flex", flexDirection: "column", justifyContent: "center", gap: 28, padding: 44 }}>
          <Title size={78} theme="dark">{page.statement}</Title>
          <Body size={SUBTITLE_SIZE} theme="dark">{page.support}</Body>
        </Card>
        <div style={{ paddingLeft: 44 }}>
          <Body size={SUBTITLE_SIZE}>{page.paragraph}</Body>
        </div>
      </div>
    </SectionSlide>
  );
}

function SynthesisSlide({ post, page, num, total }: { post: SocialPost; page: CopyPage; num: number; total: number }) {
  return (
    <SectionSlide num={num} total={total}>
      <Eyebrow>Síntese</Eyebrow>
      <div style={{ flex: 1, display: "grid", gridTemplateRows: "auto minmax(0,1fr)", gap: 28, paddingTop: 42, minHeight: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <Title size={70}>{page.title}</Title>
          <Body size={SUBTITLE_SIZE}>{page.paragraph}</Body>
        </div>
        <ImagePanel src={imageFor(post, 7)} />
      </div>
    </SectionSlide>
  );
}

function ClosingSlide({ page, num, total }: { page: CopyPage; num: number; total: number }) {
  return (
    <SectionSlide num={num} total={total} footerLogoAlign="center">
      <Eyebrow>Fechamento</Eyebrow>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 34 }}>
        <Title size={76}>{page.closingTitle}</Title>
        <Body size={SUBTITLE_SIZE}>{page.closingInsight}</Body>
        <Card style={{ background: DARK }}>
          <p style={{ margin: 0, ...safeTextWrap, color: "white", fontSize: 44, lineHeight: 1.1, fontWeight: 900 }}>
            {page.finalLine}
          </p>
        </Card>
      </div>
    </SectionSlide>
  );
}

function slidesFor(post: SocialPost): ReactNode[] {
  const total = 8;

  return [
    <CoverSlide key={`${post.id}-1`} post={post} page={post.pages[0]} num={1} total={total} />,
    <ContextSlide key={`${post.id}-2`} page={post.pages[1]} num={2} total={total} />,
    <MetricSlide key={`${post.id}-3`} page={post.pages[2]} num={3} total={total} />,
    <ListSlide key={`${post.id}-4`} page={post.pages[3]} num={4} total={total} />,
    <SecondContextSlide key={`${post.id}-5`} post={post} page={post.pages[4]} num={5} total={total} />,
    <ConsequenceSlide key={`${post.id}-6`} page={post.pages[5]} num={6} total={total} />,
    <SynthesisSlide key={`${post.id}-7`} post={post} page={post.pages[6]} num={7} total={total} />,
    <ClosingSlide key={`${post.id}-8`} page={post.pages[7]} num={8} total={total} />,
  ];
}

function SlidePreview({ slide }: { slide: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const node = containerRef.current;

    if (!node) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / POST_W);
    });
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-[10px] bg-white shadow-[0_18px_44px_rgba(0,0,0,0.12)]"
      style={{ height: scale > 0 ? POST_H * scale : undefined, aspectRatio: `${POST_W} / ${POST_H}` }}
    >
      {scale > 0 ? (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: POST_W,
            height: POST_H,
            transform: `scale(${scale})`,
            transformOrigin: "0 0",
          }}
        >
          {slide}
        </div>
      ) : null}
    </div>
  );
}

function HorizontalPreviewRail({ postId, slides }: { postId: string; slides: ReactNode[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ dragging: false, x: 0, scrollLeft: 0 });
  const [isDragging, setIsDragging] = useState(false);

  function scrollRail(direction: "left" | "right") {
    railRef.current?.scrollBy({
      left: direction === "right" ? 320 : -320,
      behavior: "smooth",
    });
  }

  function finishDrag() {
    dragStartRef.current.dragging = false;
    setIsDragging(false);
  }

  return (
    <div className="min-w-0" style={{ marginLeft: "8%", width: "92%" }}>
      <p className="ds-caption mb-4 text-primary">Visão horizontal</p>
      <div
        ref={railRef}
        className={`no-scrollbar -mx-[var(--section-padding-x)] overflow-x-auto px-[var(--section-padding-x)] pb-4 ${isDragging ? "cursor-grabbing select-none" : "cursor-grab"}`}
        onMouseDown={(event) => {
          const rail = railRef.current;

          if (!rail) {
            return;
          }

          dragStartRef.current = {
            dragging: true,
            x: event.pageX - rail.offsetLeft,
            scrollLeft: rail.scrollLeft,
          };
          setIsDragging(true);
        }}
        onMouseLeave={finishDrag}
        onMouseUp={finishDrag}
        onMouseMove={(event) => {
          const rail = railRef.current;

          if (!rail || !dragStartRef.current.dragging) {
            return;
          }

          event.preventDefault();
          const x = event.pageX - rail.offsetLeft;
          rail.scrollLeft = dragStartRef.current.scrollLeft - (x - dragStartRef.current.x);
        }}
      >
        <div className="flex w-max gap-5">
          {slides.map((slide, index) => (
            <div key={`${postId}-preview-${index}`} className="w-[min(68vw,260px)] shrink-0">
              <SlidePreview slide={slide} />
              <p className="mt-3 text-center font-mono text-[12px] font-bold text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-2 pr-[var(--section-padding-x)]">
        <button
          type="button"
          aria-label="Mover visão horizontal para a esquerda"
          className="flex size-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted"
          onClick={() => scrollRail("left")}
        >
          <ChevronLeft className="size-5" strokeWidth={1.8} />
        </button>
        <button
          type="button"
          aria-label="Mover visão horizontal para a direita"
          className="flex size-10 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted"
          onClick={() => scrollRail("right")}
        >
          <ChevronRight className="size-5" strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}

export function FivePostsBatchV2Page() {
  const prepared = useMemo(() => {
    const expandedPosts = posts.flatMap((post) => {
      if (post.id !== "ideia-produto-negocio") {
        return [post];
      }

      return [
        post,
        {
          ...post,
          id: "ideia-produto-negocio-imagens-geradas",
          name: "Ideia, produto e negócio · imagens geradas",
          theme: "Teste visual com imagens geradas no estilo MN",
          images: [
            { page: 1, src: "/social-media/generated/ideia-produto-negocio-v2-page-1.png" },
            { page: 5, src: "/social-media/generated/ideia-produto-negocio-v2-page-5.png" },
            { page: 7, src: "/social-media/generated/ideia-produto-negocio-v2-page-7.png" },
          ],
        },
      ];
    });

    return expandedPosts.map((post) => ({ post, slides: slidesFor(post) }));
  }, []);

  return (
    <div className="ds-page">
      <header className="ds-page-header px-1">
        <p className="ds-caption mb-2 text-primary">Mídia Social</p>
        <h1 className="ds-page-title">Cinco posts V2</h1>
        <p className="ds-page-description">
          Lote editorial de negócios com 5 carrosséis, cada um com 8 páginas usando o layout validado do post IA virou serviço de implantação.
        </p>
      </header>

      <section className="w-full">
        <ChamferedPanel
          strokeColor="#FFFFFF"
          strokeWidth={1}
          innerStyle={{
            background: SECTION,
            borderRadius: 10,
            padding: "var(--section-padding-y) var(--section-padding-x)",
          }}
        >
          <div className="grid gap-8 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
            <div className="flex flex-col justify-between gap-8">
              <div>
                <p className="ds-caption mb-2 text-primary">Lote 2026-05-08</p>
                <h2 className="ds-section-title">Sistema de criação em execução.</h2>
                <p className="ds-section-subtitle">
                  Tema, copy, fact-check e imagens foram consolidados em um batch único. Abaixo, cada post aparece como section própria e também em carrossel.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                {prepared.map(({ post }, index) => (
                  <a key={post.id} href={`#${post.id}`} className="flex items-start gap-4 rounded-[10px] border border-white bg-white/60 p-4 transition-colors hover:bg-white">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-primary text-white">
                      {index === 0 ? <Cpu className="size-5" /> : index === 1 ? <Building2 className="size-5" /> : index === 2 ? <Store className="size-5" /> : index === 3 ? <Goal className="size-5" /> : <Boxes className="size-5" />}
                    </span>
                    <span>
                      <span className="block text-[15px] font-bold leading-tight text-foreground">{post.name}</span>
                      <span className="mt-1 block text-[13px] leading-5 text-muted-foreground">{post.theme}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="ds-card !p-[30px]">
                <BarChart3 className="mb-6 size-8 text-primary" strokeWidth={1.8} />
                <p className="text-[42px] font-black leading-none text-foreground">{prepared.length}</p>
                <p className="mt-2 text-[13px] leading-5 text-muted-foreground">posts no lote</p>
              </div>
              <div className="ds-card !p-[30px]">
                <Layers className="mb-6 size-8 text-primary" strokeWidth={1.8} />
                <p className="text-[42px] font-black leading-none text-foreground">{prepared.length * 8}</p>
                <p className="mt-2 text-[13px] leading-5 text-muted-foreground">páginas visuais</p>
              </div>
            </div>
          </div>
        </ChamferedPanel>
      </section>

      {prepared.map(({ post, slides }) => (
        <section key={post.id} id={post.id} className="ds-section scroll-mt-8">
          <div className="mb-6">
            <p className="ds-caption mb-2 text-primary">Post</p>
            <h2 className="ds-section-title">{post.name}</h2>
            <p className="ds-section-subtitle">{post.theme}</p>
          </div>

          <div className="grid gap-8 xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
            <div className="min-w-0">
              <CarouselViewer slides={slides} accentColor={PRIMARY} />
            </div>

            <HorizontalPreviewRail postId={post.id} slides={slides} />
          </div>
        </section>
      ))}
    </div>
  );
}
