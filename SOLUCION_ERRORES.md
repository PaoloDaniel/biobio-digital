# Solución de Errores Comunes - Biobío Digital

Este documento detalla soluciones para los errores más comunes que puedes encontrar al ejecutar la aplicación.

---

## ❌ Error: "RNMapsAirModule could not be found"

### Descripción
Error completo:
```
[runtime not ready]: Invariant Violation:
TurboModuleRegistry.getEnforcing(...):
'RNMapsAirModule' could not be found.
```

### Causa
Este error ocurría porque la aplicación intentaba usar `react-native-maps`, que no es compatible con Expo Go sin configuración nativa adicional.

### ✅ Solución Aplicada
**YA ESTÁ SOLUCIONADO** en la versión actual del código. La pantalla de Puntos WiFi ahora:
- Muestra coordenadas GPS en lugar de un mapa embebido
- Integra con Google Maps externamente (abre la app de Google Maps)
- Funciona perfectamente con Expo Go sin configuración adicional

### Verificación
Si obtienes este error después de actualizar:
1. Asegúrate de tener la última versión del código
2. Limpia la caché:
   ```bash
   npm start -- --clear
   ```
3. Recarga la aplicación en Expo Go (agita el celular → Reload)

---

## ❌ Error: "Metro bundler no puede conectarse"

### Síntomas
- La aplicación no se carga en Expo Go
- Mensaje de error de conexión
- El bundler de Metro se detiene

### ✅ Solución
```bash
# Detener el servidor actual (Ctrl+C)
# Limpiar caché y reiniciar
npm start -- --clear
```

Si persiste:
```bash
# Limpiar todo
rm -rf node_modules
npm install
npm start -- --clear
```

---

## ❌ Error: "Unable to resolve module"

### Síntomas
```
Error: Unable to resolve module @react-navigation/native
Error: Unable to resolve module react-native-screens
```

### ✅ Solución
```bash
# Reinstalar dependencias
rm -rf node_modules
npm install

# Si el error persiste, instalar específicamente
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
```

---

## ❌ Error: "Expo Go no puede escanear el QR"

### Síntomas
- El QR no escanea
- Expo Go no detecta el servidor
- Error de conexión

### ✅ Soluciones

**Opción 1: Verificar red WiFi**
- Asegúrate de que tu computadora y celular estén en la MISMA red WiFi
- Verifica que no haya restricciones en la red (algunas redes públicas bloquean conexiones)

**Opción 2: Usar modo túnel**
```bash
npm start -- --tunnel
```
Esto puede ser más lento pero funciona en cualquier red.

**Opción 3: Conectar manualmente**
1. En Expo Go, toca "Enter URL manually"
2. Ingresa la URL que aparece en la terminal (ej: `exp://192.168.1.5:8081`)

---

## ❌ Error: Advertencias de versión de Node.js

### Síntomas
```
npm WARN EBADENGINE Unsupported engine
package: 'react-native@0.81.5'
required: { node: '>= 20.19.4' }
current: { node: 'v18.20.3' }
```

### ✅ Solución
**Estas son solo ADVERTENCIAS, no errores.** La aplicación funciona correctamente con Node 18.20.3.

Si quieres eliminarlas:
1. Actualiza Node.js a la versión 20.19.4 o superior
2. Descarga desde: https://nodejs.org/
3. Reinstala dependencias:
   ```bash
   rm -rf node_modules
   npm install
   ```

---

## ❌ Error: "Application has not been registered"

### Síntomas
```
Application "main" has not been registered.
This can happen if: * Metro bundler is not running
```

### ✅ Solución
1. Verifica que el servidor Metro esté corriendo (deberías ver logs en la terminal)
2. Recarga la aplicación en Expo Go (agita el celular → Reload)
3. Si persiste:
   ```bash
   npm start -- --clear
   ```

---

## ❌ Error: Pantalla blanca al abrir la app

### Síntomas
- La app se abre pero muestra solo una pantalla blanca
- No hay errores en la consola

### ✅ Solución
1. Abre las Developer Tools en Expo Go (agita el celular)
2. Verifica si hay errores en los logs
3. Recarga la aplicación (Reload)
4. Si persiste:
   ```bash
   npm start -- --clear
   ```

---

## ❌ Error al ejecutar `npm run android`

### Síntomas
```
Error: Android SDK not found
Error: No emulator running
```

### ✅ Solución

**Verificar Android Studio:**
```bash
# Diagnosticar problemas
npx react-native doctor
```

**Pasos:**
1. Instala Android Studio desde https://developer.android.com/studio
2. Durante instalación, instala:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device (AVD)
3. Crea un emulador:
   - Abre Android Studio
   - Tools → Device Manager
   - Create Device → Pixel 5 → Android 13
4. Inicia el emulador ANTES de ejecutar:
   ```bash
   npm run android
   ```

---

## ❌ Error: "Execution failed for task ':app:installDebug'"

### Síntomas
Error al compilar la app en Android

### ✅ Solución
```bash
# Limpiar proyecto Android
cd android
./gradlew clean

# Si estás en Windows
cd android
gradlew.bat clean

# Volver al directorio raíz
cd ..

# Intentar nuevamente
npm run android
```

---

## ❌ Error: Vulnerabilidades de npm (npm audit)

### Síntomas
```
6 moderate severity vulnerabilities
12 high severity vulnerabilities
```

### ✅ Solución
Estas vulnerabilidades son en dependencias de desarrollo y **no afectan** la aplicación en producción.

**Para revisarlas:**
```bash
npm audit
```

**Para intentar arreglarlas (puede causar problemas):**
```bash
npm audit fix
```

**Recomendación:** Ignóralas en desarrollo. En producción usa Expo EAS Build que gestiona esto automáticamente.

---

## ❌ Error: Puerto 8081 ya en uso

### Síntomas
```
Error: Port 8081 already in use
```

### ✅ Solución

**Windows:**
```bash
# Buscar proceso usando el puerto
netstat -ano | findstr :8081

# Matar el proceso (reemplaza PID con el número que aparece)
taskkill /PID <PID> /F
```

**Linux/Mac:**
```bash
# Buscar y matar proceso
lsof -ti:8081 | xargs kill -9
```

**O usa otro puerto:**
```bash
npm start -- --port 8082
```

---

## 🆘 Solución Universal (Última Opción)

Si ninguna solución anterior funciona:

```bash
# 1. Detener todos los procesos de Node/Expo
# En Windows: Ctrl+C en todas las terminales
# O reinicia la computadora

# 2. Limpiar todo
rm -rf node_modules
rm -rf .expo
rm package-lock.json

# 3. Reinstalar desde cero
npm install

# 4. Limpiar caché
npm cache clean --force

# 5. Iniciar de nuevo
npm start -- --clear
```

---

## 📞 Soporte Adicional

Si después de seguir todas estas soluciones aún tienes problemas:

1. **Revisa los logs completos** en la terminal
2. **Toma captura de pantalla** del error exacto
3. **Abre un issue** en GitHub con:
   - Descripción del error
   - Captura de pantalla
   - Pasos que seguiste
   - Sistema operativo
   - Versión de Node.js (`node --version`)

---

## ✅ Checklist de Verificación Antes de Reportar un Error

- [ ] Ejecuté `npm install`
- [ ] Probé con `npm start -- --clear`
- [ ] Mi computadora y celular están en la misma red WiFi
- [ ] Tengo Expo Go instalado y actualizado
- [ ] Intenté recargar la app en Expo Go
- [ ] Revisé los logs completos en la terminal
- [ ] Busqué el error en este documento

---

**Última actualización:** Noviembre 2025
**Versión de la app:** 1.0.0
