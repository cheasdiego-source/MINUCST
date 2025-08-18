# Transferir Dominio de Bolt a Netlify

## 🎯 **Objetivo: Dominio 100% en Netlify**

Quieres que `minucstinside.com` esté completamente gestionado por Netlify.

## 🔄 **Proceso de Transferencia**

### **Paso 1: Configurar Sitio en Netlify**
1. **Sube tu proyecto** a Netlify (manual o GitHub)
2. **Verifica que funciona** con la URL temporal de Netlify
3. **Anota la URL** (ej: `amazing-site-123456.netlify.app`)

### **Paso 2: Agregar Dominio en Netlify**
1. En Netlify: **Site settings** → **Domain management**
2. **Add custom domain**: `minucstinside.com`
3. Netlify te mostrará **nameservers** como:
   ```
   dns1.p01.nsone.net
   dns2.p01.nsone.net
   dns3.p01.nsone.net
   dns4.p01.nsone.net
   ```

### **Paso 3: Cambiar Nameservers en Bolt**
1. **Ve a la configuración de dominio** en Bolt
2. **Busca "Nameservers" o "DNS"**
3. **Cambia los nameservers** por los de Netlify
4. **Guarda los cambios**

### **Paso 4: Verificación**
- **Propagación**: 5-48 horas (usualmente 30 minutos)
- **SSL**: Netlify configurará automáticamente
- **Verificación**: `minucstinside.com` apuntará a Netlify

## 🚨 **Alternativa Más Rápida**

Si Bolt no permite cambiar nameservers:

### **Configuración DNS Manual**
1. En Bolt: **Configuración DNS**
2. **A Record**: `@` → IP de Netlify
3. **CNAME**: `www` → tu-sitio.netlify.app
4. **Guardar cambios**

## 🎉 **Resultado Final**

Una vez completado:
- ✅ `minucstinside.com` funcionará desde Netlify
- ✅ Control total en panel de Netlify
- ✅ SSL automático
- ✅ CDN global de Netlify
- ✅ Analytics de Netlify

**¿Quieres que empecemos con subir el proyecto a Netlify primero?**