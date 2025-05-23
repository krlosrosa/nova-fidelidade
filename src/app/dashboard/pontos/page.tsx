'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Search, QrCode, Gift, Plus, User, Phone, Check, X, Camera, Users, Scan, History, Clock } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import QrScanner from '@/components/qrCodeScanner'

interface Customer {
  id: number
  name: string
  phone: string
  points: number
  qrCode: string
  totalSpent: number
  visits: number
}

interface Reward {
  id: number
  name: string
  points: number
}

interface RedeemCode {
  code: string
  customerId: number
  rewardId: number
  expiresAt: string
  isUsed: boolean
}

interface Activity {
  id: number
  type: 'add_points' | 'redeem'
  customer: {
    name: string
    phone: string
  }
  details: {
    points?: number
    newTotal?: number
    reward?: string
    pointsUsed?: number
    qrCode?: string
  }
  timestamp: Date
}

interface PendingAction {
  type: 'add' | 'redeem'
  points?: number
  reward?: Reward
  customer: Customer
  redeemCode?: RedeemCode
}

const historyAct: Activity[] = [
  {
    id: 1,
    type: 'add_points',
    customer: {
      name: 'João Silva',
      phone: '(11) 99999-9999'
    },
    details: {
      points: 50,
      newTotal: 135
    },
    timestamp: new Date('2023-05-15T10:30:00')
  },
  {
    id: 2,
    type: 'redeem',
    customer: {
      name: 'Maria Santos',
      phone: '(11) 88888-8888'
    },
    details: {
      reward: 'Desconto 10%',
      pointsUsed: 50,
      newTotal: 70,
      qrCode: 'REDEEM_001_DESCONTO10_MARIA'
    },
    timestamp: new Date('2023-05-15T11:15:00')
  },
  {
    id: 3,
    type: 'add_points',
    customer: {
      name: 'Pedro Costa',
      phone: '(11) 77777-7777'
    },
    details: {
      points: 30,
      newTotal: 75
    },
    timestamp: new Date('2023-05-15T14:45:00')
  },
  {
    id: 4,
    type: 'redeem',
    customer: {
      name: 'João Silva',
      phone: '(11) 99999-9999'
    },
    details: {
      reward: 'Produto Grátis',
      pointsUsed: 75,
      newTotal: 60,
      qrCode: 'REDEEM_002_PRODUTO_JOAO'
    },
    timestamp: new Date('2023-05-15T16:20:00')
  },
  {
    id: 5,
    type: 'add_points',
    customer: {
      name: 'Maria Santos',
      phone: '(11) 88888-8888'
    },
    details: {
      points: 100,
      newTotal: 170
    },
    timestamp: new Date('2025-05-22T17:10:00')
  }
]

