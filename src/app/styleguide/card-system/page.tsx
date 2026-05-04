import { CardSystemBlock, FoundationFooter, FoundationPageHeader } from "../foundation-sections";

export default function CardSystemPage() {
  return (
    <div className="ds-page">
      <FoundationPageHeader
        title="Card System"
        description="Regras de empilhamento e uso dos cards como blocos internos de organização dentro das sections."
      />

      <CardSystemBlock first />

      <FoundationFooter />
    </div>
  );
}
