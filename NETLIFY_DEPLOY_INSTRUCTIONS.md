# Instrucciones Específicas para Deploy en Netlify

## ⚠️ IMPORTANTE: No subas solo la carpeta /dist

Netlify necesita el proyecto completo para funcionar correctamente.

## ✅ Método Correcto - Opción 1: Deploy Manual Completo

### Paso 1: Preparar el Proyecto
1. Descarga TODO el proyecto desde Bolt (no solo dist)
2. Extrae el ZIP completo
3. Verifica que tienes estos archivos:
   ```
   proyecto/
   ├── dist/                 (build generado)
   ├── src/                  (código fuente)
   ├── public/               (assets públicos)
   ├── package.json          (configuración)
   ├── netlify.toml          (configuración Netlify)
   ├── _redirects            (reglas de redirección)
   └── otros archivos...
   ```

### Paso 2: Deploy en Netlify
1. Ve a https://netlify.com
2. Crea cuenta o inicia sesión
3. Haz clic en **"Add new site"**
4. Selecciona **"Deploy manually"**
5. **Arrastra TODA la carpeta del proyecto** (no solo dist)
6. Netlify detectará automáticamente:
   - Build command: `npm run build`
   - Publish directory: `dist`

## ✅ Método Alternativo - Opción 2: Desde GitHub

### Paso 1: Subir a GitHub
1. Crea un repositorio en GitHub
2. Sube todo el código del proyecto
3. Asegúrate de incluir todos los archivos

### Paso 2: Conectar con Netlify
1. En Netlify: **"New site from Git"**
2. Conecta tu cuenta de GitHub
3. Selecciona el repositorio
4. Netlify detectará automáticamente la configuración

## 🔧 Configuración Automática

Netlify detectará automáticamente:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18 (desde netlify.toml)

## 🚨 Si Tienes Problemas

### Error: "No build command found"
- **Solución**: Asegúrate de subir el `package.json`

### Error: "Build failed"
- **Solución**: Verifica que subiste todas las carpetas (`src/`, `public/`, etc.)

### Error: "Page not found"
- **Solución**: El archivo `netlify.toml` maneja las redirecciones automáticamente

## 📞 Verificación Final

Una vez desplegado, verifica:
1. ✅ El sitio carga correctamente
2. ✅ Los códigos de acceso funcionan
3. ✅ El dominio personalizado está configurado
4. ✅ SSL está activo (candado verde)

## 🎯 Resultado Esperado

- **URL temporal**: algo como `amazing-site-123456.netlify.app`
- **Dominio personalizado**: `minucstinside.com` (después de configurar DNS)
- **Control total**: Panel administrativo completo en Netlify