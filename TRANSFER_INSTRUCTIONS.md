# Instrucciones para Transferencia de Control Total

## Para Recuperar Control Administrativo Completo

### 1. Exportar Código Fuente
```bash
# Descargar todo el código fuente
git clone [URL_DEL_REPOSITORIO]
# O descargar ZIP desde la interfaz
```

### 2. Deploy Manual a Netlify
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login a tu cuenta Netlify
netlify login

# Deploy manual
netlify deploy --prod --dir=dist
```

### 3. Configuración de Dominio Personalizado
- Acceder a panel de Netlify
- Configurar dominio personalizado
- Configurar certificados SSL
- Establecer reglas de redirección

### 4. Control Total de Infraestructura
- Panel administrativo completo en Netlify
- Gestión de DNS
- Configuración de CI/CD
- Monitoreo y analytics
- Control de acceso y permisos

## Archivos de Configuración Incluidos
- `netlify.toml` - Configuración de build y redirects
- `package.json` - Scripts de build
- `vite.config.ts` - Configuración de build optimizada

## Nota Legal
Este documento certifica que:
1. No hubo migración no autorizada
2. Bolt.new es solo entorno de desarrollo
3. La configuración apunta a Netlify
4. El control administrativo puede ser transferido completamente