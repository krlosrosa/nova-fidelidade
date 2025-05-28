"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { SubscriptionPlanDetails } from "./_components/subscription-plan-details";
import { BillingHistory } from "./_components/billing-history";
import { UpgradePlanCard } from "./_components/upgrade-plan-card";
import { X } from "lucide-react";
import { useBillingHistory } from "./hooks/useBillingHistory";
import { useSubscriptionPlan } from "./hooks/useSubscriptionPlan";
import { redirectToStripePortal } from "./hooks/useStripePortal";

// Mock data - substitua por dados reais do seu banco
const currentBusiness = {
  id: "bus_123",
  name: "Salão da Maria",
  subscription_plan: "pro",
  subscription_status: "active",
  trial_ends_at: new Date("2024-12-31"),
  email: "contato@salaodamaria.com.br",
  logo_url: "/default-business-logo.png",
};

// Mock de planos disponíveis
const availablePlans = [
  {
    id: "free",
    name: "Free",
    price: "Grátis",
    features: [
      "Até 5 clientes ativos",
      "Programa de fidelidade limitado",
      "20 mensagens/mês",
      "Suporte comunitário",
    ],
    recommended: false,
  },
  {
    id: "starter",
    name: "Starter",
    price: "R$ 97/mês",
    features: [
      "Até 100 clientes ativos",
      "Programa de fidelidade básico",
      "100 mensagens/mês",
      "Suporte por email",
    ],
    recommended: false,
    priceId: "price_1RMvqbPOQetwSPfGUN25w2SG",
  },
  {
    id: "pro",
    name: "Pro",
    price: "R$ 197/mês",
    features: [
      "Até 500 clientes ativos",
      "Programa de fidelidade completo",
      "500 mensagens/mês",
      "Atendimento IA básico",
      "Suporte prioritário",
    ],
    recommended: true,
    priceId: "price_1RMvqNPOQetwSPfGTiF7Z4SM",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "R$ 397/mês",
    features: [
      "Clientes ilimitados",
      "Programa de fidelidade premium",
      "Mensagens ilimitadas",
      "Atendimento IA avançado",
      "Suporte 24/7",
      "Domínio personalizado",
    ],
    recommended: false,
    priceId: "price_1RMvpyPOQetwSPfG25deGtV7",
  },
];

export default function SubscriptionPage() {
  const customerId = "cus_SNxc5y5qvBaqk1";

  const { data: invoices } = useBillingHistory(customerId);
  const { data: plan } = useSubscriptionPlan(customerId);

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Assinatura</h1>
        {currentBusiness.subscription_status === "trialing" && (
          <Badge variant="secondary">
            Período de teste até {formatDate(currentBusiness.trial_ends_at)}
          </Badge>
        )}
      </div>

      <div className="grid gap-8">
        {/* Plano atual */}
        <Card>
          <CardHeader>
            <CardTitle>Seu Plano Atual</CardTitle>
          </CardHeader>
          <CardContent>
            <SubscriptionPlanDetails plan={plan} status={plan?.status} />
          </CardContent>
        </Card>

        {/* Atualização de plano */}
        <Card>
          <CardHeader>
            <CardTitle>Atualizar Plano</CardTitle>
          </CardHeader>
          <CardContent>
            <UpgradePlanCard
              currentPlan={currentBusiness.subscription_plan}
              plans={availablePlans}
            />
          </CardContent>
        </Card>

        {/* Ações rápidas */}
        <Card>
          <CardHeader>
            <CardTitle>Ações</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
            {currentBusiness.subscription_status === "active" && (
              <Button
                onClick={() => redirectToStripePortal(customerId)}
                variant="outline"
                className="w-full sm:w-auto text-destructive"
              >
                <X className="mr-2 h-4 w-4" />
                Cancelar Assinatura
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Histórico de cobrança */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Cobrança</CardTitle>
          </CardHeader>
          <CardContent>
            <BillingHistory items={invoices || []} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
