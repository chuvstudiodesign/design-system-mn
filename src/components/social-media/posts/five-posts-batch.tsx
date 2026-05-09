"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { BarChart3, Boxes, Building2, CircleDollarSign, Cpu, Goal, Layers, Store } from "lucide-react";
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
const LOGO_DARK = "/logos/primary/masi-primary-dark.svg";
const LOGO_LIGHT = "/logos/primary/masi-primary-light.svg";

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
        support: "A nova empresa vai colocar Claude em processos centrais de companhias médias.",
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
        paragraph: "A vantagem está em transformar software em rotina mensurável.",
      },
      {
        eyebrow: "Consequência",
        statement: "Consultoria vira infraestrutura",
        support: "Quem domina o caminho até a operação captura mais valor que quem só vende acesso.",
      },
      {
        title: "O mercado quer menos promessa",
        paragraph: "Empresas não compram IA. Compram redução de gargalo, tempo e retrabalho.",
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
      { page: 1, src: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Team_members_of_startup.jpg" },
      { page: 2, src: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Team_members_of_startup.jpg" },
      { page: 5, src: "https://upload.wikimedia.org/wikipedia/commons/1/10/Business_Model_Canvas.png" },
      { page: 8, src: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Team_members_of_startup.jpg" },
    ],
    pages: [
      { eyebrow: "Brasil e IA", title: "Especializar também escala", subtitle: "A Enter virou unicórnio atacando uma dor específica." },
      {
        eyebrow: "O fato",
        title: "US$ 100M+ em Série B",
        support: "A rodada avaliou a Enter em US$ 1,2 bilhão e foi liderada pela Founders Fund.",
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
        paragraph: "Quando o problema é específico, produto, venda e entrega ficam mais alinhados.",
      },
      {
        eyebrow: "Consequência",
        statement: "O foco criou autoridade",
        support: "A empresa não vende IA genérica. Vende sistema operacional para departamentos jurídicos.",
      },
      {
        title: "Para empreender em IA, comece pela dor",
        paragraph: "Mercado grande não basta. A dor precisa ser frequente, cara e mensurável.",
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
      { page: 1, src: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Team_members_of_startup.jpg" },
      { page: 2, src: "https://upload.wikimedia.org/wikipedia/commons/1/10/Business_Model_Canvas.png" },
      { page: 5, src: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Team_members_of_startup.jpg" },
      { page: 8, src: "https://upload.wikimedia.org/wikipedia/commons/1/10/Business_Model_Canvas.png" },
    ],
    pages: [
      { eyebrow: "Varejo", title: "A fila também é custo", subtitle: "A Beepay mostra que fricção operacional pode virar mercado." },
      {
        eyebrow: "A rodada",
        title: "R$ 2M para checkout autônomo",
        support: "A seed foi liderada pelo Comunitá, CVC ligado ao Sicredi, com ACATE Invest e Ventiur.",
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
        paragraph: "Ela muda a economia da loja: menos atrito, mais disponibilidade e mais dados.",
      },
      {
        eyebrow: "Consequência",
        statement: "O varejo vira software",
        support: "Quando pagamento, acesso e dados ficam no mesmo fluxo, a loja muda de categoria.",
      },
      {
        title: "Pequeno varejo também precisa de sistema",
        paragraph: "A oportunidade está em levar infraestrutura leve para quem não opera como grande rede.",
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
      { page: 1, src: "https://upload.wikimedia.org/wikipedia/commons/1/10/Business_Model_Canvas.png" },
      { page: 2, src: "https://upload.wikimedia.org/wikipedia/commons/1/10/Business_Model_Canvas.png" },
      { page: 5, src: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Team_members_of_startup.jpg" },
      { page: 8, src: "https://upload.wikimedia.org/wikipedia/commons/1/10/Business_Model_Canvas.png" },
    ],
    pages: [
      { eyebrow: "Gestão", title: "OKR não é lista de metas", subtitle: "É um sistema para decidir foco, medida e cadência." },
      {
        eyebrow: "Definição",
        title: "Objetivo diz o que importa",
        support: "Key Results mostram como medir progresso sem transformar tudo em tarefa.",
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
        paragraph: "Lançar campanha é tarefa. Aumentar conversão com prazo e medida é resultado.",
      },
      {
        eyebrow: "Consequência",
        statement: "Cadência protege foco",
        support: "Sem revisão semanal, o OKR vira documento bonito e perde poder de decisão.",
      },
      {
        title: "O time precisa ver trade-off",
        paragraph: "OKR só funciona quando deixa claro o que não será prioridade neste ciclo.",
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
      { page: 1, src: "https://upload.wikimedia.org/wikipedia/commons/1/10/Business_Model_Canvas.png" },
      { page: 2, src: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Team_members_of_startup.jpg" },
      { page: 5, src: "https://upload.wikimedia.org/wikipedia/commons/1/10/Business_Model_Canvas.png" },
      { page: 8, src: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Team_members_of_startup.jpg" },
    ],
    pages: [
      { eyebrow: "Empreender", title: "Ideia não é negócio", subtitle: "Crescer exige separar invenção, entrega e modelo econômico." },
      {
        eyebrow: "A confusão",
        title: "Uma ideia ainda não prova mercado",
        support: "Ela mostra uma hipótese. O produto testa entrega. O negócio testa captura de valor.",
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
        paragraph: "Se aquisição, margem e retenção não fecham, a entrega não sustenta a empresa.",
      },
      {
        eyebrow: "Negócio",
        statement: "Modelo é sistema de troca",
        support: "Ele conecta cliente, proposta de valor, canal, receita, custo e operação.",
      },
      {
        title: "O empreendedor precisa mudar de pergunta",
        paragraph: "Não basta perguntar se a ideia é boa. Pergunte se ela vira repetição econômica.",
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
  clipPath: "polygon(32px 0, 100% 0, 100% 100%, 0 100%, 0 32px)",
};

const darkSection: CSSProperties = {
  ...sectionBase,
  background: DARK,
  color: "white",
  borderColor: "rgba(255,255,255,0.08)",
};

function Eyebrow({ children, theme = "light" }: { children: ReactNode; theme?: Theme }) {
  return (
    <p
      style={{
        margin: 0,
        color: theme === "dark" ? BRAND : PRIMARY,
        fontSize: 24,
        fontWeight: 850,
        lineHeight: 1,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
      }}
    >
      {children}
    </p>
  );
}

function DsFooter({ num, total, theme = "light" }: { num: number; total: number; theme?: Theme }) {
  const dark = theme === "dark";

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 34 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {Array.from({ length: total }, (_, index) => (
          <span
            key={index}
            style={{
              width: index === num - 1 ? 44 : 10,
              height: 6,
              borderRadius: 999,
              background: index === num - 1 ? PRIMARY : dark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.12)",
            }}
          />
        ))}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={dark ? LOGO_LIGHT : LOGO_DARK} alt="Masi Negócios" style={{ width: 260, height: "auto" }} />
    </div>
  );
}

function Title({ children, size = 68, theme = "light" }: { children: ReactNode; size?: number; theme?: Theme }) {
  return (
    <h2
      style={{
        margin: 0,
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
}: {
  children: ReactNode;
  num: number;
  total: number;
  dark?: boolean;
  chamfer?: boolean;
}) {
  return (
    <div style={pageStyle}>
      <section style={dark ? darkSection : chamfer ? chamferedSection : sectionBase}>
        {children}
        <DsFooter num={num} total={total} theme={dark ? "dark" : "light"} />
      </section>
    </div>
  );
}

function imageFor(post: SocialPost, page: number) {
  return post.images.find((image) => image.page === page)?.src;
}

function isAiImplementationPost(post: SocialPost) {
  return post.id === "ia-servico-implantacao";
}

function CoverSlide({ post, page, num, total }: { post: SocialPost; page: CopyPage; num: number; total: number }) {
  if (isAiImplementationPost(post)) {
    return (
      <SectionSlide num={num} total={total} chamfer>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 28 }}>
          <Eyebrow>{page.eyebrow}</Eyebrow>
          <div style={{ color: PRIMARY }}>{post.accentIcon}</div>
        </div>
        <div style={{ flex: 1, display: "grid", gridTemplateRows: "360px auto auto auto", gap: 32, paddingTop: 42 }}>
          <Card style={{ padding: 0, overflow: "hidden", background: CARD }}>
            <ImagePanel src={imageFor(post, 1)} />
          </Card>
          <h1 style={{ margin: 0, color: DARK, fontSize: 104, fontWeight: 900, lineHeight: 1.02, letterSpacing: 0 }}>
            {page.title}
          </h1>
          <div style={{ width: 72, height: 6, borderRadius: 999, background: PRIMARY }} />
          <Body size={46}>{page.subtitle}</Body>
        </div>
      </SectionSlide>
    );
  }

  return (
    <SectionSlide num={num} total={total} chamfer>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 28 }}>
        <Eyebrow>{page.eyebrow}</Eyebrow>
        <div style={{ color: PRIMARY }}>{post.accentIcon}</div>
      </div>
      <div style={{ flex: 1, display: "grid", gridTemplateRows: "1fr auto", gap: 34, paddingTop: 54 }}>
        <div style={{ alignSelf: "stretch", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 30 }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 34 }}>
            <h1 style={{ margin: 0, color: DARK, fontSize: 100, fontWeight: 900, lineHeight: 1.02, letterSpacing: 0 }}>
              {page.title}
            </h1>
            <div style={{ width: 64, height: 6, borderRadius: 999, background: PRIMARY }} />
          </div>
          <ImagePanel src={imageFor(post, 1)} />
        </div>
        <Body size={46}>{page.subtitle}</Body>
      </div>
    </SectionSlide>
  );
}

function ContextSlide({ post, page, num, total }: { post: SocialPost; page: CopyPage; num: number; total: number }) {
  if (isAiImplementationPost(post)) {
    return (
      <SectionSlide num={num} total={total}>
        <Eyebrow>{page.eyebrow}</Eyebrow>
        <div style={{ flex: 1, display: "grid", gridTemplateRows: "auto 1fr", gap: 34, paddingTop: 48 }}>
          <Title size={76}>{page.title}</Title>
          <Card style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", borderLeft: `8px solid ${PRIMARY}`, padding: 56 }}>
            <p style={{ margin: 0, color: TEXT, fontSize: 50, lineHeight: 1.2, fontWeight: 780 }}>
              {page.support}
            </p>
            <p style={{ margin: "44px 0 0", color: "#888", fontSize: 32, fontWeight: 700 }}>
              {page.source}
            </p>
          </Card>
        </div>
      </SectionSlide>
    );
  }

  return (
    <SectionSlide num={num} total={total}>
      <Eyebrow>{page.eyebrow}</Eyebrow>
      <div style={{ flex: 1, display: "grid", gridTemplateRows: "auto 1fr", gap: 34, paddingTop: 48 }}>
        <Title size={76}>{page.title}</Title>
        <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 28 }}>
          <ImagePanel src={imageFor(post, 2)} />
          <Card style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", borderLeft: `8px solid ${PRIMARY}`, padding: 50 }}>
            <p style={{ margin: 0, color: TEXT, fontSize: 44, lineHeight: 1.25, fontWeight: 750 }}>
              {page.support}
            </p>
            <p style={{ margin: "36px 0 0", color: "#888", fontSize: 30, fontWeight: 700 }}>
              {page.source}
            </p>
          </Card>
        </div>
      </div>
    </SectionSlide>
  );
}

function MetricSlide({ post, page, num, total }: { post: SocialPost; page: CopyPage; num: number; total: number }) {
  if (isAiImplementationPost(post)) {
    return (
      <SectionSlide num={num} total={total}>
        <Eyebrow>Prova</Eyebrow>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 28 }}>
          <Card style={{ padding: 58 }}>
            <p style={{ margin: 0, color: PRIMARY, fontSize: 150, fontWeight: 900, lineHeight: 0.92, letterSpacing: 0 }}>
              {page.metric}
            </p>
            <p style={{ margin: "24px 0 0", color: DARK, fontSize: 42, fontWeight: 800, lineHeight: 1.16 }}>
              {page.context}
            </p>
          </Card>
          <Card style={{ borderLeft: `8px solid ${PRIMARY}`, padding: 34 }}>
            <p style={{ margin: 0, color: TEXT, fontSize: 44, lineHeight: 1.08, fontWeight: 900 }}>
              {page.statement}
            </p>
            <p style={{ margin: "18px 0 0", color: "#888", fontSize: 26, fontWeight: 700 }}>
              Fonte: {page.source}
            </p>
          </Card>
        </div>
      </SectionSlide>
    );
  }

  return (
    <SectionSlide num={num} total={total}>
      <Eyebrow>Prova</Eyebrow>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 28 }}>
        <Card style={{ padding: 58 }}>
          <p style={{ margin: 0, color: PRIMARY, fontSize: 190, fontWeight: 900, lineHeight: 0.92, letterSpacing: 0 }}>
            {page.metric}
          </p>
          <p style={{ margin: "28px 0 0", color: DARK, fontSize: 46, fontWeight: 800, lineHeight: 1.18 }}>
            {page.context}
          </p>
        </Card>
        <Card style={{ borderLeft: `8px solid ${PRIMARY}` }}>
          <p style={{ margin: 0, color: TEXT, fontSize: 48, lineHeight: 1.08, fontWeight: 900 }}>
            {page.statement}
          </p>
        </Card>
        <p style={{ margin: 0, color: "#888", fontSize: 28, fontWeight: 700 }}>
          Fonte: {page.source}
        </p>
      </div>
    </SectionSlide>
  );
}

function ListSlide({ page, num, total }: { page: CopyPage; num: number; total: number }) {
  return (
    <SectionSlide num={num} total={total} dark>
      <Eyebrow theme="dark">Leitura</Eyebrow>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 38 }}>
        <Title size={78} theme="dark">{page.title}</Title>
        <div style={{ display: "grid", gap: 26 }}>
          {page.items?.map((item, index) => (
            <div key={item.title} style={{ display: "grid", gridTemplateColumns: "76px minmax(0,1fr)", gap: 26, alignItems: "flex-start" }}>
              <span style={{ color: BRAND, fontSize: 44, fontWeight: 900, lineHeight: 1 }}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p style={{ margin: "0 0 8px", color: "white", fontSize: 44, fontWeight: 850, lineHeight: 1.12 }}>
                  {item.title}
                </p>
                <p style={{ margin: 0, color: "rgba(255,255,255,0.58)", fontSize: 34, lineHeight: 1.3 }}>
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
  if (isAiImplementationPost(post)) {
    return (
      <SectionSlide num={num} total={total}>
        <Eyebrow>{page.eyebrow}</Eyebrow>
        <div style={{ flex: 1, display: "grid", gridTemplateRows: "auto 330px", gap: 30, alignContent: "center", paddingTop: 42 }}>
          <Card style={{ minHeight: 430, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <Title size={70}>{page.title}</Title>
            <Body size={36}>{page.paragraph}</Body>
          </Card>
          <ImagePanel src={imageFor(post, 5)} />
        </div>
      </SectionSlide>
    );
  }

  return (
    <SectionSlide num={num} total={total}>
      <Eyebrow>{page.eyebrow}</Eyebrow>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 30, alignItems: "center" }}>
        <Card style={{ minHeight: 620, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Title size={70}>{page.title}</Title>
          <Body size={34}>{page.paragraph}</Body>
        </Card>
        <ImagePanel src={imageFor(post, 5)} />
      </div>
    </SectionSlide>
  );
}

function ConsequenceSlide({ page, num, total }: { page: CopyPage; num: number; total: number }) {
  return (
    <SectionSlide num={num} total={total}>
      <Eyebrow>{page.eyebrow}</Eyebrow>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 34 }}>
        <Card style={{ background: DARK, color: "white", minHeight: 540, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <p style={{ margin: 0, color: BRAND, fontSize: 30, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Consequência
          </p>
          <Title size={78} theme="dark">{page.statement}</Title>
          <Body size={34} theme="dark">{page.support}</Body>
        </Card>
      </div>
    </SectionSlide>
  );
}

function SynthesisSlide({ post, page, num, total }: { post: SocialPost; page: CopyPage; num: number; total: number }) {
  if (isAiImplementationPost(post)) {
    return (
      <SectionSlide num={num} total={total}>
        <Eyebrow>Síntese</Eyebrow>
        <div style={{ flex: 1, display: "grid", gridTemplateRows: "auto auto 300px auto", gap: 26, paddingTop: 42 }}>
          <Title size={70}>{page.title}</Title>
          <Body size={36}>{page.paragraph}</Body>
          <ImagePanel src={imageFor(post, 7)} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
            {page.synthesis?.map((item, index) => (
              <Card key={item} style={{ minHeight: 150, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 28 }}>
                <span style={{ color: PRIMARY, fontSize: 22, fontWeight: 900 }}>{String(index + 1).padStart(2, "0")}</span>
                <p style={{ margin: 0, color: TEXT, fontSize: 30, lineHeight: 1.08, fontWeight: 850 }}>
                  {item}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </SectionSlide>
    );
  }

  return (
    <SectionSlide num={num} total={total}>
      <Eyebrow>Síntese</Eyebrow>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 30 }}>
        <Title size={76}>{page.title}</Title>
        <Body size={40}>{page.paragraph}</Body>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, paddingTop: 18 }}>
          {page.synthesis?.map((item, index) => (
            <Card key={item} style={{ minHeight: 190, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <span style={{ color: PRIMARY, fontSize: 24, fontWeight: 900 }}>{String(index + 1).padStart(2, "0")}</span>
              <p style={{ margin: 0, color: TEXT, fontSize: 33, lineHeight: 1.08, fontWeight: 850 }}>
                {item}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </SectionSlide>
  );
}

function ClosingSlide({ post, page, num, total }: { post: SocialPost; page: CopyPage; num: number; total: number }) {
  return (
    <SectionSlide num={num} total={total}>
      <Eyebrow>Fechamento</Eyebrow>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 28 }}>
        <Title size={76}>{page.closingTitle}</Title>
        <Card style={{ minHeight: 310, display: "grid", gridTemplateColumns: "0.75fr 1.25fr", gap: 28, alignItems: "center", padding: 36 }}>
          <ImagePanel src={imageFor(post, 8)} />
          <p style={{ margin: 0, color: TEXT, fontSize: 42, lineHeight: 1.16, fontWeight: 850 }}>
            {page.closingInsight}
          </p>
        </Card>
        <Card style={{ background: DARK }}>
          <p style={{ margin: 0, color: "white", fontSize: 44, lineHeight: 1.1, fontWeight: 900 }}>
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
    <ContextSlide key={`${post.id}-2`} post={post} page={post.pages[1]} num={2} total={total} />,
    <MetricSlide key={`${post.id}-3`} post={post} page={post.pages[2]} num={3} total={total} />,
    <ListSlide key={`${post.id}-4`} page={post.pages[3]} num={4} total={total} />,
    <SecondContextSlide key={`${post.id}-5`} post={post} page={post.pages[4]} num={5} total={total} />,
    <ConsequenceSlide key={`${post.id}-6`} page={post.pages[5]} num={6} total={total} />,
    <SynthesisSlide key={`${post.id}-7`} post={post} page={post.pages[6]} num={7} total={total} />,
    <ClosingSlide key={`${post.id}-8`} post={post} page={post.pages[7]} num={8} total={total} />,
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

export function FivePostsBatchPage() {
  const prepared = useMemo(() => posts.map((post) => ({ post, slides: slidesFor(post) })), []);

  return (
    <div className="ds-page">
      <header className="ds-page-header px-1">
        <p className="ds-caption mb-2 text-primary">Mídia Social</p>
        <h1 className="ds-page-title">Cinco posts V1</h1>
        <p className="ds-page-description">
          Lote editorial de negócios com 5 carrosséis, cada um com 8 páginas no sistema visual validado do Vale do Silício · Section.
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
                <p className="text-[42px] font-black leading-none text-foreground">5</p>
                <p className="mt-2 text-[13px] leading-5 text-muted-foreground">posts no lote</p>
              </div>
              <div className="ds-card !p-[30px]">
                <Layers className="mb-6 size-8 text-primary" strokeWidth={1.8} />
                <p className="text-[42px] font-black leading-none text-foreground">40</p>
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

            <div className="min-w-0">
              <p className="ds-caption mb-4 text-primary">Visão horizontal</p>
              <div className="-mx-[var(--section-padding-x)] overflow-x-auto px-[var(--section-padding-x)] pb-4">
                <div className="flex w-max gap-5">
                  {slides.map((slide, index) => (
                    <div key={`${post.id}-preview-${index}`} className="w-[min(68vw,260px)] shrink-0">
                      <SlidePreview slide={slide} />
                      <p className="mt-3 text-center font-mono text-[12px] font-bold text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
