# Instrucciones Rápidas - Biobío Digital

## Inicio Rápido

### 1. Instalar dependencias
```bash
cd biobio-digital
npm install
```

### 2. Iniciar la aplicación
```bash
npm start
```

Esto abrirá Expo DevTools en tu navegador.

### 3. Ejecutar en dispositivo

#### Opción A: Dispositivo Físico (Recomendado)
1. Instala **Expo Go** desde Google Play Store
2. Escanea el código QR que aparece en la terminal o en el navegador
3. La aplicación se cargará automáticamente

#### Opción B: Emulador Android
```bash
npm run android
```
Asegúrate de tener Android Studio instalado y un emulador configurado.

## Usuarios de Prueba

### Usuario Normal
- Email: `usuario@correo.cl`
- Contraseña: `cualquiera`

### Administrador
- Email: `admin@correo.cl`
- Contraseña: `cualquiera`

## Funcionalidades por Módulo

### 1. Telemedicina
- Ver centros de salud disponibles
- Agendar citas médicas
- Seleccionar especialidad, fecha y hora
- Ver historial de citas

### 2. Cursos Digitales
- Explorar cursos disponibles
- Inscribirse en cursos
- Marcar progreso (Pendiente/En Curso/Completado)
- **Admin**: Crear, editar y eliminar cursos

### 3. Puntos WiFi
- Ver lista de puntos WiFi gratuitos
- Ver ubicaciones en mapa
- Información de horarios y tipo de conexión

### 4. Trámites Municipales
- Explorar trámites por categoría
- Ver requisitos y documentos necesarios
- Agendar horas presenciales
- Acceder a trámites digitales (enlaces externos)
- Ver historial de trámites agendados

### 5. Panel Admin (solo admin@correo.cl)
- Gestión completa de cursos
- Estadísticas del sistema

## Estructura de Navegación

```
Login
  └─> Home
      ├─> Telemedicina
      │   └─> Agendar Cita
      ├─> Cursos Digitales
      │   └─> Detalle del Curso
      ├─> Puntos WiFi (vista lista/mapa)
      ├─> Trámites Municipales
      │   └─> Detalle del Trámite
      └─> Admin (solo administradores)
```

## Problemas Comunes

### Error: "Metro bundler no puede conectarse"
```bash
# Limpiar cache y reiniciar
npm start -- --clear
```

### Error: "Unable to resolve module"
```bash
# Reinstalar dependencias
rm -rf node_modules
npm install
```

### Advertencias de versión de Node
La aplicación funciona con Node 18.20.3, aunque hay advertencias sobre la versión 20.19.4. Estas son solo advertencias y no afectan el funcionamiento.

## Google Maps (Opcional)

Para usar mapas reales en Android, necesitas:

1. Obtener una API Key de Google Maps
2. Agregar la key en `app.json`:
```json
"android": {
  "config": {
    "googleMaps": {
      "apiKey": "TU_API_KEY_AQUI"
    }
  }
}
```

Sin la API Key, los mapas funcionarán pero sin el estilo de Google Maps.

## Próximos Pasos

1. Conectar con un backend real (actualmente usa datos mock)
2. Implementar autenticación real
3. Agregar notificaciones push
4. Integrar videollamadas para telemedicina
5. Agregar módulo de e-commerce

## Soporte

Para más información, consulta el archivo [README.md](README.md)
