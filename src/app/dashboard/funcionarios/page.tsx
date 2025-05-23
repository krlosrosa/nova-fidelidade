'use client'
import React, { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, UserCheck, UserX, Phone, Mail, Shield } from 'lucide-react'

interface Employee {
  id: string
  name_id: string
  phone: string
  email: string
  permission_add_points: boolean
  tenant_id: string
  role: string
  status: 'active' | 'inactive'
  created_at: string
}

interface EmployeeFormData {
  name_id: string
  phone: string
  email: string
  role: string
  permission_add_points: boolean
  status: 'active' | 'inactive'
}

// Simulação do Zustand store
const useEmployeeStore = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '1',
      name_id: 'joao-silva',
      phone: '(11) 99999-1234',
      email: 'joao@barbearia.com',
      permission_add_points: true,
      tenant_id: 'barbearia-123',
      role: 'Barbeiro',
      status: 'active',
      created_at: '2024-01-15'
    },
    {
      id: '2',
      name_id: 'maria-santos',
      phone: '(11) 88888-5678',
      email: 'maria@barbearia.com',
      permission_add_points: false,
      tenant_id: 'barbearia-123',
      role: 'Atendente',
      status: 'active',
      created_at: '2024-02-20'
    },
    {
      id: '3',
      name_id: 'pedro-oliveira',
      phone: '(11) 77777-9012',
      email: 'pedro@barbearia.com',
      permission_add_points: true,
      tenant_id: 'barbearia-123',
      role: 'Barbeiro',
      status: 'inactive',
      created_at: '2024-01-10'
    }
  ])

  const addEmployee = (employee: Omit<Employee, 'id' | 'created_at'>) => {
    setEmployees(prev => [
      ...prev, 
      { 
        ...employee, 
        id: Date.now().toString(),
        created_at: new Date().toISOString().split('T')[0]
      }
    ])
  }

  const updateEmployee = (id: string, updatedEmployee: Partial<Employee>) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === id ? { ...emp, ...updatedEmployee } : emp
    ))
  }

  const deleteEmployee = (id: string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id))
  }

  const toggleEmployeeStatus = (id: string) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === id ? { ...emp, status: emp.status === 'active' ? 'inactive' : 'active' } : emp
    ))
  }

  return { employees, addEmployee, updateEmployee, deleteEmployee, toggleEmployeeStatus }
}

interface EmployeeModalProps {
  isOpen: boolean
  onClose: () => void
  employee: Employee | null
  onSave: (employee: EmployeeFormData) => void
}

