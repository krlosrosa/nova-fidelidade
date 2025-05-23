// app/(dashboard)/help/faq/page.tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, MessageCircleQuestionIcon, TrophyIcon, BotIcon, CreditCardIcon, SettingsIcon } from "lucide-react";

export default async function FAQPage() {
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Central de Ajuda</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Encontre respostas para suas dúvidas sobre o Teste
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar - agora aparece em cima em mobile */}
        <div className="lg:w-1/4">
          <div className="lg:sticky lg:top-4 space-y-4">
            <div className="relative">
              <Input
                placeholder="Buscar na ajuda..."
                className="pl-10"
              />
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>

            <nav className="space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <MessageCircleQuestionIcon className="mr-2 h-4 w-4" />
                Perguntas Frequentes
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <TrophyIcon className="mr-2 h-4 w-4" />
                Programa de Fidelidade
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <BotIcon className="mr-2 h-4 w-4" />
                Atendimento por IA
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <CreditCardIcon className="mr-2 h-4 w-4" />
                Planos e Assinatura
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <SettingsIcon className="mr-2 h-4 w-4" />
                Configurações da Conta
              </Button>
            </nav>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-2">Precisa de mais ajuda?</h3>
              <Button variant="outline" className="w-full">
                Contatar Suporte
              </Button>
            </div>
          </div>
        </div>

        {/* Conteúdo principal - agora ocupa 100% em mobile e 3/4 em desktop */}
        <div className="lg:w-3/4 space-y-6">
          {/* Seção de Perguntas Frequentes */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Perguntas Frequentes</h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Como configurar meu programa de fidelidade?</AccordionTrigger>
                <AccordionContent>
                  Acesse a seção "Fidelidade" no menu principal. Lá você pode definir quantos pontos os clientes ganham por compra, criar recompensas e personalizar as mensagens enviadas pelo WhatsApp.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Como atualizar o PDF da minha IA?</AccordionTrigger>
                <AccordionContent>
                  Na seção "Atendimento IA", clique em "Configurações" e depois em "Atualizar Base de Conhecimento". Você pode enviar um novo PDF a qualquer momento. A IA levará cerca de 5 minutos para processar as novas informações.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Como os clientes participam do programa de fidelidade?</AccordionTrigger>
                <AccordionContent>
                  Seus clientes podem se cadastrar enviando uma mensagem para o número do WhatsApp vinculado ao seu negócio com a palavra "FIDELIDADE". O sistema guiará eles através do processo de cadastro automaticamente.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Como verificar o status da minha assinatura?</AccordionTrigger>
                <AccordionContent>
                  Na seção "Configurações da Conta" → "Plano de Assinatura", você encontra todas as informações sobre seu plano atual, data de renovação e status de pagamento.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>Posso usar meu próprio domínio?</AccordionTrigger>
                <AccordionContent>
                  Sim, na seção "Configurações da Conta" → "Domínio Personalizado" você pode configurar seu próprio domínio. É necessário apontar o DNS conforme as instruções fornecidas.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Seção de Vídeos Tutoriais */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Vídeos Tutoriais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded mb-3 flex items-center justify-center">
                  <span className="text-gray-500">Vídeo 1</span>
                </div>
                <h3 className="font-medium">Configuração Inicial</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Aprenda a configurar sua conta pela primeira vez</p>
              </div>
              <div className="border rounded-lg p-4">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded mb-3 flex items-center justify-center">
                  <span className="text-gray-500">Vídeo 2</span>
                </div>
                <h3 className="font-medium">Criando Recompensas</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Como criar e gerenciar recompensas no programa de fidelidade</p>
              </div>
            </div>
          </section>

          {/* Seção de Contato */}
          <section className="border-t pt-6">
            <h2 className="text-2xl font-semibold mb-4">Não encontrou o que precisava?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="font-medium mb-2">Chat de Suporte</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Nosso time está disponível para ajudar no horário comercial.
                </p>
                <Button className="w-full">Iniciar Chat</Button>
              </div>
              <div className="border rounded-lg p-6">
                <h3 className="font-medium mb-2">Enviar E-mail</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Responderemos em até 24 horas úteis.
                </p>
                <Button variant="outline" className="w-full">
                  Enviar Mensagem
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}