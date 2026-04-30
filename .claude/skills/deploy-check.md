---
name: deploy-check
description: Valida estructura, variables de entorno y configuración antes de hacer deploy a Vercel
---

Ejecuta los siguientes checks en orden y reporta PASS / FAIL para cada uno:

## Checks de estructura de archivos

- [ ] `index.html` existe en la raíz
- [ ] `api/register.js` existe
- [ ] `api/schema.sql` existe
- [ ] `assets/img/` existe (aunque esté vacía)
- [ ] `CLAUDE.md` existe

## Checks de `index.html`

Leer `index.html` y verificar:
- [ ] Tailwind CDN script presente (`cdn.tailwindcss.com`)
- [ ] Lucide CDN script presente (`unpkg.com/lucide`)
- [ ] `tailwind.config` tiene colores `dark` y `brand`
- [ ] Clase `.glass` definida en `<style>`
- [ ] Sección `#hero` con contenido (no solo placeholder)
- [ ] Sección `#benefits` con contenido
- [ ] Sección `#courses` con al menos una card de workshop
- [ ] Sección `#faq` con al menos 3 preguntas
- [ ] Sección `#register` con formulario y campos `name`, `email`, `phone`, `workshop`
- [ ] Formulario hace POST a `/api/register`
- [ ] `syllabusData` tiene al menos una entrada
- [ ] `lucide.createIcons()` llamado al final del script

## Checks de `api/register.js`

Leer `api/register.js` y verificar:
- [ ] No hay credenciales hardcodeadas (grep de `supabase.co` sin `process.env`)
- [ ] Usa `process.env.SUPABASE_URL`
- [ ] Usa `process.env.SUPABASE_ANON_KEY`
- [ ] Maneja CORS headers
- [ ] Maneja preflight OPTIONS
- [ ] Valida campos requeridos antes de insertar

## Checks de Vercel

Verificar si existe `vercel.json` en la raíz:
- Si existe: verificar que tiene `"rewrites"` o configuración de routes
- Si no existe: crear `vercel.json` mínimo:
  ```json
  {
    "rewrites": [{ "source": "/api/(.*)", "destination": "/api/$1" }]
  }
  ```

## Reporte final

Mostrar tabla de resultados:
```
PASS index.html existe
PASS api/register.js existe
FAIL .env.local — SUPABASE_URL no configurado (⚠️ configurar en Vercel dashboard)
...
```

Contar PASS / FAIL. Si todos PASS: "✅ Listo para deploy: `vercel --prod`"  
Si hay FAILs críticos: listar qué debe corregirse antes del deploy.

## Recordatorios post-check
1. Ejecutar `schema.sql` en Supabase SQL Editor
2. Agregar `SUPABASE_URL` y `SUPABASE_ANON_KEY` en Vercel → Settings → Environment Variables
3. Comando de deploy: `vercel --prod`