// Componente do Modal de Funcionário
const EmployeeModal = ({ isOpen, onClose, employee, onSave }: EmployeeModalProps) => {
  const [formData, setFormData] = useState<EmployeeFormData>({
    name_id: '',
    phone: '',
    email: '',
    role: '',
    permission_add_points: false,
    status: 'active'
  })

  useEffect(() => {
    if (employee) {
      setFormData({
        name_id: employee.name_id,
        phone: employee.phone,
        email: employee.email,
        role: employee.role,
        permission_add_points: employee.permission_add_points,
        status: employee.status
      })
    } else {
      setFormData({
        name_id: '',
        phone: '',
        email: '',
        role: '',
        permission_add_points: false,
        status: 'active'
      })
    }
  }, [employee, isOpen])

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
            {employee ? 'Editar Funcionário' : 'Novo Funcionário'}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome Completo</label>
            <input
              type="text"
              value={formData.name_id}
              onChange={(e) => setFormData({ ...formData, name_id: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: João Silva"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">WhatsApp</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="(11) 99999-9999"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">E-mail</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="funcionario@empresa.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Cargo</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Selecione o cargo</option>
              <option value="Barbeiro">Barbeiro</option>
              <option value="Atendente">Atendente</option>
              <option value="Gerente">Gerente</option>
              <option value="Vendedor">Vendedor</option>
              <option value="Recepcionista">Recepcionista</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="permission"
              checked={formData.permission_add_points}
              onChange={(e) => setFormData({ ...formData, permission_add_points: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="permission" className="text-sm font-medium">
              Pode adicionar pontos de fidelidade
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
              {employee ? 'Salvar' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

interface EmployeeCardProps {
  employee: Employee
  onEdit: (employee: Employee) => void
  onDelete: (id: string) => void
  onToggleStatus: (id: string) => void
}

// Componente do Card de Funcionário
const EmployeeCard = ({ employee, onEdit, onDelete, onToggleStatus }: EmployeeCardProps) => {
  const getStatusColor = (status: 'active' | 'inactive') => 
    status === 'active' ? 'text-green-600' : 'text-red-600'
  
  const getStatusBg = (status: 'active' | 'inactive') => 
    status === 'active' ? 'bg-green-100' : 'bg-red-100'

  return (
    <div className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-semibold text-sm">
              {employee.name_id.split('-')[0]?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 capitalize">
              {employee.name_id.replace('-', ' ')}
            </h3>
            <p className="text-sm text-gray-600">{employee.role}</p>
          </div>
        </div>
        
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBg(employee.status)} ${getStatusColor(employee.status)}`}>
          {employee.status === 'active' ? 'Ativo' : 'Inativo'}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Phone className="w-4 h-4 mr-2" />
          {employee.phone}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Mail className="w-4 h-4 mr-2" />
          {employee.email}
        </div>
        {employee.permission_add_points && (
          <div className="flex items-center text-sm text-blue-600">
            <Shield className="w-4 h-4 mr-2" />
            Pode adicionar pontos
          </div>
        )}
      </div>

      <div className="flex justify-between items-center pt-3 border-t">
        <span className="text-xs text-gray-500">
          Cadastrado em {new Date(employee.created_at).toLocaleDateString('pt-BR')}
        </span>
        
        <div className="flex space-x-2">
          <button
            onClick={() => onToggleStatus(employee.id)}
            className={`p-1 rounded hover:scale-110 transition-transform ${
              employee.status === 'active' ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'
            }`}
            title={employee.status === 'active' ? 'Desativar' : 'Ativar'}
          >
            {employee.status === 'active' ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
          </button>
          
          <button
            onClick={() => onEdit(employee)}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded hover:scale-110 transition-transform"
            title="Editar"
          >
            <Edit className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onDelete(employee.id)}
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
const EmployeeManagement = () => {
  const { employees, addEmployee, updateEmployee, deleteEmployee, toggleEmployeeStatus } = useEmployeeStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all')
  const [filterRole, setFilterRole] = useState('all')

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.phone.includes(searchTerm)
    
    const matchesStatus = filterStatus === 'all' || employee.status === filterStatus
    const matchesRole = filterRole === 'all' || employee.role === filterRole
    
    return matchesSearch && matchesStatus && matchesRole
  })

  const handleSave = (employeeData: EmployeeFormData) => {
    if (editingEmployee) {
      updateEmployee(editingEmployee.id, employeeData)
    } else {
      addEmployee({
        ...employeeData,
        tenant_id: 'barbearia-123'
      })
    }
    setEditingEmployee(null)
  }

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este funcionário?')) {
      deleteEmployee(id)
    }
  }

  const activeEmployees = employees.filter(emp => emp.status === 'active').length
  const roles = [...new Set(employees.map(emp => emp.role))]

  return (
    <div className="min-h-screen bg-gray-50 w-full p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestão de Funcionários</h1>
          <p className="text-gray-600">Gerencie sua equipe de colaboradores</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Funcionários</p>
                <p className="text-3xl font-bold text-gray-900">{employees.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Funcionários Ativos</p>
                <p className="text-3xl font-bold text-green-600">{activeEmployees}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Com Permissão Pontos</p>
                <p className="text-3xl font-bold text-purple-600">
                  {employees.filter(emp => emp.permission_add_points).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-600" />
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
                  placeholder="Buscar funcionário..."
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
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Todos os cargos</option>
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => {
                setEditingEmployee(null)
                setIsModalOpen(true)
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Novo Funcionário</span>
            </button>
          </div>
        </div>

        {/* Employee Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map(employee => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleStatus={toggleEmployeeStatus}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserX className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum funcionário encontrado</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterStatus !== 'all' || filterRole !== 'all'
                  ? 'Tente ajustar os filtros de busca'
                  : 'Comece adicionando seu primeiro funcionário'
                }
              </p>
              {!searchTerm && filterStatus === 'all' && filterRole === 'all' && (
                <button
                  onClick={() => {
                    setEditingEmployee(null)
                    setIsModalOpen(true)
                  }}
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar Funcionário</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Modal */}
        <EmployeeModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingEmployee(null)
          }}
          employee={editingEmployee}
          onSave={handleSave}
        />
      </div>
    </div>
  )
}

export default EmployeeManagement