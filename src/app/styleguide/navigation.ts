export interface NavItem {
  name: string;
  href: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navigation: NavSection[] = [
  {
    title: "Foundation",
    items: [
      { name: "Início", href: "/styleguide" },
      { name: "Design Tokens", href: "/styleguide/design-tokens" },
      { name: "Section System", href: "/styleguide/section-system" },
      { name: "Card System", href: "/styleguide/card-system" },
      { name: "Logotipo", href: "/styleguide/logotipo" },
    ],
  },
  {
    title: "Components",
    items: [
      { name: "Accordion", href: "/styleguide/components/accordion" },
      { name: "Alert", href: "/styleguide/components/alert" },
      { name: "Alert Dialog", href: "/styleguide/components/alert-dialog" },
      { name: "Aspect Ratio", href: "/styleguide/components/aspect-ratio" },
      { name: "Avatar", href: "/styleguide/components/avatar" },
      { name: "Badge", href: "/styleguide/components/badge" },
      { name: "Breadcrumb", href: "/styleguide/components/breadcrumb" },
      { name: "Button", href: "/styleguide/components/button" },
      { name: "Button Group", href: "/styleguide/components/button-group" },
      { name: "Calendar", href: "/styleguide/components/calendar" },
      { name: "Card", href: "/styleguide/components/card" },
      { name: "Carousel", href: "/styleguide/components/carousel" },
      { name: "Chart", href: "/styleguide/components/chart" },
      { name: "Checkbox", href: "/styleguide/components/checkbox" },
      { name: "Collapsible", href: "/styleguide/components/collapsible" },
      { name: "Combobox", href: "/styleguide/components/combobox" },
      { name: "Command", href: "/styleguide/components/command" },
      { name: "Context Menu", href: "/styleguide/components/context-menu" },
      { name: "Data Table", href: "/styleguide/components/data-table" },
      { name: "Date Picker", href: "/styleguide/components/date-picker" },
      { name: "Dialog", href: "/styleguide/components/dialog" },
      { name: "Direction", href: "/styleguide/components/direction" },
      { name: "Drawer", href: "/styleguide/components/drawer" },
      { name: "Dropdown Menu", href: "/styleguide/components/dropdown-menu" },
      { name: "Empty", href: "/styleguide/components/empty" },
      { name: "Field", href: "/styleguide/components/field" },
      { name: "Hover Card", href: "/styleguide/components/hover-card" },
      { name: "Icon Cloud", href: "/styleguide/components/icon-cloud" },
      { name: "Icon Library", href: "/styleguide/components/icon-library" },
      { name: "Input", href: "/styleguide/components/input" },
      { name: "Input Group", href: "/styleguide/components/input-group" },
      { name: "Input OTP", href: "/styleguide/components/input-otp" },
      { name: "Item", href: "/styleguide/components/item" },
      { name: "Kbd", href: "/styleguide/components/kbd" },
      { name: "Label", href: "/styleguide/components/label" },
      { name: "Menubar", href: "/styleguide/components/menubar" },
      { name: "Native Select", href: "/styleguide/components/native-select" },
      { name: "Navigation Menu", href: "/styleguide/components/navigation-menu" },
      { name: "Pagination", href: "/styleguide/components/pagination" },
      { name: "Popover", href: "/styleguide/components/popover" },
      { name: "Progress", href: "/styleguide/components/progress" },
      { name: "Radio Group", href: "/styleguide/components/radio-group" },
      { name: "Resizable", href: "/styleguide/components/resizable" },
      { name: "Scroll Area", href: "/styleguide/components/scroll-area" },
      { name: "Select", href: "/styleguide/components/select" },
      { name: "Separator", href: "/styleguide/components/separator" },
      { name: "Sheet", href: "/styleguide/components/sheet" },
      { name: "Sidebar", href: "/styleguide/components/sidebar" },
      { name: "Skeleton", href: "/styleguide/components/skeleton" },
      { name: "Slider", href: "/styleguide/components/slider" },
      { name: "Sonner", href: "/styleguide/components/sonner" },
      { name: "Spinner", href: "/styleguide/components/spinner" },
      { name: "Switch", href: "/styleguide/components/switch" },
      { name: "Table", href: "/styleguide/components/table" },
      { name: "Tabs", href: "/styleguide/components/tabs" },
      { name: "Textarea", href: "/styleguide/components/textarea" },
      { name: "Toast", href: "/styleguide/components/toast" },
      { name: "Toggle", href: "/styleguide/components/toggle" },
      { name: "Toggle Group", href: "/styleguide/components/toggle-group" },
      { name: "Tooltip", href: "/styleguide/components/tooltip" },
      { name: "Typing Animation", href: "/styleguide/components/typing-animation" },
      { name: "Typography", href: "/styleguide/components/typography" },
    ],
  },
  {
    title: "Páginas",
    items: [
      { name: "Apresentações Comerciais", href: "/styleguide/paginas/apresentacoes-comerciais" },
      { name: "Blog", href: "/styleguide/paginas/blog" },
    ],
  },
  {
    title: "Mídia Social",
    items: [
      { name: "Posts & Carrosséis", href: "/styleguide/midia-social" },
    ],
  },
];
