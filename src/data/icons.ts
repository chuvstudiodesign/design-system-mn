export type MNIcon = {
  id: string;
  name: string;
  src: string;
  figmaW: number;
  figmaH: number;
  figmaNodeId: string;
};

export const iconsDesign: MNIcon[] = [
  { id: "logotipo",       name: "Logotipo",        src: "/icons/design/logotipo.svg",        figmaW: 170, figmaH: 171, figmaNodeId: "16:77" },
  { id: "simbolo",        name: "Símbolo",          src: "/icons/design/simbolo.svg",         figmaW: 170, figmaH: 171, figmaNodeId: "16:76" },
  { id: "paleta-de-cores",name: "Paleta de Cores",  src: "/icons/design/paleta-de-cores.svg", figmaW: 149, figmaH: 171, figmaNodeId: "16:81" },
  { id: "tipografia",     name: "Tipografia",       src: "/icons/design/tipografia.svg",      figmaW: 126, figmaH: 116, figmaNodeId: "16:78" },
  { id: "icones",         name: "Ícones",           src: "/icons/design/icones.svg",          figmaW: 170, figmaH: 171, figmaNodeId: "16:79" },
  { id: "section-e-forma",name: "Section e Forma",  src: "/icons/design/section-e-forma.svg", figmaW: 171, figmaH: 171, figmaNodeId: "16:82" },
  { id: "glass",          name: "Glass",            src: "/icons/design/glass.svg",           figmaW: 170, figmaH: 171, figmaNodeId: "16:80" },
  { id: "uso",            name: "Uso",              src: "/icons/design/uso.svg",             figmaW: 188, figmaH: 190, figmaNodeId: "16:75" },
];

export const iconsGerais: MNIcon[] = [
  // Frame 1
  { id: "coracao",       name: "Coração",       src: "/icons/gerais/coracao.svg",       figmaW: 206, figmaH: 188, figmaNodeId: "16:97"  },
  { id: "iphone",        name: "iPhone",         src: "/icons/gerais/iphone.svg",        figmaW: 154, figmaH: 191, figmaNodeId: "16:100" },
  { id: "iphone-camera", name: "iPhone Camera",  src: "/icons/gerais/iphone-camera.svg", figmaW: 232, figmaH: 152, figmaNodeId: "16:101" },
  { id: "cartao",        name: "Cartão",         src: "/icons/gerais/cartao.svg",        figmaW: 231, figmaH: 152, figmaNodeId: "16:105" },
  { id: "mouse",         name: "Mouse",          src: "/icons/gerais/mouse.svg",         figmaW: 152, figmaH: 231, figmaNodeId: "16:106" },
  { id: "conexao",       name: "Conexão",        src: "/icons/gerais/conexao.svg",       figmaW: 171, figmaH: 191, figmaNodeId: "16:92"  },
  { id: "base",          name: "Base",           src: "/icons/gerais/base.svg",          figmaW: 149, figmaH: 187, figmaNodeId: "16:108" },
  // Frame 2
  { id: "seta-brand",    name: "Seta Brand",     src: "/icons/gerais/seta-brand.svg",    figmaW: 163, figmaH:  65, figmaNodeId: "16:85"  },
  { id: "baixar",        name: "Baixar",         src: "/icons/gerais/baixar.svg",        figmaW: 161, figmaH: 191, figmaNodeId: "16:94"  },
  { id: "ampliar",       name: "Ampliar",        src: "/icons/gerais/ampliar.svg",       figmaW: 173, figmaH: 173, figmaNodeId: "16:88"  },
  { id: "seta",          name: "Seta",           src: "/icons/gerais/seta.svg",          figmaW: 161, figmaH: 158, figmaNodeId: "16:95"  },
  { id: "caixa",         name: "Caixa",          src: "/icons/gerais/caixa.svg",         figmaW: 225, figmaH: 204, figmaNodeId: "16:98"  },
  { id: "sacola",        name: "Sacola",         src: "/icons/gerais/sacola.svg",        figmaW: 171, figmaH: 183, figmaNodeId: "16:96"  },
  { id: "caixa-3d",      name: "Caixa 3D",       src: "/icons/gerais/caixa-3d.svg",      figmaW: 214, figmaH: 183, figmaNodeId: "16:89"  },
  // Frame 3
  { id: "chat",          name: "Chat",           src: "/icons/gerais/chat.svg",          figmaW: 171, figmaH: 180, figmaNodeId: "16:87"  },
  { id: "block",         name: "Block",          src: "/icons/gerais/block.svg",         figmaW: 164, figmaH: 188, figmaNodeId: "16:93"  },
  { id: "calendario",    name: "Calendário",     src: "/icons/gerais/calendario.svg",    figmaW: 173, figmaH: 187, figmaNodeId: "16:99"  },
  { id: "instagram",     name: "Instagram",      src: "/icons/gerais/instagram.svg",     figmaW: 170, figmaH: 170, figmaNodeId: "16:111" },
  { id: "mail",          name: "Mail",           src: "/icons/gerais/mail.svg",          figmaW: 170, figmaH: 170, figmaNodeId: "16:109" },
  { id: "box",           name: "Box",            src: "/icons/gerais/box.svg",           figmaW: 170, figmaH: 171, figmaNodeId: "16:107" },
  { id: "check",         name: "Check",          src: "/icons/gerais/check.svg",         figmaW: 178, figmaH: 170, figmaNodeId: "16:110" },
  // Frame 4
  { id: "pessoa",        name: "Pessoa",         src: "/icons/gerais/pessoa.svg",        figmaW: 139, figmaH: 193, figmaNodeId: "16:90"  },
  { id: "pessoas-time",  name: "Pessoas Time",   src: "/icons/gerais/pessoas-time.svg",  figmaW: 219, figmaH: 194, figmaNodeId: "16:91"  },
  { id: "um",            name: "Um",             src: "/icons/gerais/um.svg",            figmaW: 188, figmaH: 188, figmaNodeId: "16:112" },
  { id: "foco",          name: "Foco",           src: "/icons/gerais/foco.svg",          figmaW: 188, figmaH: 190, figmaNodeId: "16:103" },
  { id: "localizacao",   name: "Localização",    src: "/icons/gerais/localizacao.svg",   figmaW: 174, figmaH: 202, figmaNodeId: "16:86"  },
  { id: "clock",         name: "Clock",          src: "/icons/gerais/clock.svg",         figmaW: 190, figmaH: 190, figmaNodeId: "16:102" },
  { id: "dinheiro",      name: "Dinheiro",       src: "/icons/gerais/dinheiro.svg",      figmaW: 190, figmaH: 190, figmaNodeId: "16:104" },
];

// Reference height used to calculate proportional display width
// displayWidth = Math.round((figmaW / figmaH) * ICON_REF_HEIGHT)
export const ICON_REF_HEIGHT = 160;

export function iconDisplayWidth(icon: MNIcon): number {
  return Math.round((icon.figmaW / icon.figmaH) * ICON_REF_HEIGHT);
}
