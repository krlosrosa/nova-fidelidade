import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Check, HelpCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { WelcomeStep } from './WelcomeStep';
import { BusinessInfoStep } from './BusinessInfoStep';
import { WhatsAppSetupStep } from './WhatsAppSetupStep';
import { LoyaltyProgramStep } from './LoyaltyProgramStep';
import { AIAssistantStep } from './AIAssistantStep';
import { CompleteStep } from './CompleteStep';
import { useOnboardingStore } from './onboarding-store';

const steps = [
  { id: 'welcome', title: 'Bem-vindo ao Nosso SaaS' },
  { id: 'business-info', title: 'Informações do Seu Negócio' },
  { id: 'whatsapp-setup', title: 'Configuração do WhatsApp' },
  { id: 'loyalty-program', title: 'Programa de Fidelidade' },
  { id: 'ai-assistant', title: 'Assistente de IA' },
  { id: 'complete', title: 'Configuração Concluída' },
];

export function OnboardingTour() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const { completeOnboarding } = useOnboardingStore();

  useEffect(() => {
    setProgress(((currentStep + 1) / steps.length) * 100);
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
      router.push('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipOnboarding = () => {
    completeOnboarding();
    router.push('/dashboard');
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{steps[currentStep].title}</CardTitle>
              <CardDescription>
                Passo {currentStep + 1} de {steps.length}
              </CardDescription>
            </div>
            <Button variant="ghost" onClick={skipOnboarding} className="text-muted-foreground">
              Pular configuração
            </Button>
          </div>
          <Progress value={progress} className="h-2 mt-2" />
        </CardHeader>
        
        <CardContent>
          {currentStep === 0 && <WelcomeStep />}
          {currentStep === 1 && <BusinessInfoStep />}
          {currentStep === 2 && <WhatsAppSetupStep />}
          {currentStep === 3 && <LoyaltyProgramStep />}
          {currentStep === 4 && <AIAssistantStep />}
          {currentStep === 5 && <CompleteStep />}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
            <ChevronLeft className="w-4 h-4 mr-1" /> Voltar
          </Button>
          <Button onClick={handleNext}>
            {currentStep === steps.length - 1 ? (
              <>
                <Check className="w-4 h-4 mr-1" /> Concluir
              </>
            ) : (
              <>
                Próximo <ChevronRight className="w-4 h-4 ml-1" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}