# Estado Real del Hosting - MINUCST Inside

## Situación Actual Verificada

### Plataforma de Desarrollo
- **Entorno:** Bolt.new (solo para desarrollo)
- **URL de Preview:** https://minucstinside.com (temporal)

### Plataforma de Hosting Real
- **Proveedor:** Netlify (según configuración)
- **Archivo de configuración:** netlify.toml presente
- **Dominio configurado:** Según configuración en Netlify

### Configuración de Deploy
```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Acciones Requeridas para Control Total

1. **Verificar cuenta de Netlify**
2. **Configurar dominio personalizado en Netlify**
3. **Transferir control administrativo completo**

## Nota Importante
La IA NO migró el hosting. Bolt.new es solo el entorno de desarrollo.
El proyecto está configurado para Netlify según los archivos de configuración.