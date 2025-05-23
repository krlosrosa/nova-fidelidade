import { Button } from "@/components/ui/button";
import { CardBrandIcon } from "./card-brand-icon";
import { Plus } from "lucide-react";


export function PaymentMethods({ methods }: { methods: any[] }) {
  return (
    <div className="space-y-4">
      {methods.map((method) => (
        <div
          key={method.id}
          className="flex items-center justify-between rounded-lg border p-4"
        >
          <div className="flex items-center space-x-4">
            <CardBrandIcon brand={method.brand} />
            <div>
              <p className="font-medium">
                Cartão {method.brand} terminado em {method.last4}
              </p>
              <p className="text-sm text-muted-foreground">
                Expira em {method.exp_month}/{method.exp_year}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {method.isDefault && (
              <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-800">
                Padrão
              </span>
            )}
            <Button variant="ghost" size="sm">
              Editar
            </Button>
          </div>
        </div>
      ))}

      <Button variant="outline" className="mt-4">
        <Plus className="mr-2 h-4 w-4" />
        Adicionar método de pagamento
      </Button>
    </div>
  );
}