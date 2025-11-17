import React, { createContext, useState, useContext } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData debe ser usado dentro de un DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  // Mock data para telemedicina
  const [healthCenters] = useState([
    {
      id: '1',
      name: 'Hospital de Concepción',
      address: 'Av. Roosevelt 1550, Concepción',
      phone: '+56 41 2123456',
      specialties: ['Medicina General', 'Pediatría', 'Cardiología'],
    },
    {
      id: '2',
      name: 'CESFAM Talcahuano',
      address: 'Calle Principal 100, Talcahuano',
      phone: '+56 41 2654321',
      specialties: ['Medicina General', 'Enfermería'],
    },
  ]);

  const [appointments, setAppointments] = useState([]);

  // Mock data para cursos
  const [courses, setCourses] = useState([
    {
      id: '1',
      title: 'Introducción a la Informática',
      description: 'Aprende los conceptos básicos de computación',
      level: 'Básico',
      modality: 'Online',
      duration: '4 semanas',
      objectives: ['Conocer el sistema operativo', 'Navegar por Internet', 'Usar correo electrónico'],
      requirements: 'Ninguno',
    },
    {
      id: '2',
      title: 'Trámites Digitales',
      description: 'Cómo realizar trámites en línea de forma segura',
      level: 'Básico',
      modality: 'Online',
      duration: '2 semanas',
      objectives: ['Identificar trámites digitales', 'Usar clave única', 'Navegar sitios gubernamentales'],
      requirements: 'Conocimientos básicos de informática',
    },
  ]);

  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Mock data para puntos WiFi
  const [wifiPoints] = useState([
    {
      id: '1',
      name: 'Plaza Independencia',
      address: 'Plaza Independencia, Concepción',
      type: 'WiFi Público',
      schedule: '24 horas',
      coordinates: { latitude: -36.8201, longitude: -73.0444 },
    },
    {
      id: '2',
      name: 'Biblioteca Municipal',
      address: 'Barros Arana 328, Concepción',
      type: 'WiFi Público',
      schedule: 'Lun-Vie: 9:00-18:00',
      coordinates: { latitude: -36.8270, longitude: -73.0490 },
    },
  ]);

  // Mock data para trámites
  const [tramites] = useState([
    {
      id: '1',
      category: 'Permisos de Circulación',
      title: 'Permiso de Circulación',
      description: 'Renovación anual del permiso de circulación de vehículos',
      requirements: ['Revisión técnica al día', 'Seguro obligatorio vigente', 'Cédula de identidad'],
      documents: ['Certificado de revisión técnica', 'Certificado de seguro'],
      cost: '$50.000 - $200.000',
      estimatedTime: '30 minutos',
      digitalLink: 'https://www.ejemplo.cl/tramites',
    },
    {
      id: '2',
      category: 'Certificados',
      title: 'Certificado de Residencia',
      description: 'Certificado que acredita domicilio en la comuna',
      requirements: ['Cédula de identidad', 'Comprobante de domicilio'],
      documents: ['Cédula de identidad', 'Cuenta de servicios'],
      cost: 'Gratuito',
      estimatedTime: '15 minutos',
      digitalLink: null,
    },
  ]);

  const [scheduledTramites, setScheduledTramites] = useState([]);

  // Funciones para telemedicina
  const addAppointment = (appointment) => {
    setAppointments([...appointments, { ...appointment, id: Date.now().toString() }]);
  };

  // Funciones para cursos
  const enrollInCourse = (courseId) => {
    if (!enrolledCourses.find(c => c.courseId === courseId)) {
      setEnrolledCourses([...enrolledCourses, {
        courseId,
        status: 'pending',
        enrolledAt: new Date().toISOString(),
      }]);
    }
  };

  const updateCourseProgress = (courseId, status) => {
    setEnrolledCourses(enrolledCourses.map(c =>
      c.courseId === courseId ? { ...c, status } : c
    ));
  };

  const addCourse = (course) => {
    setCourses([...courses, { ...course, id: Date.now().toString() }]);
  };

  const updateCourse = (courseId, updatedCourse) => {
    setCourses(courses.map(c => c.id === courseId ? { ...c, ...updatedCourse } : c));
  };

  const deleteCourse = (courseId) => {
    setCourses(courses.filter(c => c.id !== courseId));
  };

  // Funciones para trámites
  const scheduleTramite = (tramite) => {
    setScheduledTramites([...scheduledTramites, { ...tramite, id: Date.now().toString() }]);
  };

  const value = {
    // Telemedicina
    healthCenters,
    appointments,
    addAppointment,

    // Cursos
    courses,
    enrolledCourses,
    enrollInCourse,
    updateCourseProgress,
    addCourse,
    updateCourse,
    deleteCourse,

    // WiFi
    wifiPoints,

    // Trámites
    tramites,
    scheduledTramites,
    scheduleTramite,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