const EmployeeDashboard = () => {
  const [activeTab, setActiveTab] = useState('search')
  const [searchPhone, setSearchPhone] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [pointsToAdd, setPointsToAdd] = useState('')
  const [showCamera, setShowCamera] = useState(false)
  const [showRedeemScanner, setShowRedeemScanner] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirmationType, setConfirmationType] = useState('')
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(null)
  const [activityHistory, setActivityHistory] = useState<Activity[]>(historyAct)
  const [scannedQrCode, setScannedQrCode] = useState('')
  const [scannedRedeemCode, setScannedRedeemCode] = useState('')

  // Mock data - em produção viria de uma API
  const [customers] = useState<Customer[]>([
    {
      id: 1,
      name: 'João Silva',
      phone: '(11) 99999-9999',
      points: 85,
      qrCode: 'CUSTOMER_QR_001',
      totalSpent: 450.00,
      visits: 12
    },
    {
      id: 2,
      name: 'Maria Santos',
      phone: '(11) 88888-8888',
      points: 120,
      qrCode: 'CUSTOMER_QR_002',
      totalSpent: 680.00,
      visits: 18
    },
    {
      id: 3,
      name: 'Pedro Costa',
      phone: '(11) 77777-7777',
      points: 45,
      qrCode: 'CUSTOMER_QR_003',
      totalSpent: 230.00,
      visits: 7
    }
  ])

  const rewardOptions: Reward[] = [
    { id: 1, name: 'Desconto 10%', points: 50 },
    { id: 2, name: 'Corte Grátis', points: 100 },
    { id: 3, name: 'Produto Grátis', points: 75 },
    { id: 4, name: 'Desconto 20%', points: 150 }
  ]

  // Mock de QR codes de resgate válidos
  const [validRedeemCodes] = useState<RedeemCode[]>([
    { 
      code: 'REDEEM_001_DESCONTO10_JOAO', 
      customerId: 1, 
      rewardId: 1, 
      expiresAt: '2025-12-31',
      isUsed: false 
    },
    { 
      code: 'REDEEM_002_CORTEGRATIS_MARIA', 
      customerId: 2, 
      rewardId: 2, 
      expiresAt: '2025-12-31',
      isUsed: false 
    },
    { 
      code: 'REDEEM_003_PRODUTO_PEDRO', 
      customerId: 3, 
      rewardId: 3, 
      expiresAt: '2025-12-31',
      isUsed: false 
    }
  ])

  // Process scanned QR code for customer identification
  useEffect(() => {
    if (scannedQrCode) {
      const customer = customers.find(c => c.qrCode === scannedQrCode)
      if (customer) {
        setSelectedCustomer(customer)
        toast.success(`Cliente ${customer.name} identificado!`)
        setShowCamera(false)
      } else {
        toast.error('QR Code não reconhecido')
      }
    }
  }, [scannedQrCode, customers])

  // Process scanned redeem code
  useEffect(() => {
    if (scannedRedeemCode) {
      const redeemCode = validRedeemCodes.find(code => 
        code.code === scannedRedeemCode && !code.isUsed
      )
      
      if (redeemCode) {
        const customer = customers.find(c => c.id === redeemCode.customerId)
        const reward = rewardOptions.find(r => r.id === redeemCode.rewardId)
        
        if (customer && reward) {
          // Verificar se é o cliente correto (se já há um selecionado)
          if (selectedCustomer && selectedCustomer.id !== customer.id) {
            toast.error('Este QR Code pertence a outro cliente')
            return
          }
          
          // Verificar se não expirou
          if (new Date(redeemCode.expiresAt) < new Date()) {
            toast.error('QR Code de resgate expirado')
            return
          }
          
          setPendingAction({
            type: 'redeem',
            reward: reward,
            customer: customer,
            redeemCode: redeemCode
          })
          setConfirmationType('redeem')
          setShowConfirmation(true)
          setShowRedeemScanner(false)
          toast.success('QR Code de resgate válido!')
        }
      } else {
        toast.error('QR Code de resgate inválido ou já utilizado')
      }
    }
  }, [scannedRedeemCode, validRedeemCodes, customers, rewardOptions, selectedCustomer])

  // Função para adicionar atividade ao histórico
  const addToHistory = (type: 'add_points' | 'redeem', customer: Customer, details: Activity['details']) => {
    const activity: Activity = {
      id: Date.now(),
      type,
      customer: {
        name: customer.name,
        phone: customer.phone
      },
      details,
      timestamp: new Date(),
    }
    setActivityHistory(prev => [activity, ...prev])
  }

  // Buscar cliente por telefone
  const searchCustomer = () => {
    const customer = customers.find(c => 
      c.phone.replace(/\D/g, '').includes(searchPhone.replace(/\D/g, '')))
    
    if (customer) {
      setSelectedCustomer(customer)
      toast.success(`Cliente ${customer.name} encontrado!`)
    } else {
      toast.error('Cliente não encontrado')
    }
  }

  // Adicionar pontos
  const addPoints = () => {
    const points = parseInt(pointsToAdd)
    if (!points || points < 1 || points > 500) {
      toast.error('Insira uma quantidade válida de pontos (1-500)')
      return
    }
    
    if (!selectedCustomer) return
    
    setPendingAction({
      type: 'add',
      points: points,
      customer: selectedCustomer
    })
    setConfirmationType('add')
    setShowConfirmation(true)
  }

  // Resgatar recompensa (método tradicional - não usado mais)
  const redeemReward = (reward: Reward) => {
    if (!selectedCustomer) return
    
    if (selectedCustomer.points < reward.points) {
      toast.error('Cliente não possui pontos suficientes para este resgate')
      return
    }

    setPendingAction({
      type: 'redeem',
      reward: reward,
      customer: selectedCustomer
    })
    setConfirmationType('redeem')
    setShowConfirmation(true)
  }

  // Confirmar ação
  const confirmAction = () => {
    if (!pendingAction || !selectedCustomer) return
    
    if (pendingAction.type === 'add' && pendingAction.points) {
      // Simular adição de pontos
      selectedCustomer.points += pendingAction.points
      
      // Adicionar ao histórico
      addToHistory('add_points', selectedCustomer, {
        points: pendingAction.points,
        newTotal: selectedCustomer.points
      })
      
      toast.success(`${pendingAction.points} pontos adicionados com sucesso!`, {
        position: "top-center",
        autoClose: 3000,
      })
    } else if (pendingAction.type === 'redeem' && pendingAction.reward) {
      // Simular resgate
      if (pendingAction.redeemCode) {
        // Marcar código como usado
        pendingAction.redeemCode.isUsed = true
      }
      selectedCustomer.points -= pendingAction.reward.points
      
      // Adicionar ao histórico
      addToHistory('redeem', selectedCustomer, {
        reward: pendingAction.reward.name,
        pointsUsed: pendingAction.reward.points,
        newTotal: selectedCustomer.points,
        qrCode: pendingAction.redeemCode?.code
      })
      
      toast.success(`Resgate de "${pendingAction.reward.name}" confirmado!`, {
        position: "top-center",
        autoClose: 3000,
      })
    }
    
    setShowConfirmation(false)
    setPendingAction(null)
    setPointsToAdd('')
  }

  // Cancelar ação
  const cancelAction = () => {
    setShowConfirmation(false)
    setPendingAction(null)
    toast.info('Operação cancelada')
  }

  // Reset
  const resetSelection = () => {
    setSelectedCustomer(null)
    setSearchPhone('')
    setPointsToAdd('')
    setActiveTab('search')
    setShowCamera(false)
    setShowRedeemScanner(false)
  }

  // Formatar data para exibição
  const formatDateTime = (date: Date) => {
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  // Calcular estatísticas do dia
  const getTodayStats = () => {
    const today = new Date().toDateString()
    const todayActivities = activityHistory.filter(activity => 
      activity.timestamp.toDateString() === today
    )
    
    const pointsAdded = todayActivities
      .filter(activity => activity.type === 'add_points')
      .reduce((sum, activity) => sum + (activity.details.points || 0), 0)
    
    const redeems = todayActivities.filter(activity => activity.type === 'redeem').length
    
    return {
      totalActivities: todayActivities.length,
      pointsAdded,
      redeems,
      customers: new Set(todayActivities.map(activity => activity.customer.phone)).size
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full md:p-4">
      <div className="max-w-md mx-auto bg-white md:rounded-lg shadow-lg overflow-hidden min-h-screen md:min-h-0">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4">
          <h1 className="text-xl font-bold text-center">Sistema de Fidelidade</h1>
          <p className="text-blue-100 text-center text-sm mt-1">Painel do Funcionário</p>
        </div>

        {/* Tabs */}
        {!selectedCustomer && (
          <div className="flex border-b">
            <button
              onClick={() => {
                setActiveTab('search')
                setShowCamera(false)
                setShowRedeemScanner(false)
              }}
              className={`flex-1 py-3 px-2 text-center ${
                activeTab === 'search' 
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600'
              }`}
            >
              <Search className="w-4 h-4 mx-auto mb-1" />
              <span className="text-xs">Buscar</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('qr')
                setShowRedeemScanner(false)
              }}
              className={`flex-1 py-3 px-2 text-center ${
                activeTab === 'qr' 
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600'
              }`}
            >
              <QrCode className="w-4 h-4 mx-auto mb-1" />
              <span className="text-xs">QR Code</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('redeem')
                setShowCamera(false)
              }}
              className={`flex-1 py-3 px-2 text-center ${
                activeTab === 'redeem' 
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600'
              }`}
            >
              <Scan className="w-4 h-4 mx-auto mb-1" />
              <span className="text-xs">Resgate</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('history')
                setShowCamera(false)
                setShowRedeemScanner(false)
              }}
              className={`flex-1 py-3 px-2 text-center ${
                activeTab === 'history' 
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600'
              }`}
            >
              <History className="w-4 h-4 mx-auto mb-1" />
              <span className="text-xs">Histórico</span>
            </button>
          </div>
        )}

        <div className="p-4">
          {/* Busca por telefone */}
          {activeTab === 'search' && !selectedCustomer && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Buscar por telefone
                </label>
                <div className="flex space-x-2">
                  <input
                    type="tel"
                    value={searchPhone}
                    onChange={(e) => setSearchPhone(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && searchCustomer()}
                  />
                  <button
                    onClick={searchCustomer}
                    className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {searchPhone && !selectedCustomer && (
                <div className="text-center text-gray-500 py-4">
                  <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Nenhum cliente encontrado</p>
                </div>
              )}
            </div>
          )}

          {/* Scanner QR Code para identificar cliente */}
          {activeTab === 'qr' && !selectedCustomer && (
            <div className="space-y-4">
              <div className="text-center">
                <QrCode className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Identificar Cliente
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Escaneie o QR Code do cliente para identificá-lo
                </p>
                
                {!showCamera ? (
                  <button
                    onClick={() => setShowCamera(true)}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Iniciar Scanner
                  </button>
                ) : (
                  <div className="space-y-4">
                    <QrScanner setText={setScannedQrCode} showScanner={setShowCamera} />
                    <button
                      onClick={() => setShowCamera(false)}
                      className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Parar Scanner
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Scanner QR Code para resgate */}
          {activeTab === 'redeem' && !selectedCustomer && (
            <div className="space-y-4">
              <div className="text-center">
                <Scan className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Scanner de Resgate
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Escaneie o QR Code de resgate que o cliente recebeu
                </p>
                
                {!showRedeemScanner ? (
                  <button
                    onClick={() => setShowRedeemScanner(true)}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    <Scan className="w-5 h-5 mr-2" />
                    Iniciar Scanner de Resgate
                  </button>
                ) : (
                  <div className="space-y-4">
                    <QrScanner setText={setScannedRedeemCode} showScanner={setShowRedeemScanner} />
                    <button
                      onClick={() => setShowRedeemScanner(false)}
                      className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Parar Scanner
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Histórico de atividades */}
          {activeTab === 'history' && !selectedCustomer && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <History className="w-5 h-5 mr-2" />
                  Histórico de Atividades
                </h3>
                <div className="flex items-center text-sm bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                  <Clock className="w-4 h-4 mr-1" />
                  Hoje
                </div>
              </div>

              {/* Estatísticas do dia */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-sm text-gray-500">Atividades</p>
                    <p className="font-bold text-blue-600">{getTodayStats().totalActivities}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pontos</p>
                    <p className="font-bold text-green-600">+{getTodayStats().pointsAdded}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Resgates</p>
                    <p className="font-bold text-orange-600">{getTodayStats().redeems}</p>
                  </div>
                </div>
              </div>

              {/* Lista de atividades */}
              {activityHistory.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <History className="w-10 h-10 mx-auto mb-3 opacity-40" />
                  <p>Nenhuma atividade registrada hoje</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {activityHistory.map(activity => (
                    <div key={activity.id} className="border-b pb-3 last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">
                            {activity.customer.name} ({activity.customer.phone})
                          </p>
                          <p className="text-sm text-gray-600">
                            {activity.type === 'add_points' ? (
                              <span className="text-green-600">+{activity.details.points} pontos</span>
                            ) : (
                              <span className="text-orange-600">Resgate: {activity.details.reward}</span>
                            )}
                          </p>
                          {activity.type === 'redeem' && activity.details.qrCode && (
                            <p className="text-xs text-gray-500 mt-1">Código: {activity.details.qrCode}</p>
                          )}
                        </div>
                        <span className="text-xs text-gray-400 whitespace-nowrap">
                          {formatDateTime(activity.timestamp)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Cliente selecionado */}
          {selectedCustomer && (
            <div className="space-y-6">
              {/* Info do cliente */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="font-medium text-gray-900">{selectedCustomer.name}</span>
                  </div>
                  <button
                    onClick={resetSelection}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gray-600 text-sm mb-2">{selectedCustomer.phone}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Pontos atuais:</span>
                  <span className="font-bold text-blue-600">{selectedCustomer.points} pts</span>
                </div>
              </div>

              {/* Adicionar pontos */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900 flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Pontos
                </h3>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={pointsToAdd}
                    onChange={(e) => setPointsToAdd(e.target.value)}
                    placeholder="Quantidade de pontos"
                    min="1"
                    max="500"
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && addPoints()}
                  />
                  <button
                    onClick={addPoints}
                    className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-gray-500">Máximo: 500 pontos por transação</p>
              </div>

              {/* Scanner de resgate para cliente específico */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900 flex items-center">
                  <Scan className="w-4 h-4 mr-2" />
                  Validar Resgate
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Escaneie o QR Code de resgate que este cliente apresentou
                </p>
                
                {!showRedeemScanner ? (
                  <button
                    onClick={() => setShowRedeemScanner(true)}
                    className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center"
                  >
                    <Scan className="w-5 h-5 mr-2" />
                    Escanear QR de Resgate
                  </button>
                ) : (
                  <div className="space-y-4">
                    <QrScanner setText={setScannedRedeemCode} showScanner={setShowRedeemScanner} />
                    <button
                      onClick={() => setShowRedeemScanner(false)}
                      className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Parar Scanner
                    </button>
                  </div>
                )}
              </div>

              {/* Recompensas disponíveis (para referência) */}
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900 flex items-center">
                  <Gift className="w-4 h-4 mr-2" />
                  Recompensas Disponíveis
                </h3>
                <div className="space-y-2">
                  {rewardOptions.map(reward => (
                    <div
                      key={reward.id}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        selectedCustomer.points >= reward.points
                          ? 'border-green-200 bg-green-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div>
                        <p className="font-medium text-gray-900">{reward.name}</p>
                        <p className="text-sm text-gray-600">{reward.points} pontos</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedCustomer.points >= reward.points
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {selectedCustomer.points >= reward.points ? 'Disponível' : 'Indisponível'}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 bg-yellow-50 p-2 rounded">
                  💡 Para resgatar uma recompensa, o cliente deve gerar o QR Code no aplicativo e você deve escaneá-lo acima.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal de confirmação */}
        {showConfirmation && pendingAction && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Confirmar {confirmationType === 'add' ? 'Adição de Pontos' : 'Resgate'}
              </h3>
              
              {confirmationType === 'add' ? (
                <div className="space-y-3">
                  <p className="text-gray-600">
                    Adicionar <span className="font-bold text-green-600">{pendingAction.points} pontos</span> para:
                  </p>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium">{pendingAction.customer.name}</p>
                    <p className="text-sm text-gray-600">{pendingAction.customer.phone}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-gray-600">
                    Confirmar resgate de <span className="font-bold text-blue-600">{pendingAction.reward?.name}</span>:
                  </p>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium">{pendingAction.customer.name}</p>
                    <p className="text-sm text-gray-600">
                      Pontos a serem deduzidos: {pendingAction.reward?.points} pts
                    </p>
                    <p className="text-sm text-gray-600">
                      Pontos após resgate: {pendingAction.customer.points - (pendingAction.reward?.points || 0)} pts
                    </p>
                  </div>
                  {pendingAction.redeemCode && (
                    <div className="bg-blue-50 p-2 rounded text-xs">
                      <p className="text-blue-800">QR Code: {pendingAction.redeemCode.code}</p>
                    </div>
                  )}
                </div>
              )}

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={cancelAction}
                  className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmAction}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Check className="w-4 h-4 mr-1" />
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default EmployeeDashboard