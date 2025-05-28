'use client'
import React, { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, Award, Gift, Star, CheckCircle, XCircle } from 'lucide-react'

interface Prize {
  id: string
  name: string
  description: string
  points_required: number
  stock: number
  image_url: string
  is_active: boolean
  created_at: string
  tenant_id: string
}

interface PrizeFormData {
  name: string
  description: string
  points_required: number
  stock: number
  image_url: string
  is_active: boolean
}

// Simulação do Zustand store
const usePrizeStore = () => {
  const [prizes, setPrizes] = useState<Prize[]>([
    {
      id: '1',
      name: 'Corte de Cabelo Grátis',
      description: 'Um corte de cabelo gratuito com nosso barbeiro premium',
      points_required: 100,
      stock: 10,
      image_url: '/images/haircut.jpg',
      is_active: true,
      created_at: '2024-01-15',
      tenant_id: 'barbearia-123'
    },
    {
      id: '2',
      name: 'Kit de Produtos',
      description: 'Kit completo com shampoo, condicionador e pomada',
      points_required: 200,
      stock: 5,
      image_url: '/images/products.jpg',
      is_active: true,
      created_at: '2024-02-20',
      tenant_id: 'barbearia-123'
    },
    {
      id: '3',
      name: 'Beer Mug Exclusiva',
      description: 'Caneca personalizada da barbearia (edição limitada)',
      points_required: 150,
      stock: 0,
      image_url: '/images/mug.jpg',
      is_active: false,
      created_at: '2024-03-10',
      tenant_id: 'barbearia-123'
    }
  ])

  const addPrize = (prize: Omit<Prize, 'id' | 'created_at'>) => {
    setPrizes(prev => [
      ...prev, 
      { 
        ...prize, 
        id: Date.now().toString(),
        created_at: new Date().toISOString().split('T')[0]
      }
    ])
  }

  const updatePrize = (id: string, updatedPrize: Partial<Prize>) => {
    setPrizes(prev => prev.map(prize => 
      prize.id === id ? { ...prize, ...updatedPrize } : prize
    ))
  }

  const deletePrize = (id: string) => {
    setPrizes(prev => prev.filter(prize => prize.id !== id))
  }

  const togglePrizeStatus = (id: string) => {
    setPrizes(prev => prev.map(prize => 
      prize.id === id ? { ...prize, is_active: !prize.is_active } : prize
    ))
  }

  return { prizes, addPrize, updatePrize, deletePrize, togglePrizeStatus }
}

interface PrizeModalProps {
  isOpen: boolean
  onClose: () => void
  prize: Prize | null
  onSave: (prize: PrizeFormData) => void
}

