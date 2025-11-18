# Biobío Digital - Aplicación Móvil Android

Aplicación móvil diseñada para reducir la brecha digital en la Región del Biobío, Chile. Integra servicios esenciales como telemedicina, cursos digitales, puntos WiFi comunitarios y trámites municipales en un solo ecosistema accesible.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Platform](https://img.shields.io/badge/platform-Android-green.svg)
![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61dafb.svg)
![Expo](https://img.shields.io/badge/Expo-~54.0.23-000020.svg)

---

## 📱 Características Principales

### ✅ Módulos Implementados

#### 🏥 **1. Telemedicina**
- Listado de centros de salud con especialidades
- Agendamiento de citas médicas (fecha, hora, especialidad)
- Historial de citas programadas
- Acceso a consultas virtuales mediante enlace
- Información de contacto de cada centro

#### 📚 **2. Cursos Digitales**
- Catálogo completo de cursos disponibles
- Inscripción en cursos con un solo clic
- Seguimiento de progreso: Pendiente → En Curso → Completado
- Información detallada: objetivos, requisitos, duración
- Gestión administrativa (CRUD) solo para administradores

#### 📡 **3. Puntos WiFi Comunitarios**
- Listado de puntos WiFi gratuitos
- Coordenadas GPS de cada ubicación
- Integración con Google Maps (abre ubicaciones externamente)
- Información de horarios y tipo de conexión
- Cambio entre vista lista y vista de coordenadas

#### 📄 **4. Trámites Municipales**
- Catálogo organizado por categorías
- Información detallada: requisitos, documentos, costos, tiempos
- Agendamiento de horas presenciales
- Acceso directo a trámites digitalizados
- Historial de trámites agendados

#### ⚙️ **5. Panel de Administración**
- Gestión completa de cursos (crear, editar, eliminar)
- Estadísticas del sistema
- Acceso restringido solo para administradores

---

## 🚀 Guía de Instalación Paso a Paso

### **Requisitos Previos**

Antes de comenzar, asegúrate de tener instalado:

1. **Node.js** (versión 18 o superior)
   - Descargar desde: https://nodejs.org/
   - Verificar instalación: `node --version`

2. **Git** (opcional, para clonar el repositorio)
   - Descargar desde: https://git-scm.com/

3. **Dispositivo Android físico** O **Emulador Android**
   - Para dispositivo físico: Instalar **Expo Go** desde Google Play Store
   - Para emulador: Instalar **Android Studio**

---

### **Paso 1: Obtener el Código**

**Opción A - Si tienes el proyecto descargado:**
```bash
# Navegar al directorio del proyecto
cd ruta/a/biobio-digital
```

**Opción B - Si usas Git:**
```bash
# Clonar el repositorio (si está en Git)
git clone <url-del-repositorio>
cd biobio-digital
```

---

### **Paso 2: Instalar Dependencias**

Abre una terminal en el directorio del proyecto y ejecuta:

```bash
npm install
```

Esto instalará todas las librerías necesarias (puede tomar 2-5 minutos).

**Posibles advertencias:** Es normal ver advertencias sobre versiones de Node.js. La aplicación funcionará correctamente.

---

### **Paso 3: Ejecutar la Aplicación**

#### **Método 1: Dispositivo Físico Android (RECOMENDADO - Más Fácil)**

1. **Instalar Expo Go en tu celular:**
   - Busca "Expo Go" en Google Play Store
   - Descarga e instala la aplicación

2. **Iniciar el servidor de desarrollo:**
   ```bash
   npm start
   ```

3. **Conectar tu dispositivo:**
   - Asegúrate de que tu computadora y celular estén en la misma red WiFi
   - Se abrirá una página web con un código QR
   - Abre **Expo Go** en tu celular
   - Presiona "Scan QR code" y escanea el código
   - La aplicación se cargará automáticamente en tu celular

#### **Método 2: Emulador Android**

1. **Instalar Android Studio:**
   - Descargar desde: https://developer.android.com/studio
   - Durante la instalación, asegúrate de instalar Android SDK y crear un dispositivo virtual

2. **Abrir el emulador:**
   - Abre Android Studio
   - Ve a "Device Manager" o "AVD Manager"
   - Crea un nuevo dispositivo virtual (se recomienda Pixel 5 con Android 13)
   - Inicia el emulador

3. **Ejecutar la aplicación:**
   ```bash
   npm run android
   ```

   La aplicación se instalará automáticamente en el emulador.

---

## 👤 Usuarios de Prueba

La aplicación incluye un sistema de autenticación de demostración. Puedes usar cualquiera de estos usuarios:

### Usuario Normal
- **Correo:** `usuario@correo.cl`
- **Contraseña:** `cualquier cosa` (cualquier texto funciona)
- **Permisos:** Acceso a todos los módulos

### Administrador
- **Correo:** `admin@correo.cl`
- **Contraseña:** `cualquier cosa` (cualquier texto funciona)
- **Permisos:** Acceso a todos los módulos + Panel de Administración

> **Nota:** Este es un sistema de autenticación simulado solo para pruebas. En producción debe implementarse autenticación real.

---

## 🗺️ Navegación de la Aplicación

```
📱 Login
    └─> 🏠 Home (Menú Principal)
        ├─> 🏥 Telemedicina
        │   └─> 📅 Agendar Cita
        │       └─> ✅ Confirmación
        │
        ├─> 📚 Cursos Digitales
        │   └─> 📖 Detalle del Curso
        │       └─> ✅ Inscripción / Marcar Progreso
        │
        ├─> 📡 Puntos WiFi
        │   ├─> 📋 Vista Lista
        │   └─> 🗺️ Vista Mapa
        │
        ├─> 📄 Trámites Municipales
        │   └─> 📋 Detalle del Trámite
        │       └─> 📅 Agendar Hora / Acceder a Trámite Digital
        │
        └─> ⚙️ Panel Admin (solo admin@correo.cl)
            └─> ➕ Crear / ✏️ Editar / 🗑️ Eliminar Cursos
```

---

## 🎯 Cómo Usar Cada Módulo

### **Telemedicina**
1. Toca el botón "Telemedicina" en el menú principal
2. Navega por los centros de salud disponibles
3. Toca "Agendar Cita" en el centro de tu preferencia
4. Selecciona especialidad, fecha y hora
5. Confirma tu cita
6. Revisa tus citas en "Mis Citas"

### **Cursos Digitales**
1. Toca "Cursos Digitales"
2. Explora los cursos disponibles
3. Toca un curso para ver detalles
4. Presiona "Inscribirme en este Curso"
5. Marca tu progreso usando los botones: Pendiente / En Curso / Completado

### **Puntos WiFi**
1. Toca "Puntos WiFi"
2. Cambia entre vista lista y mapa usando el ícono superior derecho
3. En vista mapa, toca los marcadores para ver información
4. Revisa horarios y direcciones de cada punto

### **Trámites Municipales**
1. Toca "Trámites Municipales"
2. Navega por las categorías de trámites
3. Toca un trámite para ver requisitos y documentos
4. Opción A: Si tiene enlace digital, presiona "Realizar Trámite Digital"
5. Opción B: Agenda una hora presencial seleccionando fecha y hora

### **Panel Admin** (solo `admin@correo.cl`)
1. Inicia sesión como administrador
2. Toca "Panel de Administración" en el Home
3. Para crear curso: Toca el ícono "+"
4. Para editar: Toca el ícono de lápiz
5. Para eliminar: Toca el ícono de basura

---

## 📁 Estructura del Proyecto

```
biobio-digital/
├── 📱 App.js                    # Punto de entrada principal
├── 📄 app.json                  # Configuración de Expo
├── 📦 package.json              # Dependencias del proyecto
│
├── 📂 src/
│   ├── 📂 constants/
│   │   └── theme.js             # Colores, espaciado, fuentes
│   │
│   ├── 📂 context/
│   │   ├── AuthContext.js       # Gestión de autenticación
│   │   └── DataContext.js       # Datos globales (mock data)
│   │
│   ├── 📂 navigation/
│   │   └── AppNavigator.js      # Configuración de rutas
│   │
│   └── 📂 screens/
│       ├── 📂 admin/
│       │   └── AdminScreen.js
│       ├── 📂 auth/
│       │   └── LoginScreen.js
│       ├── 📂 courses/
│       │   ├── CoursesScreen.js
│       │   └── CourseDetailScreen.js
│       ├── 📂 telemedicine/
│       │   ├── TelemedicineScreen.js
│       │   └── AppointmentBookingScreen.js
│       ├── 📂 tramites/
│       │   ├── TramitesScreen.js
│       │   └── TramiteDetailScreen.js
│       ├── 📂 wifi/
│       │   └── WiFiScreen.js
│       └── HomeScreen.js
│
├── 📂 assets/                   # Imágenes e íconos
└── 📖 README.md                 # Este archivo
```

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React Native | 0.81.5 | Framework de desarrollo móvil |
| Expo | ~54.0.23 | Plataforma de desarrollo |
| React Navigation | ^7.x | Sistema de navegación |
| Expo Vector Icons | ^15.x | Iconografía |
| Context API | - | Gestión de estado global |
| Google Maps (externa) | - | Visualización de ubicaciones |

---

## ⚠️ Solución de Problemas Comunes

### **Problema: "Metro bundler no puede conectarse"**
```bash
# Solución: Limpiar caché y reiniciar
npm start -- --clear
```

### **Problema: "Unable to resolve module"**
```bash
# Solución: Reinstalar dependencias
rm -rf node_modules
npm install
```

### **Problema: La aplicación no carga en Expo Go**
1. Verifica que tu celular y computadora estén en la misma red WiFi
2. Intenta usar el modo túnel:
   ```bash
   npm start -- --tunnel
   ```

### **Problema: Error al ejecutar `npm run android`**
1. Asegúrate de tener Android Studio instalado
2. Verifica que el emulador esté corriendo
3. Ejecuta: `npx react-native doctor` para diagnosticar problemas

### **Problema: Advertencias sobre versión de Node.js**
- Las advertencias son normales. La aplicación funciona con Node 18.20.3
- Si deseas eliminarlas, actualiza a Node 20.19.4 o superior

---

## 🗺️ Integración con Google Maps

La aplicación utiliza Google Maps de forma externa para mostrar ubicaciones. Cuando el usuario presiona "Abrir en Google Maps" en cualquier punto WiFi, se abrirá la aplicación de Google Maps (si está instalada) o el navegador web con la ubicación exacta.

**Ventajas de este enfoque:**
- ✅ Funciona inmediatamente con Expo Go (sin configuración adicional)
- ✅ No requiere API Keys
- ✅ Aprovecha la aplicación nativa de Google Maps del usuario
- ✅ Incluye navegación completa, tráfico en tiempo real, etc.

---

## 📊 Estado del Proyecto

### ✅ Completado
- [x] Sistema de autenticación
- [x] Módulo de Telemedicina
- [x] Módulo de Cursos Digitales
- [x] Módulo de Puntos WiFi
- [x] Módulo de Trámites Municipales
- [x] Panel de Administración
- [x] Navegación completa
- [x] Diseño responsive
- [x] Accesibilidad básica

### 🔜 Próximas Funcionalidades
- [ ] Integración con backend real
- [ ] Autenticación con clave única
- [ ] Notificaciones push
- [ ] Modo offline
- [ ] Videollamadas integradas
- [ ] Chat de soporte
- [ ] Módulo de e-commerce
- [ ] Múltiples idiomas

---

## 📦 Construcción para Producción

### **Crear APK para Distribución**

1. **Instalar EAS CLI:**
   ```bash
   npm install -g eas-cli
   ```

2. **Iniciar sesión en Expo:**
   ```bash
   eas login
   ```

3. **Configurar el build:**
   ```bash
   eas build:configure
   ```

4. **Crear APK:**
   ```bash
   eas build --platform android --profile preview
   ```

El APK estará disponible para descargar desde tu cuenta de Expo.

### **Publicar en Google Play Store**

Sigue la guía oficial: https://docs.expo.dev/submit/android/

---

## 🎨 Diseño y Accesibilidad

La aplicación está diseñada siguiendo principios de accesibilidad:

- ✅ Botones grandes (mínimo 44x44 px) para fácil interacción
- ✅ Contraste de colores AAA (4.5:1 mínimo)
- ✅ Tipografía legible (mínimo 14px)
- ✅ Lenguaje simple y directo
- ✅ Iconos claros con etiquetas
- ✅ Espaciado generoso entre elementos

**Colores principales:**
- Verde primario: `#2E7D32` (Región del Biobío)
- Azul secundario: `#1565C0`
- Naranja acento: `#FF6F00`

---

## 📝 Notas Importantes

> **⚠️ IMPORTANTE:** Esta es una versión de desarrollo con datos simulados.

- Los datos de centros de salud, cursos, WiFi y trámites son **ficticios**
- El sistema de autenticación es **simulado** (acepta cualquier contraseña)
- Los enlaces a trámites digitales son **ejemplos**
- Las coordenadas del mapa son de **Concepción**

**Para usar en producción:**
1. Conectar con un backend real
2. Implementar autenticación segura (JWT, OAuth, etc.)
3. Actualizar datos reales de servicios
4. Agregar certificados SSL
5. Configurar API Keys de Google Maps
6. Implementar analytics y monitoreo

---

## 🤝 Contribuir

Si deseas contribuir al proyecto:

1. Haz un fork del repositorio
2. Crea una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit tus cambios: `git commit -m 'Agregar nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

---

## 📞 Soporte y Contacto

Para reportar problemas, sugerencias o dudas:

- Abre un issue en GitHub
- Contacta al equipo de desarrollo
- Revisa la documentación en `/docs`

---

## 📄 Licencia

Este proyecto es parte de la iniciativa **Biobío Digital** para la Región del Biobío, Chile.

Desarrollado con ❤️ para reducir la brecha digital.

---

## 🎓 Recursos Adicionales

- [Documentación de Expo](https://docs.expo.dev/)
- [Documentación de React Native](https://reactnative.dev/)
- [Guía de React Navigation](https://reactnavigation.org/)
- [Tutoriales de React Native Maps](https://github.com/react-native-maps/react-native-maps)

---

**¿Listo para comenzar?**

```bash
cd biobio-digital
npm install
npm start
```

¡Escanea el QR con Expo Go y comienza a usar Biobío Digital! 📱✨
