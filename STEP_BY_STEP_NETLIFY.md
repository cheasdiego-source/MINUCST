# 🚀 Guía Paso a Paso - Subir a Netlify

## ✅ **PASO 1: Descargar el Proyecto**

1. **Haz clic en el botón "Download"** en la parte superior de Bolt
2. **Se descargará un archivo ZIP** con todo el proyecto
3. **Extrae el ZIP** en tu computadora
4. **Verifica que tienes estos archivos importantes:**
   - ✅ `package.json`
   - ✅ `netlify.toml` 
   - ✅ Carpeta `src/`
   - ✅ Carpeta `public/`
   - ✅ Carpeta `dist/`

## 🌐 **PASO 2: Crear Cuenta en Netlify**

1. **Ve a https://netlify.com**
2. **Haz clic en "Sign up"**
3. **Usa tu email** o conecta con GitHub/Google
4. **Verifica tu email** si es necesario

## 📤 **PASO 3: Subir el Proyecto**

### Método A: Drag & Drop (Más Fácil)
1. **En Netlify, haz clic en "Add new site"**
2. **Selecciona "Deploy manually"**
3. **Arrastra TODA la carpeta del proyecto** (no solo dist)
4. **Netlify automáticamente:**
   - Detectará `netlify.toml`
   - Ejecutará `npm install`
   - Ejecutará `npm run build`
   - Publicará el sitio

### Método B: Desde GitHub (Recomendado para futuro)
1. **Sube el código a GitHub primero**
2. **En Netlify: "New site from Git"**
3. **Conecta tu repositorio**
4. **Deploy automático**

## ⏱️ **PASO 4: Esperar el Deploy**

- **Tiempo estimado:** 2-5 minutos
- **Verás el progreso** en tiempo real
- **Al finalizar** tendrás una URL como: `amazing-site-123456.netlify.app`

## 🎯 **PASO 5: Probar que Funciona**

1. **Visita la URL temporal** que te dio Netlify
2. **Prueba los códigos de acceso:**
   - `MINUCST2026-SG-DIEGO`
   - `MINUCST-STAFF-01`
3. **Verifica que todo funciona**

## 📞 **¿Listo para empezar?**

**¡Descarga el proyecto ahora y me dices cuando tengas el ZIP extraído!**

Después configuraremos tu dominio `minucstinside.com` para que apunte a Netlify.