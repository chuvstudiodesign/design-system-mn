import Image from "next/image";
import ecosystemImage from "../../../Imagens/Masi Negocios Ecosistema.png";
import ecosystemImageTwo from "../../../Imagens/Masi Negocios Ecosistema 2.png";
import { ChamferedPanel } from "@/components/chamfered-panel";
import { IconCloudBrand } from "@/components/magicui/icon-cloud-brand";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { Typography } from "@/components/typography";
import { FoundationFooter } from "./foundation-sections";
import { BrandSelectorInline } from "./logotipo/brand-switcher";

const cards = [
  {
    title: "O que é o Design System",
    description:
      "Um repertório compartilhado de decisões visuais, componentes, padrões e regras para construir interfaces e materiais da Masi Negócios com mais clareza e menos retrabalho.",
    image: ecosystemImage,
    imageAlt: "Ecossistema Masi Negócios",
  },
  {
    title: "Como ele ajuda a marca",
    description:
      "Ele mantém consistência entre produtos, apresentações, páginas, conteúdos e experiências comerciais, preservando identidade enquanto acelera a execução.",
    image: ecosystemImageTwo,
    imageAlt: "Marcas do ecossistema Masi Negócios",
  },
];

const heroTitle = "Bem-vindo ao Design System Masi Negócios.";
const heroTitleClassName =
  "max-w-5xl text-center text-[34px] font-extrabold leading-[1.05] tracking-normal text-foreground sm:text-[62px]";

