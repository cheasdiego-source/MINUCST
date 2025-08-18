import React, { useState, useEffect } from 'react';
import { 
  Video, 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Upload, 
  Play, 
  Download,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff
} from 'lucide-react';

interface VideoData {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  modules: number;
  color: string;
  materials: Array<{
    name: string;
    type: string;
    size: string;
  }>;
}

interface LegalDocument {
  id: string;
  title: string;
  description: string;
  lastUpdated: string;
  size: string;
  content: string;
  icon: string;
  color: string;
}

interface AdminMediaManagerProps {
  onClose: () => void;
}

const AdminMediaManager: React.FC<AdminMediaManagerProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'videos' | 'documents'>('videos');
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [documents, setDocuments] = useState<LegalDocument[]>([]);
  const [editingVideo, setEditingVideo] = useState<VideoData | null>(null);
  const [editingDocument, setEditingDocument] = useState<LegalDocument | null>(null);
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [showDocumentForm, setShowDocumentForm] = useState(false);
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    loadVideos();
    loadDocuments();
  }, []);

  const loadVideos = () => {
    const savedVideos = localStorage.getItem('admin-videos');
    if (savedVideos) {
      try {
        setVideos(JSON.parse(savedVideos));
      } catch (error) {
        console.error('Error loading videos:', error);
        setDefaultVideos();
      }
    } else {
      setDefaultVideos();
    }
  };

  const loadDocuments = () => {
    const savedDocuments = localStorage.getItem('admin-documents');
    if (savedDocuments) {
      try {
        setDocuments(JSON.parse(savedDocuments));
      } catch (error) {
        console.error('Error loading documents:', error);
        setDefaultDocuments();
      }
    } else {
      setDefaultDocuments();
    }
  };

  const setDefaultVideos = () => {
    const defaultVideos: VideoData[] = [
      {
        id: 'diplomacy-protocol',
        title: 'Diplomacia y Protocolo Internacional',
        description: 'Fundamentos esenciales de las relaciones diplomáticas y protocolo oficial.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        duration: '4 horas',
        modules: 8,
        color: 'from-red-500 to-red-700',
        materials: [
          { name: 'Manual de Protocolo Diplomático', type: 'PDF', size: '2.3 MB' },
          { name: 'Guía de Ceremonial Internacional', type: 'PDF', size: '1.8 MB' }
        ]
      },
      {
        id: 'crisis-management',
        title: 'Gestión de Crisis y Resolución de Conflictos',
        description: 'Técnicas avanzadas para manejar situaciones complejas.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        duration: '3.5 horas',
        modules: 6,
        color: 'from-yellow-500 to-yellow-700',
        materials: [
          { name: 'Manual de Gestión de Crisis', type: 'PDF', size: '2.7 MB' }
        ]
      }
    ];
    setVideos(defaultVideos);
    localStorage.setItem('admin-videos', JSON.stringify(defaultVideos));
  };

  const setDefaultDocuments = () => {
    const defaultDocuments: LegalDocument[] = [
      {
        id: 'privacy-policy',
        title: 'Política de Privacidad y Protección de Datos',
        description: 'Cumplimiento integral con GDPR, CCPA y regulaciones internacionales.',
        lastUpdated: '15 de Enero, 2026',
        size: '2.8 MB',
        content: 'Contenido de la política de privacidad...',
        icon: 'Shield',
        color: 'from-blue-600 to-blue-800'
      },
      {
        id: 'terms-conditions',
        title: 'Términos y Condiciones de Uso',
        description: 'Marco legal completo para el uso de la plataforma.',
        lastUpdated: '15 de Enero, 2026',
        size: '3.2 MB',
        content: 'Contenido de términos y condiciones...',
        icon: 'FileText',
        color: 'from-red-600 to-red-800'
      }
    ];
    setDocuments(defaultDocuments);
    localStorage.setItem('admin-documents', JSON.stringify(defaultDocuments));
  };

  const saveVideos = (updatedVideos: VideoData[]) => {
    setVideos(updatedVideos);
    localStorage.setItem('admin-videos', JSON.stringify(updatedVideos));
  };

  const saveDocuments = (updatedDocuments: LegalDocument[]) => {
    setDocuments(updatedDocuments);
    localStorage.setItem('admin-documents', JSON.stringify(updatedDocuments));
  };

  const handleSaveVideo = (videoData: VideoData) => {
    if (editingVideo) {
      // Update existing video
      const updatedVideos = videos.map(v => v.id === videoData.id ? videoData : v);
      saveVideos(updatedVideos);
    } else {
      // Add new video
      const newVideo = { ...videoData, id: `video-${Date.now()}` };
      saveVideos([...videos, newVideo]);
    }
    setEditingVideo(null);
    setShowVideoForm(false);
  };

  const handleSaveDocument = (documentData: LegalDocument) => {
    if (editingDocument) {
      // Update existing document
      const updatedDocuments = documents.map(d => d.id === documentData.id ? documentData : d);
      saveDocuments(updatedDocuments);
    } else {
      // Add new document
      const newDocument = { 
        ...documentData, 
        id: `doc-${Date.now()}`,
        lastUpdated: new Date().toLocaleDateString('es-ES', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      };
      saveDocuments([...documents, newDocument]);
    }
    setEditingDocument(null);
    setShowDocumentForm(false);
  };

  const handleDeleteVideo = (videoId: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este video? Esta acción no se puede deshacer.')) {
      const updatedVideos = videos.filter(v => v.id !== videoId);
      saveVideos(updatedVideos);
    }
  };

  const handleDeleteDocument = (documentId: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este documento? Esta acción no se puede deshacer.')) {
      const updatedDocuments = documents.filter(d => d.id !== documentId);
      saveDocuments(updatedDocuments);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-red-900 mb-2">Gestión de Contenidos</h1>
            <p className="text-gray-600">Administra videos de capacitación y documentos legales</p>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-800 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Cerrar Panel
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-200 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('videos')}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'videos'
                ? 'bg-white text-red-900 shadow-md'
                : 'text-gray-600 hover:text-red-800'
            }`}
          >
            <Video className="h-5 w-5 inline mr-2" />
            Videos de Capacitación
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
              activeTab === 'documents'
                ? 'bg-white text-red-900 shadow-md'
                : 'text-gray-600 hover:text-red-800'
            }`}
          >
            <FileText className="h-5 w-5 inline mr-2" />
            Documentos Legales
          </button>
        </div>

        {/* Videos Tab */}
        {activeTab === 'videos' && (
          <div>
            {/* Add Video Button */}
            <div className="mb-6">
              <button
                onClick={() => {
                  setEditingVideo(null);
                  setShowVideoForm(true);
                }}
                className="flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
              >
                <Plus className="h-5 w-5" />
                <span>Agregar Nuevo Video</span>
              </button>
            </div>

            {/* Videos List */}
            <div className="grid lg:grid-cols-2 gap-6">
              {videos.map((video) => (
                <div key={video.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className={`bg-gradient-to-r ${video.color} p-6`}>
                    <h3 className="text-xl font-bold text-white mb-2">{video.title}</h3>
                    <div className="flex items-center space-x-4 text-white/80 text-sm">
                      <span>{video.duration}</span>
                      <span>{video.modules} módulos</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{video.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setPreviewVideo(video.videoUrl)}
                          className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors duration-300"
                        >
                          <Play className="h-4 w-4" />
                          <span>Vista Previa</span>
                        </button>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setEditingVideo(video);
                            setShowVideoForm(true);
                          }}
                          className="p-2 text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 rounded-lg transition-all duration-300"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteVideo(video.id)}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <div>
            {/* Add Document Button */}
            <div className="mb-6">
              <button
                onClick={() => {
                  setEditingDocument(null);
                  setShowDocumentForm(true);
                }}
                className="flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
              >
                <Plus className="h-5 w-5" />
                <span>Agregar Nuevo Documento</span>
              </button>
            </div>

            {/* Documents List */}
            <div className="grid lg:grid-cols-2 gap-6">
              {documents.map((document) => (
                <div key={document.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className={`bg-gradient-to-r ${document.color} p-6`}>
                    <h3 className="text-xl font-bold text-white mb-2">{document.title}</h3>
                    <div className="flex items-center space-x-4 text-white/80 text-sm">
                      <span>Actualizado: {document.lastUpdated}</span>
                      <span>{document.size}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{document.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm font-medium text-green-600">Vigente</span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setEditingDocument(document);
                            setShowDocumentForm(true);
                          }}
                          className="p-2 text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 rounded-lg transition-all duration-300"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteDocument(document.id)}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Video Form Modal */}
        {showVideoForm && (
          <VideoFormModal
            video={editingVideo}
            onSave={handleSaveVideo}
            onClose={() => {
              setShowVideoForm(false);
              setEditingVideo(null);
            }}
          />
        )}

        {/* Document Form Modal */}
        {showDocumentForm && (
          <DocumentFormModal
            document={editingDocument}
            onSave={handleSaveDocument}
            onClose={() => {
              setShowDocumentForm(false);
              setEditingDocument(null);
            }}
          />
        )}

        {/* Video Preview Modal */}
        {previewVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-60 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="text-lg font-bold text-red-900">Vista Previa del Video</h3>
                <button
                  onClick={() => setPreviewVideo(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="p-4">
                <video
                  src={previewVideo}
                  controls
                  className="w-full aspect-video rounded-lg"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Video Form Modal Component
const VideoFormModal: React.FC<{
  video: VideoData | null;
  onSave: (video: VideoData) => void;
  onClose: () => void;
}> = ({ video, onSave, onClose }) => {
  const [formData, setFormData] = useState<VideoData>({
    id: video?.id || '',
    title: video?.title || '',
    description: video?.description || '',
    videoUrl: video?.videoUrl || '',
    duration: video?.duration || '',
    modules: video?.modules || 1,
    color: video?.color || 'from-red-500 to-red-700',
    materials: video?.materials || []
  });

  const [newMaterial, setNewMaterial] = useState({ name: '', type: 'PDF', size: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.videoUrl) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }
    onSave(formData);
  };

  const addMaterial = () => {
    if (newMaterial.name && newMaterial.size) {
      setFormData({
        ...formData,
        materials: [...formData.materials, newMaterial]
      });
      setNewMaterial({ name: '', type: 'PDF', size: '' });
    }
  };

  const removeMaterial = (index: number) => {
    setFormData({
      ...formData,
      materials: formData.materials.filter((_, i) => i !== index)
    });
  };

  const colorOptions = [
    { value: 'from-red-500 to-red-700', label: 'Rojo', preview: 'bg-gradient-to-r from-red-500 to-red-700' },
    { value: 'from-yellow-500 to-yellow-700', label: 'Amarillo', preview: 'bg-gradient-to-r from-yellow-500 to-yellow-700' },
    { value: 'from-blue-500 to-blue-700', label: 'Azul', preview: 'bg-gradient-to-r from-blue-500 to-blue-700' },
    { value: 'from-green-500 to-green-700', label: 'Verde', preview: 'bg-gradient-to-r from-green-500 to-green-700' },
    { value: 'from-purple-500 to-purple-700', label: 'Morado', preview: 'bg-gradient-to-r from-purple-500 to-purple-700' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <h3 className="text-xl font-bold text-red-900">
            {video ? 'Editar Video' : 'Agregar Nuevo Video'}
          </h3>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título del Video *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL del Video *
            </label>
            <input
              type="url"
              value={formData.videoUrl}
              onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="https://ejemplo.com/video.mp4"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duración
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="4 horas"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de Módulos
              </label>
              <input
                type="number"
                value={formData.modules}
                onChange={(e) => setFormData({ ...formData, modules: parseInt(e.target.value) || 1 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                min="1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color del Tema
            </label>
            <div className="grid grid-cols-5 gap-2">
              {colorOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, color: option.value })}
                  className={`h-12 rounded-lg ${option.preview} ${
                    formData.color === option.value ? 'ring-4 ring-red-500' : ''
                  } transition-all duration-300`}
                  title={option.label}
                />
              ))}
            </div>
          </div>

          {/* Materials Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Materiales del Curso
            </label>
            
            {/* Existing Materials */}
            {formData.materials.map((material, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2 p-2 bg-gray-50 rounded-lg">
                <span className="flex-1">{material.name}</span>
                <span className="text-sm text-gray-500">{material.type}</span>
                <span className="text-sm text-gray-500">{material.size}</span>
                <button
                  type="button"
                  onClick={() => removeMaterial(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}

            {/* Add New Material */}
            <div className="grid grid-cols-4 gap-2 mt-2">
              <input
                type="text"
                value={newMaterial.name}
                onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
                placeholder="Nombre del material"
                className="col-span-2 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <input
                type="text"
                value={newMaterial.size}
                onChange={(e) => setNewMaterial({ ...newMaterial, size: e.target.value })}
                placeholder="Tamaño"
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <button
                type="button"
                onClick={addMaterial}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg text-sm transition-colors duration-300"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-800 text-white py-3 rounded-lg font-medium transition-all duration-300"
            >
              <Save className="h-5 w-5 inline mr-2" />
              Guardar Video
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Document Form Modal Component
const DocumentFormModal: React.FC<{
  document: LegalDocument | null;
  onSave: (document: LegalDocument) => void;
  onClose: () => void;
}> = ({ document, onSave, onClose }) => {
  const [formData, setFormData] = useState<LegalDocument>({
    id: document?.id || '',
    title: document?.title || '',
    description: document?.description || '',
    lastUpdated: document?.lastUpdated || '',
    size: document?.size || '',
    content: document?.content || '',
    icon: document?.icon || 'FileText',
    color: document?.color || 'from-red-600 to-red-800'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.content) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }
    onSave(formData);
  };

  const colorOptions = [
    { value: 'from-red-600 to-red-800', label: 'Rojo', preview: 'bg-gradient-to-r from-red-600 to-red-800' },
    { value: 'from-blue-600 to-blue-800', label: 'Azul', preview: 'bg-gradient-to-r from-blue-600 to-blue-800' },
    { value: 'from-green-600 to-green-800', label: 'Verde', preview: 'bg-gradient-to-r from-green-600 to-green-800' },
    { value: 'from-purple-600 to-purple-800', label: 'Morado', preview: 'bg-gradient-to-r from-purple-600 to-purple-800' },
    { value: 'from-yellow-600 to-yellow-800', label: 'Amarillo', preview: 'bg-gradient-to-r from-yellow-600 to-yellow-800' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <h3 className="text-xl font-bold text-red-900">
            {document ? 'Editar Documento' : 'Agregar Nuevo Documento'}
          </h3>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título del Documento *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tamaño del Archivo
              </label>
              <input
                type="text"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="2.8 MB"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color del Tema
              </label>
              <div className="grid grid-cols-5 gap-2">
                {colorOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, color: option.value })}
                    className={`h-12 rounded-lg ${option.preview} ${
                      formData.color === option.value ? 'ring-4 ring-red-500' : ''
                    } transition-all duration-300`}
                    title={option.label}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contenido del Documento *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={10}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 font-mono text-sm"
              placeholder="Contenido completo del documento legal..."
              required
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-800 text-white py-3 rounded-lg font-medium transition-all duration-300"
            >
              <Save className="h-5 w-5 inline mr-2" />
              Guardar Documento
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminMediaManager;