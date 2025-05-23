import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// app/(dashboard)/help/loyalty/page.tsx
export default function LoyaltyHelpPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Ajuda - Programa de Fidelidade</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar (mesma do FAQ) */}
        
        <div className="lg:col-span-3 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Programa de Fidelidade</h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Como definir a pontuação por compra?</AccordionTrigger>
                <AccordionContent>
                  Na seção "Fidelidade"  "Configurações", você pode definir quantos pontos seus clientes ganham por real gasto ou por compra específica.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Como criar uma nova recompensa?</AccordionTrigger>
                <AccordionContent>
                  Acesse "Fidelidade"  "Recompensas" e clique em "Adicionar Recompensa". Defina o nome, descrição, valor em pontos e uma imagem se desejar.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Como os clientes resgatam recompensas?</AccordionTrigger>
                <AccordionContent>
                  Os clientes podem enviar "RESGATAR" no WhatsApp vinculado ao seu negócio. O sistema listará as recompensas disponíveis e guiará o cliente pelo processo.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>
      </div>
    </div>
  );
}