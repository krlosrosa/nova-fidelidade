import {BusinessProfile} from "./outro";

const mockBusiness = {
  id: "biz_123456789",
  name: "Salão Estilo & Elegância",
  phone: "+5511999999999",
  subscription_plan: "pro",
  subscription_status: "active",
  trial_ends_at: null,
  email: "contato@salaoestiloelegancia.com.br",
  slug: "salao-estilo-elegancia",
  logo_url: "https://example.com/logos/salao-estilo-elegancia.png",
  custom_domain: "salaoestiloelegancia.meudominio.com",
  metadata: {
    industry: "beauty",
    employees: 8,
    established_year: 2015,
    whatsapp_connected: true,
    features_enabled: {
      loyalty_program: true,
      ai_assistant: true,
      analytics: true
    }
  }
};

export default function PageDash(){
  return(
    <div>
      <BusinessProfile business={mockBusiness}/>
    </div>
  )
}