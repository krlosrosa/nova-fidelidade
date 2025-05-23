import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Download } from "lucide-react";

export function BillingHistory({ items }: { items: any[] }) {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="grid grid-cols-5 items-center border-b p-4 font-medium">
          <div>Data</div>
          <div className="col-span-2">Descrição</div>
          <div>Valor</div>
          <div>Ações</div>
        </div>
        {items.map((item: any) => (
          <div
            key={item.id}
            className="grid grid-cols-5 items-center border-b p-4 text-sm"
          >
            <div>{formatDate(item.created)}</div>
            <div className="col-span-2">{item.lines.data[0]?.description || "Assinatura"}</div>
            <div>{(item.amount_paid / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</div>
            <div>
              <a href={item.invoice_pdf} target="_blank" rel="noopener noreferrer">
                <Button variant="link" size="sm" className="h-8 p-0">
                  <Download className="mr-2 h-4 w-4" />
                  Recibo
                </Button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
