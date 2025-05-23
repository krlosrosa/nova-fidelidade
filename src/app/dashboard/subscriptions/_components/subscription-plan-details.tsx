import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export function SubscriptionPlanDetails({
  plan,
  status,
}: {
  plan: { name: string; price: number; features: string[] };
  status: string;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{plan?.name}</h3>
        <Badge variant={status === "active" ? "default" : "secondary"}>
          {status === "active" ? "Ativo" : status}
        </Badge>
      </div>

      <div className="text-2xl font-bold">
        {plan?.price.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </div>

      <ul className="space-y-2">
        {plan?.features.map((feature: string, index: number) => (
          <li key={index} className="flex items-center">
            <Check className="mr-2 h-4 w-4 text-green-500" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
