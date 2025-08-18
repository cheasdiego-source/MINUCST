# Guía Simplificada para Deploy en Netlify

## 🚨 PROBLEMA SOLUCIONADO

He simplificado la configuración para que funcione correctamente.

## ✅ Método Correcto - Paso a Paso

### 1. Descargar el Proyecto
- Descarga TODO el proyecto desde Bolt (botón Download)
- Extrae el archivo ZIP

### 2. Verificar Archivos Clave
Asegúrate de que tienes:
- ✅ `package.json` (simplificado)
- ✅ `netlify.toml` (configuración correcta)
- ✅ `vite.config.ts` (simplificado)
- ✅ Carpeta `src/` completa
- ✅ Carpeta `public/` con el logo

### 3. Deploy en Netlify

#### Opción A: Drag & Drop (Recomendado)
1. Ve a https://netlify.com
2. Crea cuenta o inicia sesión
3. Haz clic en **"Add new site"**
4. Selecciona **"Deploy manually"**
5. **Arrastra TODA la carpeta del proyecto** (no solo dist)
6. Netlify automáticamente:
   - Detectará `netlify.toml`
   - Ejecutará `npm install`
   - Ejecutará `npm run build`
   - Publicará la carpeta `dist`

#### Opción B: Desde GitHub
1. Sube el código a GitHub
2. En Netlify: "New site from Git"
3. Conecta tu repositorio
4. Deploy automático

### 4. Configuración Automática
Netlify detectará automáticamente:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: 18

### 5. Configurar Dominio
1. Site settings → Domain management
2. Add custom domain: `minucstinside.com`
3. Configurar DNS según instrucciones
4. SSL automático

## 🎯 Si Sigue Sin Funcionar

### Error Común: "Build failed"
**Solución**: Asegúrate de subir:
- `package.json`
- `src/` completa
- `public/` completa
- `netlify.toml`

### Error: "Command not found"
**Solución**: Netlify necesita `package.json` para saber qué comandos ejecutar

## ✅ Verificación Final
Una vez desplegado:
1. El sitio debe cargar en la URL de Netlify
2. Los códigos de acceso deben funcionar
3. Todas las páginas deben cargar correctamente

## 📞 Códigos de Acceso para Probar
- `MINUCST2026-SG-DIEGO` (Superadmin)
- `MINUCST2026-SGA-NATASHA` (Superadmin)
- `MINUCST-STAFF-01` (Staff)

¡Ahora debería funcionar perfectamente!