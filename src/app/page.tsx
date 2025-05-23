// app/dashboard/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Users,
  MessageCircle,
  Gift,
  FileText,
  ChevronRight,
  CreditCard,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  // Dados simulados do negócio (substituir por chamadas API real)
  const businessData = {
    name: "Barbearia Moderna",
    clients: 1245,
    activeCampaigns: 3,
    pendingMessages: 12,
    pointsRedeemed: 78,
    recentActivity: [
      {
        id: 1,
        type: "fidelidade",
        client: "João Silva",
        action: "resgatou 100 pontos",
        time: "há 2 horas",
      },
      {
        id: 2,
        type: "mensagem",
        client: "Maria Souza",
        action: "perguntou sobre horários",
        time: "há 4 horas",
      },
      {
        id: 3,
        type: "ia",
        client: "Carlos Oliveira",
        action: "respondeu automaticamente",
        time: "há 1 dia",
      },
    ],
  };

  // Quick actions
  const quickActions = [
        {
      title: "Cadastrar Pontos",
      icon: <Gift className="h-5 w-5" />,
      link: "/funcionario/pontos",
    },
            {
      title: "Minha assinatura",
      icon: <CreditCard className="h-5 w-5" />,
      link: "/dashboard/subscriptions",
    },
    {
      title: "Enviar Promoção",
      icon: <Gift className="h-5 w-5" />,
      link: "/campaigns/new",
    },
    {
      title: "Treinar IA",
      icon: <FileText className="h-5 w-5" />,
      link: "/ai/train",
    },
    {
      title: "Ver Mensagens",
      icon: <MessageCircle className="h-5 w-5" />,
      link: "/messages",
    },
  ];

  const {push} = useRouter()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Olá, {businessData.name}!
          </h1>
          <p className="text-muted-foreground">
            Aqui está o resumo do seu negócio
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Ajuda</Button>
          <Button onClick={()=> push('/dashboard/config')}>Configurações</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{businessData.clients}</div>
            <p className="text-xs text-muted-foreground">
              +12% em relação ao mês passado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Campanhas Ativas
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {businessData.activeCampaigns}
            </div>
            <p className="text-xs text-muted-foreground">
              2 terminando esta semana
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Mensagens Pendentes
            </CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {businessData.pendingMessages}
            </div>
            <p className="text-xs text-muted-foreground">
              5 não respondidas 24h
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pontos Resgatados
            </CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {businessData.pointsRedeemed}
            </div>
            <p className="text-xs text-muted-foreground">
              +8% em relação à semana passada
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-lg font-semibold">Ações Rápidas</h2>
          <div className="space-y-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-between"
                onClick={() => push(action.link)}
              >
                <div className="flex items-center gap-3">
                  {action.icon}
                  {action.title}
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
            ))}
          </div>

          {/* AI Status */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Status do Atendimento IA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Precisão</span>
                  <span className="font-medium">87%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Perguntas respondidas</span>
                  <span className="font-medium">124</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Última atualização</span>
                  <span className="font-medium">há 2 dias</span>
                </div>
              </div>
              <Button variant="link" className="pl-0 mt-4">
                Ver detalhes do atendimento
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Atividade Recente</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {businessData.recentActivity.map((activity) => (
                  <div key={activity.id} className="p-4 hover:bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10">
                        {activity.type === "fidelidade" && (
                          <Gift className="h-4 w-4 text-primary" />
                        )}
                        {activity.type === "mensagem" && (
                          <MessageCircle className="h-4 w-4 text-primary" />
                        )}
                        {activity.type === "ia" && (
                          <Activity className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{activity.client}</div>
                        <div className="text-sm text-muted-foreground">
                          {activity.action}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 text-center border-t">
                <Button variant="ghost">Ver toda atividade</Button>
              </div>
            </CardContent>
          </Card>

          {/* Loyalty Program Summary */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">
              Programa de Fidelidade
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">
                    Pontos Distribuídos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,245</div>
                  <div className="h-2 bg-gray-200 rounded-full mt-2">
                    <div
                      className="h-2 bg-green-500 rounded-full"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    65% do objetivo mensal
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">
                    Recompensas Populares
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Corte grátis</span>
                      <span className="font-medium">42 resgates</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Desconto 20%</span>
                      <span className="font-medium">28 resgates</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Produto cortesia</span>
                      <span className="font-medium">15 resgates</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{/*"use client";

// app/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  RocketIcon,
  MessageCircleIcon,
  GiftIcon,
  RotateCwIcon,
  BarChartIcon,
  SettingsIcon,
  ZapIcon,
  Gamepad
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  // Mock data - dados do estabelecimento
  const establishment = {
    name: "Café & Cia",
    plan: "Plano Pro",
    progress: 65, // % de configuração do sistema
    clients: 142,
    pointsGiven: 2840,
    rewardsRedeemed: 56,
  };

  const router = useRouter()
  // Funcionalidades principais
  const features = [
    {
      icon: <MessageCircleIcon className="w-6 h-6 text-primary" />,
      title: "Atendimento Inteligente",
      description:
        "IA treinada com suas informações para responder clientes automaticamente",
    },
    {
      icon: <GiftIcon className="w-6 h-6 text-primary" />,
      title: "Programa de Fidelidade",
      description: "Sistema de pontos e recompensas direto no WhatsApp",
    },
    {
      icon: <RotateCwIcon className="w-6 h-6 text-primary" />,
      title: "Roleta de Prêmios",
      description: "Gamificação para aumentar o engajamento dos clientes",
    },
    {
      icon: <BarChartIcon className="w-6 h-6 text-primary" />,
      title: "Marketing Automático",
      description:
        "Campanhas personalizadas para datas especiais e reengajamento",
    },
  ];

  // Ações rápidas
  const quickActions = [
    { title: "Cadastrar Pontos", icon: <GiftIcon className="w-5 h-5" />, href: '/points'},
    { title: "Roleta", icon: <Gamepad className="w-5 h-5" />, href: '/roleta' },
    { title: "Ver Relatórios", icon: <BarChartIcon className="w-5 h-5" />, href: '/' },
    { title: "Configurar IA", icon: <SettingsIcon className="w-5 h-5" /> , href: '/'},
  ];

  return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Olá, {establishment.name}!
            </h1>
            <p className="text-gray-600">
              Bem-vindo ao seu painel de fidelidade inteligente via WhatsApp
            </p>

          </header>
            <div className="lg:col-span-2">
              <Card className="bg-white shadow-sm">
                <CardHeader>
                  <CardTitle>Ações rápidas</CardTitle>
                  <CardDescription>
                    Comece agora mesmo com estas ações
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-24 flex flex-col items-center justify-center gap-2"
                        onClick={()=> router.push(action.href)}
                      >
                        {action.icon}
                        <span>{action.title}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div>
              <Card className="bg-white shadow-sm h-full">
                <CardHeader>
                  <CardTitle>Primeiros passos</CardTitle>
                  <CardDescription>
                    Configure seu sistema em minutos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-1 rounded-full mt-1">
                        <span className="text-primary text-sm font-bold w-5 h-5 flex items-center justify-center">
                          1
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium">
                          Cadastre suas informações
                        </h3>
                        <p className="text-sm text-gray-600">
                          Horários, serviços, localização
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-1 rounded-full mt-1">
                        <span className="text-primary text-sm font-bold w-5 h-5 flex items-center justify-center">
                          2
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium">
                          Configure as recompensas
                        </h3>
                        <p className="text-sm text-gray-600">
                          Pontos necessários e prêmios
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-1 rounded-full mt-1">
                        <span className="text-primary text-sm font-bold w-5 h-5 flex items-center justify-center">
                          3
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium">Conecte seu WhatsApp</h3>
                        <p className="text-sm text-gray-600">
                          Integração simples em 2 minutos
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button className="mt-6 w-full">
                    Guia completo de configuração
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="grid grid-cols-1 mt-4 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Clientes</p>
                    <p className="text-2xl font-bold">
                      {establishment.clients}
                    </p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MessageCircleIcon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Pontos distribuídos</p>
                    <p className="text-2xl font-bold">
                      {establishment.pointsGiven}
                    </p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <RocketIcon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      Recompensas resgatadas
                    </p>
                    <p className="text-2xl font-bold">
                      {establishment.rewardsRedeemed}
                    </p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <GiftIcon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Seu plano</p>
                    <p className="text-2xl font-bold">{establishment.plan}</p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <ZapIcon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">O que você pode fazer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="hover:shadow-md transition-shadow h-full"
                >
                  <CardHeader>
                    <div className="mb-4">{feature.icon}</div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                    <Button variant="link" className="pl-0 mt-4">
                      Começar a usar →
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>


        </div>
      </div>
  );
}
*/}