export default function StyleguideHomePage() {
  return (
    <div className="ds-page">
      <section className="w-full">
        <ChamferedPanel
          strokeColor="#FFFFFF"
          strokeWidth={1}
          innerStyle={{
            background: "#ECECEC",
            borderRadius: 10,
            padding: "100px var(--section-padding-x) var(--section-padding-y)",
          }}
        >
          <div className="flex w-full flex-col items-center overflow-hidden">
            <div className="flex w-full max-w-5xl flex-col items-center gap-[60px] text-center">
              <Image
                src="/logos/primary/masi-primary-dark.svg"
                alt="Masi Negócios"
                width={256}
                height={77}
                priority
                className="h-auto w-[256px]"
              />
              <div className="relative z-10 w-full max-w-5xl">
                <h1 className={`${heroTitleClassName} invisible mx-auto`} aria-hidden="true">
                  {heroTitle}
                </h1>
                <TypingAnimation
                  as="h1"
                  duration={2600}
                  className={`${heroTitleClassName} absolute inset-x-0 top-0 mx-auto`}
                >
                  {heroTitle}
                </TypingAnimation>
              </div>
            </div>

            <div className="relative z-0 -mb-6 flex w-full -translate-y-[4%] justify-center overflow-hidden">
              <IconCloudBrand
                variant="brandColorsWithIcons"
                size={840}
                maxBlur={5}
                autoRotateAxis="y"
                className="size-[min(91vw,644px)] max-h-[644px] max-w-[644px] sm:size-[min(70vw,644px)]"
              />
            </div>

            <div className="mt-12 grid w-full gap-6 lg:grid-cols-2">
              {cards.map((card) => (
                <div key={card.title} className="ds-card !p-[30px] flex flex-col gap-6">
                  <div>
                    <Typography as="h2" variant="h3" className="mb-3 text-foreground">
                      {card.title}
                    </Typography>
                    <Typography as="p" variant="body" className="text-muted-foreground">
                      {card.description}
                    </Typography>
                  </div>
                  {card.image && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[10px] border border-black/10 bg-[#ECECEC]">
                      <Image
                        src={card.image}
                        alt={card.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  {!card.image && (
                    <div className="aspect-[16/9] w-full rounded-[10px] border border-black/10 bg-[#ECECEC]" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 w-full">
              <div className="ds-card !px-[30px] !py-[60px] flex flex-col">
                <div className="flex flex-col gap-2 text-center">
                  <Typography as="h2" variant="h3" className="text-foreground">
                    Selecione a marca
                  </Typography>
                  <Typography as="p" variant="body" className="text-muted-foreground">
                    Acesse as diretrizes e downloads de logotipo de cada marca.
                  </Typography>
                </div>
                <div className="mt-[60px]">
                  <BrandSelectorInline />
                </div>
              </div>
            </div>

            <div className="mt-6 w-full">
              <div className="ds-card !p-[30px] flex flex-col gap-[60px]">
                <div>
                  <Typography as="h2" variant="h3" className="mb-3 text-foreground">
                    Foundation
                  </Typography>
                  <Typography as="p" variant="body" className="text-muted-foreground">
                    A fundação visual da Masi Negócios. Reúne as decisões que tornam a marca reconhecível — de cores e tipografia até os sistemas que organizam cada interface e material produzido.
                  </Typography>
                </div>

                <div className="grid gap-[60px] lg:grid-cols-2">
                  {/* Design Tokens */}
                  <div className="flex flex-col gap-5">
                    <div>
                      <Typography as="p" variant="label" className="mb-2 normal-case tracking-normal text-foreground">
                        Design Tokens
                      </Typography>
                      <Typography as="p" variant="body-sm" className="text-muted-foreground">
                        Variáveis que armazenam cada decisão visual da marca — cores, tipografia, espaçamentos e sombras. São a fonte única da verdade que mantém tudo consistente em qualquer material.
                      </Typography>
                    </div>
                    <div className="flex flex-col overflow-hidden rounded-[10px]">
                      {[
                        "#F8F8F8",
                        "#ECECEC",
                        "#D4D4D4",
                        "#BDBDBD",
                        "#A3A3A3",
                        "#8A8A8A",
                        "#AFF000",
                        "#5FC318",
                        "#0C1C16",
                      ].map((color, i) => (
                        <div
                          key={color}
                          className="h-[90px] w-full rounded-[10px]"
                          style={{
                            backgroundColor: color,
                            marginTop: i === 0 ? 0 : "-60px",
                            position: "relative",
                            zIndex: i,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Section & Card System */}
                  <div className="flex flex-col gap-5">
                    <div>
                      <Typography as="p" variant="label" className="mb-2 normal-case tracking-normal text-foreground">
                        Section &amp; Card System
                      </Typography>
                      <Typography as="p" variant="body-sm" className="text-muted-foreground">
                        O sistema que organiza qualquer página. A section estrutura o assunto e o card aprofunda o conteúdo, sempre na mesma hierarquia visual de três camadas.
                      </Typography>
                    </div>
                    <div className="overflow-hidden rounded-[10px] bg-[#D4D4D4] p-5">
                      <ChamferedPanel
                        strokeColor="#FFFFFF"
                        strokeWidth={1}
                        innerStyle={{
                          background: "#ECECEC",
                          borderRadius: 10,
                          padding: "30px",
                        }}
                      >
                        <div className="flex w-full flex-col gap-4">
                          <div>
                            <p className="font-mono text-[10px] font-bold text-[#5FC318]">Section 1</p>
                            <p className="mt-1 text-[15px] font-semibold leading-snug text-black">Abertura com chanfro</p>
                            <p className="mt-1.5 text-[12px] leading-5 text-[#474747]">
                              Primeira section da página com corte diagonal de 32px no canto superior esquerdo.
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-[10px] bg-white p-3">
                              <p className="text-[10px] font-semibold uppercase tracking-wider text-black">Card</p>
                              <p className="mt-1 text-[11px] leading-[1.5] text-[#474747]">Resumo principal do assunto.</p>
                            </div>
                            <div className="rounded-[10px] bg-white p-3">
                              <p className="text-[10px] font-semibold uppercase tracking-wider text-black">Card</p>
                              <p className="mt-1 text-[11px] leading-[1.5] text-[#474747]">Complemento visual ou dado de apoio.</p>
                            </div>
                          </div>
                        </div>
                      </ChamferedPanel>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ChamferedPanel>
      </section>

      <FoundationFooter />
    </div>
  );
}
