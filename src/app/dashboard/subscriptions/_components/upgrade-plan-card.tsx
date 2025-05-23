import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check } from "lucide-react";

export function UpgradePlanCard({ currentPlan, plans }: { currentPlan: string; plans: any[] }) {
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Escolha o plano que melhor atende às necessidades do seu negócio.
      </p>
      
      <div className="grid gap-6 md:grid-cols-4">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`${plan.recommended ? "border-2 border-primary" : ""} ${
              plan.id === currentPlan ? "bg-muted" : ""
            }`}
          >
            <CardHeader>
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">{plan.name}</h3>
                {plan.recommended && (
                  <span className="rounded bg-primary/10 px-2 py-1 text-xs text-primary">
                    Recomendado
                  </span>
                )}
              </div>
              <div className="text-2xl font-bold">{plan.price}</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {plan.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <Check className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                variant={plan.id === currentPlan ? "outline" : "default"}
                className="w-full"
                disabled={plan.id === currentPlan}
              >
                {plan.id === currentPlan ? "Plano Atual" : "Selecionar"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}