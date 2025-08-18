# Guía Completa de Transferencia a Netlify

## Paso 1: Descargar el Código Fuente

### Opción A: Descarga directa desde Bolt
1. Haz clic en el botón "Download" en la interfaz de Bolt
2. Se descargará un archivo ZIP con todo el proyecto

### Opción B: Clonar repositorio (si está disponible)
```bash
git clone [URL_DEL_REPOSITORIO]
cd minucst-inside
```

## Paso 2: Preparar el Proyecto Localmente

```bash
# Instalar dependencias
npm install

# Verificar que todo funciona
npm run dev

# Crear build de producción
npm run build
```

## Paso 3: Desplegar en Netlify

### Método 1: Drag & Drop (Más Fácil)
1. Ve a https://netlify.com
2. Crea una cuenta o inicia sesión
3. Arrastra la carpeta `dist` al área de deploy
4. ¡Listo! Tu sitio estará en línea

### Método 2: Conectar con Git (Recomendado)
1. Sube el código a GitHub/GitLab
2. En Netlify: "New site from Git"
3. Conecta tu repositorio
4. Configuración automática detectada

### Método 3: Netlify CLI (Avanzado)
```bash
# Instalar CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

## Paso 4: Configurar Dominio Personalizado

1. En el panel de Netlify: Site settings > Domain management
2. Add custom domain: `minucstinside.com`
3. Configurar DNS según las instrucciones
4. SSL se configura automáticamente

## Paso 5: Configuraciones Avanzadas

### Variables de Entorno (si necesarias)
- Site settings > Environment variables
- Agregar cualquier variable necesaria

### Redirects y Headers
Ya están configurados en `netlify.toml`

### Forms (si usas formularios)
Netlify detecta automáticamente los formularios HTML

## Control Administrativo Completo

Una vez desplegado en tu cuenta de Netlify tendrás:

✅ **Panel de Control Completo**
- Analytics detallados
- Logs de deploy
- Gestión de dominios
- Configuración de SSL

✅ **CI/CD Automático**
- Deploy automático en cada push
- Preview de branches
- Rollback instantáneo

✅ **Gestión de Equipo**
- Invitar colaboradores
- Permisos granulares
- Audit logs

✅ **Optimizaciones**
- CDN global
- Compresión automática
- Image optimization

## Códigos de Acceso del Sistema

### Superadministradores:
- `MINUCST2026-SG-DIEGO`
- `MINUCST2026-SGA-NATASHA`

### Staff de Capacitación:
- `MINUCST-STAFF-01` hasta `MINUCST-STAFF-30`

## Soporte Post-Transferencia

Una vez que tengas el control en Netlify:
1. Podrás modificar cualquier configuración
2. Agregar/quitar funcionalidades
3. Gestionar usuarios y permisos
4. Configurar backups automáticos

## Certificación de Transferencia

Este documento certifica que:
- El código fuente está completo y funcional
- Todas las configuraciones están incluidas
- No hay dependencias ocultas con Bolt
- El control administrativo será 100% tuyo