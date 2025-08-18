import React, { useState, useRef, useEffect } from 'react';
import { Play, Download, CheckCircle, Clock, Users, Video, Pause, FileText } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTrainingData } from '../../hooks/useTrainingData';

const Training = () => {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { user, updateProgress } = useAuth();
  const { videos: courses } = useTrainingData();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      
      // Update progress in real-time
      if (selectedCourse !== null && user && courses[selectedCourse]) {
        const course = courses[selectedCourse];
        const progress = (video.currentTime / video.duration) * 100;
        const completed = progress >= 95; // Consider completed at 95%
        
        updateProgress(course.id, video.currentTime, video.duration, completed);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (selectedCourse !== null && user && courses[selectedCourse]) {
        const course = courses[selectedCourse];
        updateProgress(course.id, video.duration, video.duration, true);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, [selectedCourse, user, updateProgress, courses]);

  const openCourse = (index: number) => {
    if (courses[index] && courses[index].status === 'available') {
      setSelectedCourse(index);
      setCurrentTime(0);
      setIsPlaying(false);
    }
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const getCourseProgress = (courseId: string) => {
    if (!user?.progress[courseId]) return 0;
    const { watchTime, totalTime } = user.progress[courseId];
    return totalTime > 0 ? Math.round((watchTime / totalTime) * 100) : 0;
  };

  const isCourseCompleted = (courseId: string) => {
    return user?.progress[courseId]?.completed || false;
  };

  const downloadMaterialAsPDF = (material: { name: string; type: string; size: string }, courseTitle: string) => {
    // Create professional PDF-style content
    const content = `
${material.name}
${'='.repeat(material.name.length)}

DOCUMENTO OFICIAL MINUCST 2026
Curso: ${courseTitle}
Fecha de generación: ${new Date().toLocaleDateString('es-ES', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
})}
Tamaño: ${material.size}

CONTENIDO DEL DOCUMENTO
${'-'.repeat(50)}

Este documento forma parte del programa de capacitación oficial de MINUCST 2026.

INFORMACIÓN IMPORTANTE:
• Este material es confidencial y de uso exclusivo para el staff autorizado
• Prohibida su distribución sin autorización expresa
• Protegido bajo leyes internacionales de propiedad intelectual

CONTENIDO ESPECÍFICO:
${material.name}

[El contenido completo del documento estaría aquí en una implementación real]

CERTIFICACIÓN:
Este documento ha sido revisado y aprobado por el Comité Académico de MINUCST 2026.

CONTACTO:
Para consultas sobre este material:
Email: capacitacion@minucst.org
Plataforma: MINUCST Inside

${'-'.repeat(50)}
© 2026 MINUCST. Todos los derechos reservados.
Este material está protegido por derechos de autor y leyes internacionales.
Uso no autorizado está prohibido y puede resultar en acciones legales.

DMCA Notice: Este contenido está protegido bajo la Digital Millennium Copyright Act.
Para reportes de infracción: dmca@minucst.org

Generado desde MINUCST Inside - Plataforma Oficial de Capacitación
    `;
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${material.name.replace(/\s+/g, '_').toLowerCase()}_minucst_2026.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!courses || courses.length === 0) {
    return (
      <div className="py-12 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-900 mb-4">Centro de Capacitación</h1>
            <p className="text-gray-600">Cargando cursos de capacitación...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-900 mb-4 leading-tight">
            Centro de Capacitación Profesional
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Módulos especializados diseñados por expertos internacionales para formar diplomáticos de excelencia mundial
          </p>
          <div className="mt-6 inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
            <CheckCircle className="h-4 w-4 mr-2" aria-hidden="true" />
            Certificación Internacional Disponible
          </div>
        </div>

        {/* Course Modal */}
        {selectedCourse !== null && courses[selectedCourse] && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="course-modal-title">
            <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1 pr-4">
                    <h2 id="course-modal-title" className="text-2xl sm:text-3xl font-bold text-red-900 mb-2">
                      {courses[selectedCourse].title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {courses[selectedCourse].description}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedCourse(null)}
                    className="text-gray-400 hover:text-gray-600 text-3xl transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-lg p-2"
                    type="button"
                    aria-label="Cerrar modal del curso"
                  >
                    ×
                  </button>
                </div>
                
                {/* Video Player */}
                <div className="mb-8">
                  <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden relative shadow-lg">
                    <video
                      ref={videoRef}
                      src={courses[selectedCourse].videoUrl}
                      className="w-full h-full object-cover"
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      preload="metadata"
                      aria-label={courses[selectedCourse].videoTitle}
                    />
                    
                    {/* Video Info Overlay */}
                    <div className="absolute top-4 left-4 right-4">
                      <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white">
                        <h3 className="font-bold text-lg mb-1">{courses[selectedCourse].videoTitle}</h3>
                        <p className="text-sm text-gray-200">{courses[selectedCourse].videoDescription}</p>
                      </div>
                    </div>
                    
                    {/* Custom Controls */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={togglePlayPause}
                          className="text-white hover:text-yellow-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black rounded-lg p-2"
                          type="button"
                          aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
                        >
                          {isPlaying ? <Pause className="h-6 w-6" aria-hidden="true" /> : <Play className="h-6 w-6" aria-hidden="true" />}
                        </button>
                        
                        <div className="flex-1">
                          <div className="bg-white/20 rounded-full h-2">
                            <div 
                              className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                              role="progressbar"
                              aria-valuenow={duration > 0 ? Math.round((currentTime / duration) * 100) : 0}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              aria-label="Progreso del video"
                            />
                          </div>
                        </div>
                        
                        <span className="text-white text-sm font-medium">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Indicator */}
                {user && (
                  <div className="mb-8 bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-semibold text-gray-700">Progreso del curso</span>
                      <span className="text-sm font-bold text-gray-900">
                        {getCourseProgress(courses[selectedCourse].id)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-3 rounded-full transition-all duration-500 shadow-sm"
                        style={{ width: `${getCourseProgress(courses[selectedCourse].id)}%` }}
                        role="progressbar"
                        aria-valuenow={getCourseProgress(courses[selectedCourse].id)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label="Progreso del curso"
                      />
                    </div>
                    {isCourseCompleted(courses[selectedCourse].id) && (
                      <div className="flex items-center mt-3 text-green-600">
                        <CheckCircle className="h-5 w-5 mr-2" aria-hidden="true" />
                        <span className="text-sm font-semibold">¡Curso completado exitosamente!</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Course Materials */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-red-900 mb-6 flex items-center">
                    <FileText className="h-6 w-6 mr-3 text-yellow-600" aria-hidden="true" />
                    Materiales del Curso (Descarga PDF)
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
                    {courses[selectedCourse].materials.map((material, index) => (
                      <div key={index} className="bg-white border border-gray-200 p-4 rounded-xl hover:shadow-md transition-all duration-300 hover:border-yellow-300 group">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-red-800 transition-colors duration-300">
                              {material.name}
                            </h4>
                            <div className="flex items-center space-x-3 text-sm text-gray-500">
                              <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                                {material.type}
                              </span>
                              <span>{material.size}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => downloadMaterialAsPDF(material, courses[selectedCourse].title)}
                            className="ml-3 text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            type="button"
                            aria-label={`Descargar ${material.name} como PDF`}
                          >
                            <Download className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setSelectedCourse(null)}
                    className="bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    type="button"
                  >
                    Cerrar Curso
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Courses Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {courses.map((course, index) => (
            <article 
              key={course.id} 
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up group border border-gray-100"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className={`bg-gradient-to-r ${course.color} p-6 sm:p-8`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">
                      {course.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-white/90">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" aria-hidden="true" />
                        <span className="text-sm font-medium">{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" aria-hidden="true" />
                        <span className="text-sm font-medium">{course.modules} módulos</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    {course.status === 'available' && (
                      <Video className="h-7 w-7 text-white group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                    )}
                    {user && isCourseCompleted(course.id) && (
                      <CheckCircle className="h-7 w-7 text-green-300" aria-hidden="true" />
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-6 sm:p-8">
                <p className="text-gray-600 mb-6 leading-relaxed text-base">
                  {course.description}
                </p>
                
                {/* Individual Progress */}
                {user && course.status === 'available' && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-semibold text-gray-700">Tu progreso personal</span>
                      <span className="text-sm font-bold text-gray-900">{getCourseProgress(course.id)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${getCourseProgress(course.id)}%` }}
                        role="progressbar"
                        aria-valuenow={getCourseProgress(course.id)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`Progreso del curso ${course.title}`}
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {course.status === 'available' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" aria-hidden="true" />
                    ) : (
                      <Clock className="h-5 w-5 text-yellow-500" aria-hidden="true" />
                    )}
                    <span className={`text-sm font-semibold ${
                      course.status === 'available' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {course.status === 'available' ? 'Disponible Ahora' : 'Próximamente'}
                    </span>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => openCourse(index)}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        course.status === 'available'
                          ? 'bg-gradient-to-r from-red-800 to-red-900 hover:from-red-900 hover:to-red-800 text-white hover:scale-105 focus:ring-red-500 shadow-lg hover:shadow-xl'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed focus:ring-gray-300'
                      }`}
                      disabled={course.status !== 'available'}
                      type="button"
                      aria-label={`Acceder al curso ${course.title}`}
                    >
                      <Play className="h-4 w-4" aria-hidden="true" />
                      <span>Acceder</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 bg-gradient-to-r from-red-900 to-red-800 text-white rounded-2xl p-8 sm:p-12 text-center animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Certificación Internacional</h2>
          <p className="text-lg text-gray-100 mb-6 max-w-3xl mx-auto leading-relaxed">
            Al completar todos los módulos, recibirás una certificación oficial reconocida internacionalmente 
            que validará tus competencias diplomáticas y de liderazgo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 hover:bg-white/20 transition-all duration-300">
              <h4 className="font-bold mb-2">Reconocimiento Internacional</h4>
              <p className="text-sm text-gray-200">Certificado válido en más de 50 países</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 hover:bg-white/20 transition-all duration-300">
              <h4 className="font-bold mb-2">Estándares ONU</h4>
              <p className="text-sm text-gray-200">Alineado con protocolos oficiales</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 hover:bg-white/20 transition-all duration-300">
              <h4 className="font-bold mb-2">Validez Permanente</h4>
              <p className="text-sm text-gray-200">Sin fecha de expiración</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Training;