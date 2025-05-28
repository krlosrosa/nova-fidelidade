// app/dashboard/page.tsx
'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, Users, MessageCircle, Gift, Menu, Bell, Search } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { formatLastVisit } from "./formatLastVisit"
import { useTenantStore } from "../store/user-info"

// Dados mockados
const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Fev', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Abr', value: 2780 },
  { name: 'Mai', value: 3890 },
  { name: 'Jun', value: 2390 },
]

const customerActivity = [
  { name: 'Seg', novos: 4, resgates: 2 },
  { name: 'Ter', novos: 3, resgates: 1 },
  { name: 'Qua', novos: 5, resgates: 3 },
  { name: 'Qui', novos: 2, resgates: 4 },
  { name: 'Sex', novos: 6, resgates: 3 },
  { name: 'Sáb', novos: 4, resgates: 5 },
]

const recentCustomers = [
  { 
    name: 'João Silva', 
    pontos: 120, 
    ultimaVisita: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 dias atrás
  },
  { 
    name: 'Maria Souza', 
    pontos: 85, 
    ultimaVisita: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 dias atrás
  },
  { 
    name: 'Carlos Oliveira', 
    pontos: 200, 
    ultimaVisita: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 dia atrás
  },
  { 
    name: 'Ana Costa', 
    pontos: 50, 
    ultimaVisita: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 1 semana atrás
  },
  { 
    name: 'Pedro Santos', 
    pontos: 150, 
    ultimaVisita: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 dias atrás
  },
  { 
    name: 'Luiza Fernandes', 
    pontos: 90, 
    ultimaVisita: new Date().toISOString() // hoje
  },
  { 
    name: 'Rafael Pereira', 
    pontos: 180, 
    ultimaVisita: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString() // 2 semanas atrás
  },
  { 
    name: 'Fernanda Lima', 
    pontos: 75, 
    ultimaVisita: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 dia atrás
  }
];

const recentRewards = [
  { cliente: 'João Silva', recompensa: 'Corte grátis', data: '15/05/2023' },
  { cliente: 'Maria Souza', recompensa: 'Produto 50% off', data: '14/05/2023' },
]

export default function Dashboard() {
  
  const {tenant}  = useTenantStore()


  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6">
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
          <Button variant="outline" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        </header>
        
        {/* Dashboard Content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Clientes Ativos
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">
                  +12% em relação ao mês passado
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Resgates este mês
                </CardTitle>
                <Gift className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">56</div>
                <p className="text-xs text-muted-foreground">
                  +8% em relação ao mês passado
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Interações com IA
                </CardTitle>
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">342</div>
                <p className="text-xs text-muted-foreground">
                  87% de acerto nas respostas
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Meta Mensal
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 8,240</div>
                <p className="text-xs text-muted-foreground mt-2">
                  <Progress value={65} className="h-2" />
                  65% da meta (R$ 12,000)
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 mt-4 md:grid-cols-2">
            <Card className="p-4">
              <CardTitle className="text-lg mb-4">Receita Mensal</CardTitle>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" name="Receita (R$)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
            
            <Card className="p-4">
              <CardTitle className="text-lg mb-4">Atividade de Clientes</CardTitle>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={customerActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="novos" fill="#82ca9d" name="Novos clientes" />
                    <Bar dataKey="resgates" fill="#8884d8" name="Resgates" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
          
          <div className="grid gap-4 mt-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Clientes Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Pontos</TableHead>
                      <TableHead>Última Visita</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentCustomers.map((customer, index) => (
                      <TableRow key={index}>
                        <TableCell>{customer.name}</TableCell>
                        <TableCell>{customer.pontos}</TableCell>
                        <TableCell>{formatLastVisit(customer.ultimaVisita)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Resgates Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Recompensa</TableHead>
                      <TableHead>Data</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentRewards.map((reward, index) => (
                      <TableRow key={index}>
                        <TableCell>{reward.cliente}</TableCell>
                        <TableCell>{reward.recompensa}</TableCell>
                        <TableCell>{reward.data}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

// Mock store
const useStore = () => {
  return {
    user: {
      name: "João da Silva",
      email: "joao@barbearia.com",
      business: "Barbearia Elegance"
    }
  }
}