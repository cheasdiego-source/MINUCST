import { useState, useEffect } from 'react';

interface VideoData {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  videoTitle: string;
  videoDescription: string;
  duration: string;
  modules: number;
  status: 'available' | 'coming-soon';
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

export const useTrainingData = () => {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [documents, setDocuments] = useState<LegalDocument[]>([]);

  useEffect(() => {
    loadVideos();
    loadDocuments();
  }, []);

  const loadVideos = () => {
    const savedVideos = localStorage.getItem('admin-videos');
    if (savedVideos) {
      try {
        const parsedVideos = JSON.parse(savedVideos);
        // Convert to training format
        const trainingVideos = parsedVideos.map((video: any) => ({
          ...video,
          videoTitle: video.title,
          videoDescription: video.description,
          status: 'available' as const
        }));
        setVideos(trainingVideos);
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
        description: 'Fundamentos esenciales de las relaciones diplomáticas, protocolo oficial y ceremonial en organizaciones internacionales. Aprende las reglas de etiqueta diplomática y procedimientos oficiales.',
        duration: '4 horas',
        modules: 8,
        status: 'available',
        color: 'from-red-500 to-red-700',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        videoTitle: 'Fundamentos de Diplomacia Internacional',
        videoDescription: 'Introducción completa a los principios básicos de la diplomacia moderna y protocolo internacional.',
        materials: [
          { name: 'Manual de Protocolo Diplomático', type: 'PDF', size: '2.3 MB' },
          { name: 'Guía de Ceremonial Internacional', type: 'PDF', size: '1.8 MB' },
          { name: 'Casos de Estudio Diplomáticos', type: 'PDF', size: '3.1 MB' },
          { name: 'Plantillas de Documentos Oficiales', type: 'PDF', size: '1.2 MB' }
        ]
      },
      {
        id: 'crisis-management',
        title: 'Gestión de Crisis y Resolución de Conflictos',
        description: 'Técnicas avanzadas para manejar situaciones complejas, mediar en disputas internacionales y tomar decisiones bajo presión en entornos diplomáticos.',
        duration: '3.5 horas',
        modules: 6,
        status: 'available',
        color: 'from-yellow-500 to-yellow-700',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        videoTitle: 'Estrategias de Gestión de Crisis Diplomáticas',
        videoDescription: 'Metodologías probadas para la resolución efectiva de conflictos en el ámbito internacional.',
        materials: [
          { name: 'Manual de Gestión de Crisis', type: 'PDF', size: '2.7 MB' },
          { name: 'Simulacros de Conflicto Internacional', type: 'PDF', size: '4.2 MB' },
          { name: 'Técnicas de Mediación Avanzada', type: 'PDF', size: '2.1 MB' },
          { name: 'Casos Reales de Crisis Diplomáticas', type: 'PDF', size: '3.8 MB' }
        ]
      },
      {
        id: 'advanced-oratory',
        title: 'Oratoria Avanzada y Comunicación Estratégica',
        description: 'Desarrollo integral de habilidades de comunicación pública, técnicas de persuasión y presentación efectiva para entornos diplomáticos y académicos.',
        duration: '5 horas',
        modules: 10,
        status: 'available',
        color: 'from-red-600 to-red-800',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        videoTitle: 'Técnicas Avanzadas de Oratoria Diplomática',
        videoDescription: 'Masterclass completa sobre comunicación efectiva y técnicas de persuasión en contextos internacionales.',
        materials: [
          { name: 'Guía Completa de Oratoria Diplomática', type: 'PDF', size: '3.5 MB' },
          { name: 'Ejercicios de Dicción y Pronunciación', type: 'PDF', size: '1.9 MB' },
          { name: 'Presentaciones Modelo y Ejemplos', type: 'PDF', size: '5.2 MB' },
          { name: 'Técnicas de Persuasión Internacional', type: 'PDF', size: '2.8 MB' }
        ]
      },
      {
        id: 'document-writing',
        title: 'Redacción de Documentos Oficiales',
        description: 'Técnicas profesionales para la elaboración de resoluciones, comunicados oficiales, documentos diplomáticos y correspondencia internacional de alto nivel.',
        duration: '3 horas',
        modules: 7,
        status: 'available',
        color: 'from-yellow-600 to-yellow-800',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        videoTitle: 'Redacción Profesional de Documentos Diplomáticos',
        videoDescription: 'Curso especializado en la creación de documentos oficiales con estándares internacionales.',
        materials: [
          { name: 'Plantillas Oficiales Internacionales', type: 'PDF', size: '2.1 MB' },
          { name: 'Ejemplos de Resoluciones ONU', type: 'PDF', size: '4.7 MB' },
          { name: 'Guía de Redacción Diplomática', type: 'PDF', size: '3.3 MB' },
          { name: 'Formatos de Correspondencia Oficial', type: 'PDF', size: '1.6 MB' }
        ]
      },
      {
        id: 'collaborative-leadership',
        title: 'Liderazgo Colaborativo y Trabajo en Equipo',
        description: 'Desarrollo de competencias de liderazgo efectivo en entornos multiculturales, gestión de equipos diversos y coordinación de proyectos internacionales.',
        duration: '4.5 horas',
        modules: 9,
        status: 'available',
        color: 'from-red-700 to-red-900',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        videoTitle: 'Liderazgo Efectivo en Entornos Multiculturales',
        videoDescription: 'Estrategias avanzadas para liderar equipos diversos y gestionar proyectos internacionales exitosos.',
        materials: [
          { name: 'Manual de Liderazgo Internacional', type: 'PDF', size: '4.1 MB' },
          { name: 'Dinámicas de Grupo Multiculturales', type: 'PDF', size: '2.9 MB' },
          { name: 'Casos de Éxito en Liderazgo', type: 'PDF', size: '3.7 MB' },
          { name: 'Herramientas de Gestión de Equipos', type: 'PDF', size: '2.4 MB' }
        ]
      },
      {
        id: 'mental-health',
        title: 'Bienestar Mental y Manejo del Estrés',
        description: 'Estrategias científicamente probadas para mantener el bienestar personal, gestionar el estrés y optimizar el rendimiento durante eventos de alta presión.',
        duration: '2.5 horas',
        modules: 5,
        status: 'available',
        color: 'from-green-500 to-green-700',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        videoTitle: 'Técnicas de Bienestar y Gestión del Estrés',
        videoDescription: 'Programa integral de bienestar mental diseñado específicamente para profesionales en entornos de alta presión.',
        materials: [
          { name: 'Guía de Técnicas de Relajación', type: 'PDF', size: '2.2 MB' },
          { name: 'Ejercicios de Mindfulness Aplicado', type: 'PDF', size: '1.7 MB' },
          { name: 'Manual de Bienestar Profesional', type: 'PDF', size: '3.4 MB' },
          { name: 'Estrategias de Manejo del Estrés', type: 'PDF', size: '2.6 MB' }
        ]
      }
    ];
    setVideos(defaultVideos);
  };

  const setDefaultDocuments = () => {
    const defaultDocuments: LegalDocument[] = [
      {
        id: 'privacy-policy',
        title: 'Política de Privacidad y Protección de Datos',
        description: 'Cumplimiento integral con GDPR, CCPA y regulaciones internacionales de privacidad.',
        lastUpdated: '15 de Enero, 2026',
        size: '2.8 MB',
        content: 'Contenido completo de la política de privacidad...',
        icon: 'Shield',
        color: 'from-blue-600 to-blue-800'
      },
      {
        id: 'terms-conditions',
        title: 'Términos y Condiciones de Uso',
        description: 'Marco legal completo para el uso de la plataforma y servicios educativos.',
        lastUpdated: '15 de Enero, 2026',
        size: '3.2 MB',
        content: 'Contenido completo de términos y condiciones...',
        icon: 'FileText',
        color: 'from-red-600 to-red-800'
      }
    ];
    setDocuments(defaultDocuments);
  };

  return {
    videos,
    documents,
    refreshData: () => {
      loadVideos();
      loadDocuments();
    }
  };
};