import { FoundationFooter, FoundationPageHeader, SectionSystemBlock } from "../foundation-sections";

export default function SectionSystemPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Section System"
        description="Como as sections se apoiam no fundo global, quais são as regras fixas do container e como a estrutura visual se repete na página."
      />

      <SectionSystemBlock first />

      <FoundationFooter />
    </div>
  );
}
