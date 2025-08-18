import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Shield, 
  Activity, 
  AlertTriangle, 
  Download, 
  RefreshCw,
  Eye,
  EyeOff,
  Ban,
  CheckCircle,
  Clock,
  TrendingUp,
  ArrowLeft
} from 'lucide-react';
import { useSecureAuth } from '../hooks/useSecureAuth';

interface DashboardUser {
  id: string;
  code: string;
  status: 'online' | 'offline';
  progress: number;
  lastAction: string;
  lastActionTime: Date;
  isBlocked: boolean;
}

interface DashboardData {
  users: DashboardUser[];
  totalUsers: number;
  activeUsers: number;
  completionRate: number;
}

interface SecurityStats {
  blockedIPs: Array<{ ip: string; until: Date }>;
  blockedCodes: Array<{ code: string; until: Date }>;
  recentAttempts: Array<{ ip: string; code?: string; timestamp: Date; success: boolean }>;
  activeSessions: number;
}

interface SuperAdminDashboardProps {
  jwtToken: string;
  onLogout: () => void;
  onBack: () => void;
}

const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({ jwtToken, onLogout, onBack }) => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [securityStats, setSecurityStats] = useState<SecurityStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'security' | 'logs'>('dashboard');
  const [filter, setFilter] = useState<'all' | 'online' | 'offline' | 'blocked'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const { getDashboardData, getSecurityStats, revokeCode } = useSecureAuth();

  // Simular datos del dashboard
  useEffect(() => {
    loadDashboardData();
    loadSecurityStats();
    
    if (autoRefresh) {
      const interval = setInterval(() => {
        loadDashboardData();
        loadSecurityStats();
      }, 5000); // Actualizar cada 5 segundos
      
      return () => clearInterval(interval);
    }
  }, [autoRefresh, getDashboardData, getSecurityStats]);

  const loadDashboardData = async () => {
    try {
      const data = getDashboardData();
      if (data) {
        setDashboardData(data);
      } else {
        // Fallback con datos mock
        const mockData: DashboardData = {
          users: Array.from({ length: 30 }, (_, i) => ({
            id: `user_${i + 1}`,
            code: `MINUCST-STAFF-${(i + 1).toString().padStart(2, '0')}`,
            status: Math.random() > 0.7 ? 'online' : 'offline',
            progress: Math.floor(Math.random() * 101),
            lastAction: 'Módulo de Diplomacia',
            lastActionTime: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
            isBlocked: Math.random() > 0.95
          })),
          totalUsers: 30,
          activeUsers: 0,
          completionRate: 0
        };
      
        mockData.activeUsers = mockData.users.filter(u => u.status === 'online').length;
        mockData.completionRate = Math.round(
          (mockData.users.filter(u => u.progress === 100).length / mockData.users.length) * 100
        );
      
        setDashboardData(mockData);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSecurityStats = async () => {
    try {
      const stats = getSecurityStats();
      if (stats) {
        setSecurityStats(stats);
      } else {
        // Fallback con datos mock
        const mockStats: SecurityStats = {
          blockedIPs: [
            { ip: '192.168.1.100', until: new Date(Date.now() + 30 * 60 * 1000) },
            { ip: '10.0.0.50', until: new Date(Date.now() + 15 * 60 * 1000) }
          ],
          blockedCodes: [
            { code: 'MINUCST-STAFF-15', until: new Date(Date.now() + 24 * 60 * 60 * 1000) }
          ],
          recentAttempts: Array.from({ length: 20 }, (_, i) => ({
            ip: `192.168.1.${100 + i}`,
            code: `MINUCST-STAFF-${(i % 30 + 1).toString().padStart(2, '0')}`,
            timestamp: new Date(Date.now() - i * 5 * 60 * 1000),
            success: Math.random() > 0.3
          })),
          activeSessions: Math.floor(Math.random() * 15) + 5
        };
      
        setSecurityStats(mockStats);
      }
    } catch (error) {
      console.error('Error loading security stats:', error);
    }
  };

  const handleRevokeCode = async (code: string) => {
    if (window.confirm(`¿Estás seguro de que deseas revocar el acceso para ${code}?`)) {
      try {
        const success = revokeCode(code);
        if (success) {
          console.log(`Código ${code} revocado exitosamente`);
          await loadDashboardData();
        } else {
          console.error(`Error al revocar código ${code}`);
        }
      } catch (error) {
        console.error('Error revoking code:', error);
      }
    }
  };

  const exportData = (format: 'csv' | 'pdf') => {
    if (!dashboardData) return;
    
    const data = dashboardData.users.map(user => ({
      Código: user.code,
      Estado: user.status,
      Progreso: `${user.progress}%`,
      'Última Acción': user.lastAction,
      'Última Actividad': user.lastActionTime.toLocaleString('es-ES'),
      Bloqueado: user.isBlocked ? 'Sí' : 'No'
    }));
    
    if (format === 'csv') {
      const csv = [
        Object.keys(data[0]).join(','),
        ...data.map(row => Object.values(row).join(','))
      ].join('\n');
      
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dashboard-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  const filteredUsers = dashboardData?.users.filter(user => {
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'online' && user.status === 'online') ||
      (filter === 'offline' && user.status === 'offline') ||
      (filter === 'blocked' && user.isBlocked);
    
    const matchesSearch = user.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  }) || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Cargando dashboard seguro...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-900 to-red-800 text-white shadow-2xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-2xl font-bold">Panel de Superadministrador</h1>
                <p className="text-gray-200">MINUCST Inside - Monitoreo en Tiempo Real</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-colors duration-300"
              >
                <ArrowLeft className="h-5 w-5 text-red-900" />
              </button>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="autoRefresh"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="autoRefresh" className="text-sm">Auto-actualizar</label>
              </div>
              
              <button
                onClick={() => loadDashboardData()}
                className="p-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-colors duration-300"
              >
                <RefreshCw className="h-5 w-5 text-red-900" />
              </button>
              
              <button
                onClick={onLogout}
                className="bg-red-700 hover:bg-red-800 px-4 py-2 rounded-lg transition-colors duration-300"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Usuarios</p>
                <p className="text-2xl font-bold text-red-900">{dashboardData?.totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-red-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Usuarios Activos</p>
                <p className="text-2xl font-bold text-green-600">{dashboardData?.activeUsers}</p>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Tasa de Finalización</p>
                <p className="text-2xl font-bold text-blue-600">{dashboardData?.completionRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Sesiones Activas</p>
                <p className="text-2xl font-bold text-purple-600">{securityStats?.activeSessions}</p>
              </div>
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'dashboard', label: 'Dashboard Principal', icon: Users },
                { id: 'security', label: 'Seguridad', icon: Shield },
                { id: 'logs', label: 'Logs de Actividad', icon: Activity }
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-300 ${
                      activeTab === tab.id
                        ? 'border-red-500 text-red-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="p-6">
              {/* Filters and Search */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
                <div className="flex space-x-4">
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value as any)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="all">Todos los usuarios</option>
                    <option value="online">Solo conectados</option>
                    <option value="offline">Solo desconectados</option>
                    <option value="blocked">Solo bloqueados</option>
                  </select>
                  
                  <input
                    type="text"
                    placeholder="Buscar por código..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => exportData('csv')}
                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                  >
                    <Download className="h-4 w-4" />
                    <span>Exportar CSV</span>
                  </button>
                </div>
              </div>

              {/* Users Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Código de Usuario
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Progreso
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Última Acción
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Última Actividad
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-300">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-900">{user.code}</span>
                            {user.isBlocked && (
                              <Ban className="h-4 w-4 text-red-500 ml-2" />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.status === 'online'
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            <div className={`w-2 h-2 rounded-full mr-1 ${
                              user.status === 'online' ? 'bg-green-400' : 'bg-gray-400'
                            }`}></div>
                            {user.status === 'online' ? 'Conectado' : 'Desconectado'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                              <div 
                                className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${user.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900">{user.progress}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.lastAction}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.lastActionTime.toLocaleString('es-ES')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleRevokeCode(user.code)}
                            className="text-red-600 hover:text-red-900 transition-colors duration-300"
                            disabled={user.isBlocked}
                          >
                            {user.isBlocked ? 'Bloqueado' : 'Revocar'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && securityStats && (
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Blocked IPs */}
                <div className="bg-red-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-red-900 mb-4 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    IPs Bloqueadas
                  </h3>
                  {securityStats.blockedIPs.length > 0 ? (
                    <div className="space-y-2">
                      {securityStats.blockedIPs.map((blocked, index) => (
                        <div key={index} className="flex justify-between items-center bg-white p-3 rounded">
                          <span className="font-mono text-sm">{blocked.ip}</span>
                          <span className="text-xs text-gray-500">
                            Hasta: {blocked.until.toLocaleString('es-ES')}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">No hay IPs bloqueadas actualmente</p>
                  )}
                </div>

                {/* Blocked Codes */}
                <div className="bg-yellow-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-yellow-900 mb-4 flex items-center">
                    <Ban className="h-5 w-5 mr-2" />
                    Códigos Bloqueados
                  </h3>
                  {securityStats.blockedCodes.length > 0 ? (
                    <div className="space-y-2">
                      {securityStats.blockedCodes.map((blocked, index) => (
                        <div key={index} className="flex justify-between items-center bg-white p-3 rounded">
                          <span className="font-mono text-sm">{blocked.code}</span>
                          <span className="text-xs text-gray-500">
                            Hasta: {blocked.until.toLocaleString('es-ES')}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">No hay códigos bloqueados actualmente</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Logs Tab */}
          {activeTab === 'logs' && securityStats && (
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Intentos de Acceso Recientes</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Timestamp
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        IP
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Código
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Resultado
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {securityStats.recentAttempts.map((attempt, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {attempt.timestamp.toLocaleString('es-ES')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                          {attempt.ip}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                          {attempt.code || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            attempt.success 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {attempt.success ? (
                              <>
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Exitoso
                              </>
                            ) : (
                              <>
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Fallido
                              </>
                            )}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;