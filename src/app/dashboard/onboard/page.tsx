
'use client'
import { useEffect } from 'react';
import { useOnboardingStore } from './onboarding-store';
import { OnboardingTour } from './OnboardingTour';


export default function MainLayout() {
  const { isOnboardingComplete } = useOnboardingStore();
  
  // Verificar no banco de dados se o onboarding já foi completado
  useEffect(() => {
    // Aqui você faria uma chamada API para verificar se o onboarding já foi completado
    // Por enquanto estamos usando apenas o estado local
  }, []);
  
  return (
    <div>
      {!isOnboardingComplete && <OnboardingTour />}
    </div>
  );
}