// Componente do Modal de Prêmio
const PrizeModal = ({ isOpen, onClose, prize, onSave }: PrizeModalProps) => {
  const [formData, setFormData] = useState<PrizeFormData>({
    name: '',
    description: '',
    points_required: 0,
    stock: 0,
    image_url: '',
    is_active: true
  })

  useEffect(() => {
    if (prize) {
      setFormData({
        name: prize.name,
        description: prize.description,
        points_required: prize.points_required,
        stock: prize.stock,
        image_url: prize.image_url,
        is_active: prize.is_active
      })
    } else {
      setFormData({
        name: '',
        description: '',
        points_required: 0,
        stock: 0,
        image_url: '',
        is_active: true
      })
    }
  }, [prize, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">
            {prize ? 'Editar Prêmio' : 'Novo Prêmio'}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome do Prêmio*</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: Corte de Cabelo Grátis"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Descrição*</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Descreva o prêmio em detalhes"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Pontos Necessários*</label>
              <input
                type="number"
                min="1"
                value={formData.points_required}
                onChange={(e) => setFormData({ ...formData, points_required: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="100"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Estoque Disponível</label>
              <input
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">URL da Imagem</label>
            <input
              type="text"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://exemplo.com/imagem.jpg"
            />
            {formData.image_url && (
              <div className="mt-2">
                <img 
                  src={formData.image_url} 
                  alt="Preview" 
                  className="h-20 object-cover rounded border"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="is_active" className="text-sm font-medium">
              Prêmio disponível para resgate
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {prize ? 'Salvar Alterações' : 'Adicionar Prêmio'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

interface PrizeCardProps {
  prize: Prize
  onEdit: (prize: Prize) => void
  onDelete: (id: string) => void
  onToggleStatus: (id: string) => void
}

// Componente do Card de Prêmio
const PrizeCard = ({ prize, onEdit, onDelete, onToggleStatus }: PrizeCardProps) => {
  const getStatusColor = (is_active: boolean) => 
    is_active ? 'text-green-600' : 'text-red-600'
  
  const getStatusBg = (is_active: boolean) => 
    is_active ? 'bg-green-100' : 'bg-red-100'

  return (
    <div className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
            <Award className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{prize.name}</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-blue-600 flex items-center">
                <Star className="w-3 h-3 mr-1" />
                {prize.points_required} pts
              </span>
              {prize.stock > 0 ? (
                <span className="text-sm text-gray-600">{prize.stock} disponíveis</span>
              ) : (
                <span className="text-sm text-red-600">Esgotado</span>
              )}
            </div>
          </div>
        </div>
        
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBg(prize.is_active)} ${getStatusColor(prize.is_active)}`}>
          {prize.is_active ? 'Ativo' : 'Inativo'}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 line-clamp-2">{prize.description}</p>
      </div>

      {prize.image_url && (
        <div className="mb-4 rounded-lg overflow-hidden border">
          <img 
            src={prize.image_url} 
            alt={prize.name}
            className="w-full h-32 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none'
            }}
          />
        </div>
      )}

      <div className="flex justify-between items-center pt-3 border-t">
        <span className="text-xs text-gray-500">
          Cadastrado em {new Date(prize.created_at).toLocaleDateString('pt-BR')}
        </span>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onToggleStatus(prize.id)}
            className={`p-1 rounded hover:scale-110 transition-transform ${
              prize.is_active ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'
            }`}
            title={prize.is_active ? 'Desativar' : 'Ativar'}
          >
            {prize.is_active ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
          </button>
          
          <button
            onClick={() => onEdit(prize)}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded hover:scale-110 transition-transform"
            title="Editar"
          >
            <Edit className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onDelete(prize.id)}
            className="p-1 text-red-600 hover:bg-red-50 rounded hover:scale-110 transition-transform"
            title="Excluir"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Componente Principal
const PrizeManagement = () => {
  const { prizes, addPrize, updatePrize, deletePrize, togglePrizeStatus } = usePrizeStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPrize, setEditingPrize] = useState<Prize | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all')
  const [filterStock, setFilterStock] = useState<'all' | 'available' | 'out'>('all')

  const filteredPrizes = prizes.filter(prize => {
    const matchesSearch = prize.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prize.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && prize.is_active) ||
                         (filterStatus === 'inactive' && !prize.is_active)
    
    const matchesStock = filterStock === 'all' ||
                        (filterStock === 'available' && prize.stock > 0) ||
                        (filterStock === 'out' && prize.stock <= 0)
    
    return matchesSearch && matchesStatus && matchesStock
  })

  const handleSave = (prizeData: PrizeFormData) => {
    if (editingPrize) {
      updatePrize(editingPrize.id, prizeData)
    } else {
      addPrize({
        ...prizeData,
        tenant_id: 'barbearia-123'
      })
    }
    setEditingPrize(null)
  }

  const handleEdit = (prize: Prize) => {
    setEditingPrize(prize)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este prêmio?')) {
      deletePrize(id)
    }
  }

  const activePrizes = prizes.filter(prize => prize.is_active).length
  const availablePrizes = prizes.filter(prize => prize.stock > 0).length

  return (
    <div className="min-h-screen bg-gray-50 w-full p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gerenciamento de Prêmios</h1>
          <p className="text-gray-600">Configure os prêmios do seu programa de fidelidade</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Prêmios</p>
                <p className="text-3xl font-bold text-gray-900">{prizes.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Gift className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Prêmios Ativos</p>
                <p className="text-3xl font-bold text-green-600">{activePrizes}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Com Estoque</p>
                <p className="text-3xl font-bold text-purple-600">{availablePrizes}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-lg border p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1 lg:mr-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar prêmio..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos os status</option>
                <option value="active">Ativos</option>
                <option value="inactive">Inativos</option>
              </select>

              <select
                value={filterStock}
                onChange={(e) => setFilterStock(e.target.value as 'all' | 'available' | 'out')}
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todo estoque</option>
                <option value="available">Com estoque</option>
                <option value="out">Esgotados</option>
              </select>
            </div>

            <button
              onClick={() => {
                setEditingPrize(null)
                setIsModalOpen(true)
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Prêmio</span>
            </button>
          </div>
        </div>

        {/* Prize Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrizes.length > 0 ? (
            filteredPrizes.map(prize => (
              <PrizeCard
                key={prize.id}
                prize={prize}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleStatus={togglePrizeStatus}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum prêmio encontrado</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterStatus !== 'all' || filterStock !== 'all'
                  ? 'Tente ajustar os filtros de busca'
                  : 'Comece adicionando seu primeiro prêmio'
                }
              </p>
              {!searchTerm && filterStatus === 'all' && filterStock === 'all' && (
                <button
                  onClick={() => {
                    setEditingPrize(null)
                    setIsModalOpen(true)
                  }}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar Prêmio</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Modal */}
        <PrizeModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingPrize(null)
          }}
          prize={editingPrize}
          onSave={handleSave}
        />
      </div>
    </div>
  )
}

export default PrizeManagement