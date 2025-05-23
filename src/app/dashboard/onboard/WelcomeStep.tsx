import { HelpCircle } from "lucide-react";

export function WelcomeStep() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center">
        <div className="bg-primary/10 p-4 rounded-full">
          <HelpCircle className="w-12 h-12 text-primary" />
        </div>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">Vamos configurar sua conta!</h3>
        <p className="text-muted-foreground">
          Em poucos passos, você terá seu programa de fidelidade e atendimento inteligente
          pelo WhatsApp configurados e prontos para usar.
        </p>
      </div>
    </div>
  );
}