"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function SonnerDemoButtons() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="outline" onClick={() => toast("Evento registrado com sucesso!")}>
        Default
      </Button>
      <Button variant="outline" onClick={() => toast.success("Perfil atualizado com sucesso!")}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.error("Falha ao processar o pagamento.")}>
        Error
      </Button>
      <Button variant="outline" onClick={() => toast.warning("Você tem 3 dias de trial restantes.")}>
        Warning
      </Button>
      <Button variant="outline" onClick={() => toast.info("Nova versão disponível.")}>
        Info
      </Button>
      <Button variant="outline" onClick={() => toast.loading("Carregando dados...")}>
        Loading
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("Arquivo excluído", {
            description: "O arquivo foi movido para a lixeira.",
            action: { label: "Desfazer", onClick: () => toast.success("Ação desfeita!") },
          })
        }
      >
        Com ação
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(new Promise((r) => setTimeout(r, 2000)), {
            loading: "Salvando...",
            success: "Salvo com sucesso!",
            error: "Erro ao salvar.",
          })
        }
      >
        Promise
      </Button>
    </div>
  );
}
