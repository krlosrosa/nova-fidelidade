// app/settings/page.tsx
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  Mail,
  MessageSquare,
  Smartphone,
  User,
  FileText,
} from "lucide-react";

export default function SettingsPage() {
  // Dados simulados do negócio
  const businessSettings = {
    name: "Barbearia Moderna",
    email: "contato@barbeariamoderna.com.br",
    phone: "(11) 98765-4321",
    address: "Rua Exemplo, 123 - São Paulo/SP",
    businessType: "barbearia",
    whatsappNumber: "+5511987654321",
    notifications: {
      email: true,
      sms: false,
      whatsapp: true,
    },
    loyaltyProgram: {
      active: true,
      pointsPerReal: 1,
      minimumPurchase: 50,
    },
    aiAssistant: {
      active: true,
      responseTime: "5 minutos",
      workingHours: "08:00 às 20:00",
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie as preferências do seu negócio
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Cancelar</Button>
          <Button>Salvar alterações</Button>
        </div>
      </div>

      <Tabs defaultValue="business" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5">
          <TabsTrigger value="business">
            <User className="h-4 w-4 mr-2" />
            Negócio
          </TabsTrigger>
          <TabsTrigger value="whatsapp">
            <MessageSquare className="h-4 w-4 mr-2" />
            WhatsApp
          </TabsTrigger>
          <TabsTrigger value="loyalty">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Fidelidade
          </TabsTrigger>
          <TabsTrigger value="ai">
            <Smartphone className="h-4 w-4 mr-2" />
            Atendimento IA
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Mail className="h-4 w-4 mr-2" />
            Notificações
          </TabsTrigger>
        </TabsList>

        {/* Seção de Informações do Negócio */}
        <TabsContent value="business">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Informações do Negócio</CardTitle>
              <CardDescription>
                Atualize os dados básicos do seu estabelecimento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="business-name">Nome do Estabelecimento</Label>
                  <Input
                    id="business-name"
                    defaultValue={businessSettings.name}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-type">Tipo de Negócio</Label>
                  <Select defaultValue={businessSettings.businessType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="barbearia">Barbearia</SelectItem>
                      <SelectItem value="salon">Salão de Beleza</SelectItem>
                      <SelectItem value="store">Loja</SelectItem>
                      <SelectItem value="restaurant">Restaurante</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" defaultValue={businessSettings.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" defaultValue={businessSettings.phone} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input id="address" defaultValue={businessSettings.address} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Seção de Configurações do WhatsApp */}
        <TabsContent value="whatsapp">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Configurações do WhatsApp</CardTitle>
              <CardDescription>
                Gerencie a integração com o WhatsApp Business
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="whatsapp-number">Número do WhatsApp</Label>
                <Input
                  id="whatsapp-number"
                  defaultValue={businessSettings.whatsappNumber}
                />
                <p className="text-sm text-muted-foreground">
                  Este número será usado para enviar mensagens aos clientes
                </p>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <h3 className="font-medium">Mensagens Automáticas</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="confirm-booking">
                      Confirmação de Agendamento
                    </Label>
                    <Switch id="confirm-booking" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Envia mensagem automática quando um cliente agenda
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="reminder">
                      Lembrete de Agendamento (24h antes)
                    </Label>
                    <Switch id="reminder" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Envia lembrete 24 horas antes do agendamento
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="feedback">
                      Solicitação de Feedback (após serviço)
                    </Label>
                    <Switch id="feedback" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Envia mensagem pedindo avaliação após o serviço
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Seção do Programa de Fidelidade */}
        <TabsContent value="loyalty">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Programa de Fidelidade</CardTitle>
              <CardDescription>
                Configure como os clientes acumulam e resgatam pontos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="loyalty-active">Programa ativo</Label>
                  <p className="text-sm text-muted-foreground">
                    Ative ou desative o programa de fidelidade
                  </p>
                </div>
                <Switch
                  id="loyalty-active"
                  defaultChecked={businessSettings.loyaltyProgram.active}
                />
              </div>

              <Separator className="my-4" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="points-per-real">Pontos por R$1 gasto</Label>
                  <Input
                    id="points-per-real"
                    type="number"
                    defaultValue={businessSettings.loyaltyProgram.pointsPerReal}
                  />
                  <p className="text-sm text-muted-foreground">
                    Quantos pontos o cliente ganha por cada real gasto
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="min-purchase">
                    Compra mínima para ganhar pontos
                  </Label>
                  <Input
                    id="min-purchase"
                    type="number"
                    defaultValue={businessSettings.loyaltyProgram.minimumPurchase}
                  />
                  <p className="text-sm text-muted-foreground">
                    Valor mínimo da compra para acumular pontos
                  </p>
                </div>
              </div>

              <Separator className="my-4" />

              <div>
                <h3 className="font-medium mb-2">Recompensas Disponíveis</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Corte grátis</p>
                      <p className="text-sm text-muted-foreground">
                        100 pontos
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Editar
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Desconto 20%</p>
                      <p className="text-sm text-muted-foreground">
                        80 pontos
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Editar
                    </Button>
                  </div>
                  <Button variant="outline" className="w-full mt-2">
                    + Adicionar nova recompensa
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Seção do Assistente IA */}
        <TabsContent value="ai">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Atendimento por IA</CardTitle>
              <CardDescription>
                Configure o assistente virtual que atende seus clientes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="ai-active">Atendimento IA ativo</Label>
                  <p className="text-sm text-muted-foreground">
                    O assistente responderá automaticamente às mensagens
                  </p>
                </div>
                <Switch
                  id="ai-active"
                  defaultChecked={businessSettings.aiAssistant.active}
                />
              </div>

              <Separator className="my-4" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="response-time">Tempo de resposta máximo</Label>
                  <Select defaultValue={businessSettings.aiAssistant.responseTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1 minuto">Imediato (1 min)</SelectItem>
                      <SelectItem value="5 minutos">5 minutos</SelectItem>
                      <SelectItem value="15 minutos">15 minutos</SelectItem>
                      <SelectItem value="30 minutos">30 minutos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="working-hours">Horário de funcionamento</Label>
                  <Select defaultValue={businessSettings.aiAssistant.workingHours}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="08:00 às 20:00">
                        08:00 às 20:00
                      </SelectItem>
                      <SelectItem value="09:00 às 19:00">
                        09:00 às 19:00
                      </SelectItem>
                      <SelectItem value="24 horas">24 horas</SelectItem>
                      <SelectItem value="custom">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <Label>Documentos para treinamento da IA</Label>
                <div className="border rounded-lg divide-y">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Serviços oferecidos.pdf</p>
                        <p className="text-sm text-muted-foreground">
                          Última atualização: 15/05/2023
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Remover
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Preços e promoções.pdf</p>
                        <p className="text-sm text-muted-foreground">
                          Última atualização: 02/06/2023
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Remover
                    </Button>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-2">
                  + Adicionar novo documento
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Seção de Notificações */}
        <TabsContent value="notifications">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Configurações de Notificação</CardTitle>
              <CardDescription>
                Escolha como deseja receber alertas e atualizações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Canais de Notificação</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Notificações por E-mail
                      </div>
                    </Label>
                    <Switch
                      id="email-notifications"
                      defaultChecked={businessSettings.notifications.email}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">
                    Receba alertas importantes no seu e-mail
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-notifications">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        Notificações por SMS
                      </div>
                    </Label>
                    <Switch
                      id="sms-notifications"
                      defaultChecked={businessSettings.notifications.sms}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">
                    Receba alertas urgentes por mensagem de texto
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="whatsapp-notifications">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Notificações por WhatsApp
                      </div>
                    </Label>
                    <Switch
                      id="whatsapp-notifications"
                      defaultChecked={businessSettings.notifications.whatsapp}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">
                    Receba alertas no WhatsApp Business
                  </p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <h3 className="font-medium">Tipos de Notificação</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="new-booking">Novos agendamentos</Label>
                    <Switch id="new-booking" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Receba notificação quando um cliente marcar horário
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="cancel-booking">
                      Cancelamentos de agendamento
                    </Label>
                    <Switch id="cancel-booking" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Receba notificação quando um cliente cancelar
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="points-redeemed">
                      Resgate de pontos de fidelidade
                    </Label>
                    <Switch id="points-redeemed" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Receba notificação quando um cliente resgatar recompensas
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="unanswered-messages">
                      Mensagens não respondidas
                    </Label>
                    <Switch id="unanswered-messages" defaultChecked />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Receba alerta quando houver mensagens sem resposta por mais
                    de 1 hora
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}