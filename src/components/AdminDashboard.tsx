import React, { useState, useEffect } from 'react';
import { Users, BarChart3, Download, Eye, EyeOff, Shield, ArrowLeft, Video, FileText, Settings } from 'lucide-react';
import AdminMediaManager from './AdminMediaManager';

interface StaffProgress {
  id: string;
  name: string;
  email: string;
  role: string;
  code: string;
  totalProgress: number;
  completedCourses: number;
  lastActivity: string;
}

interface AdminDashboardProps {
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [showMediaManager, setShowMediaManager] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [staffProgress, setStaffProgress] = useState<StaffProgress[]>([]);

  const ADMIN_CODES = ['MINUCST2026-SG-DIEGO', 'MINUCST2026-SGA-NATASHA'];

  useEffect(() => {
    if (showDashboard) {
      loadStaffProgress();
    }
  }, [showDashboard]);

  const loadStaffProgress = () => {
    // Load real progress from localStorage
    const allUsers = [];
    
    // Get all stored user progress
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('progress-')) {
        try {
          const userId = key.replace('progress-', '');
          const progressData = JSON.parse(localStorage.getItem(key) || '{}');
          const userData = JSON.parse(localStorage.getItem('minucst-user') || '{}');
          
          // Create staff entry
          const completedCourses = Object.values(progressData.progress || {}).filter((p: any) => p.completed).length;
          
          allUsers.push({
            id: userId,
            name: userData.name || `Usuario ${userId}`,
            email: userData.email || `${userId}@minucst.org`,
            role: userData.role || 'Staff',
            code: `MINUCST2026-${userId.toUpperCase()}`,
            totalProgress: progressData.totalProgress || 0,
            completedCourses,
            lastActivity: new Date().toLocaleString('es-ES')
          });
        } catch (error) {
          console.error('Error loading user progress:', error);
        }
      }
    }

    // Add default entries if no real data
    if (allUsers.length === 0) {
      const mockProgress: StaffProgress[] = [
        {
          id: 'diego-cheas',
          name: 'Diego Emmanuel Cheas López',
          email: 'dcheas.secretario@minucst.org',
          role: 'Secretario General',
          code: 'MINUCST2026-SG-DIEGO',
          totalProgress: 100,
          completedCourses: 6,
          lastActivity: new Date().toLocaleString('es-ES')
        },
        {
          id: 'natasha-guzman',
          name: 'Natasha Leonela Guzmán Mauricio',
          email: 'nguzman.adjunta@minucst.org',
          role: 'Secretaria General Adjunta',
          code: 'MINUCST2026-SGA-NATASHA',
          totalProgress: 83,
          completedCourses: 5,
          lastActivity: new Date().toLocaleString('es-ES')
        },
        {
          id: 'staff-001',
          name: 'Ana Sofía Martínez',
          email: 'am.capacitacion@minucst.org',
          role: 'Directora de Capacitación',
          code: 'MINUCST2026-STAFF-001',
          totalProgress: 67,
          completedCourses: 4,
          lastActivity: new Date().toLocaleString('es-ES')
        },
        {
          id: 'staff-002',
          name: 'Roberto Jiménez',
          email: 'rj.logistica@minucst.org',
          role: 'Coordinador de Logística',
          code: 'MINUCST2026-STAFF-002',
          totalProgress: 50,
          completedCourses: 3,
          lastActivity: new Date().toLocaleString('es-ES')
        },
        {
          id: 'staff-003',
          name: 'Isabella Torres',
          email: 'it.protocolo@minucst.org',
          role: 'Jefa de Protocolo',
          code: 'MINUCST2026-STAFF-003',
          totalProgress: 33,
          completedCourses: 2,
          lastActivity: new Date().toLocaleString('es-ES')
        },
        {
          id: 'staff-004',
          name: 'Diego Fernández',
          email: 'df.comunicaciones@minucst.org',
          role: 'Director de Comunicaciones',
          code: 'MINUCST2026-STAFF-004',
          totalProgress: 17,
          completedCourses: 1,
          lastActivity: new Date().toLocaleString('es-ES')
        }
      ];
      setStaffProgress(mockProgress);
    } else {
      setStaffProgress(allUsers);
    }
  };

  const handleAdminLogin = () => {
    if (ADMIN_CODES.includes(adminCode)) {
      setShowDashboard(true);
    } else {
      alert('Código de administrador inválido');
    }
  };

  const exportProgress = () => {
    const csvContent = [
      ['Nombre', 'Email', 'Rol', 'Código', 'Progreso (%)', 'Cursos Completados', 'Última Actividad'],
      ...staffProgress.map(staff => [
        staff.name,
        staff.email,
        staff.role,
        staff.code,
        staff.totalProgress.toString(),
        staff.completedCourses.toString(),
        staff.lastActivity
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `progreso-staff-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Show Media Manager if requested
  if (showMediaManager) {
    return <AdminMediaManager onClose={() => setShowMediaManager(false)} />;
  }

  if (!showDashboard) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-900 mb-2">Panel de Administración</h2>
            <p className="text-gray-600">Acceso restringido solo para Secretarios Generales</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Código de Administrador
              </label>
              <div className="relative">
                <input
                  type={showCode ? 'text' : 'password'}
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 pr-12"
                  placeholder="Ingresa tu código de SG"
                />
                <button
                  type="button"
                  onClick={() => setShowCode(!showCode)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showCode ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleAdminLogin}
                className="flex-1 bg-red-800 hover:bg-red-900 text-white py-3 rounded-lg font-medium transition-colors duration-300"
              >
                Acceder
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const averageProgress = staffProgress.length > 0 
    ? Math.round(staffProgress.reduce((sum, staff) => sum + staff.totalProgress, 0) / staffProgress.length)
    : 0;
  const completedStaff = staffProgress.filter(staff => staff.totalProgress === 100).length;

  return (
    <div className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <button
              onClick={onClose}
              className="mr-4 p-2 hover:bg-gray-200 rounded-lg transition-colors duration-300"
            >
              <ArrowLeft className="h-6 w-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-red-900 mb-2">Panel de Administración</h1>
              <p className="text-gray-600">Gestión completa de la plataforma MINUCST Inside</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowMediaManager(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <Settings className="h-4 w-4" />
              <span>Gestionar Contenidos</span>
            </button>
            <button
              onClick={exportProgress}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
            >
              <Download className="h-4 w-4" />
              <span>Exportar</span>
            </button>
            <button
              onClick={() => setShowDashboard(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300"
            >
              Cerrar Panel
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div 
            onClick={() => setShowMediaManager(true)}
            className="bg-gradient-to-r from-red-900 to-red-800 text-white rounded-xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Gestión de Videos</h3>
                <p className="text-gray-100">Agregar, editar y eliminar videos de capacitación</p>
              </div>
              <Video className="h-12 w-12 text-yellow-400" />
            </div>
          </div>
          
          <div 
            onClick={() => setShowMediaManager(true)}
            className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white rounded-xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">Documentos Legales</h3>
                <p className="text-gray-100">Administrar políticas y documentos oficiales</p>
              </div>
              <FileText className="h-12 w-12 text-red-900" />
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Staff</p>
                <p className="text-2xl font-bold text-red-900">{staffProgress.length}</p>
              </div>
              <Users className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Progreso Promedio</p>
                <p className="text-2xl font-bold text-yellow-600">{averageProgress}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Completados</p>
                <p className="text-2xl font-bold text-green-600">{completedStaff}</p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">En Progreso</p>
                <p className="text-2xl font-bold text-blue-600">{staffProgress.length - completedStaff}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Staff Progress Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-red-900">Progreso Individual del Staff</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Miembro del Staff
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Código
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progreso
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cursos Completados
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Última Actividad
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {staffProgress.map((staff) => (
                  <tr key={staff.id} className="hover:bg-gray-50 transition-colors duration-300">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                        <div className="text-sm text-gray-500">{staff.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{staff.role}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">{staff.code}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                          <div 
                            className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${staff.totalProgress}%` }}
                          ></div>
                        </div>
                        <span className={`text-sm font-medium ${
                          staff.totalProgress === 100 ? 'text-green-600' : 'text-gray-900'
                        }`}>
                          {staff.totalProgress}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{staff.completedCourses}/6</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {staff.lastActivity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;