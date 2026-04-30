# CLAUDE.md — Reglas del Proyecto (siempre activas)

## Stack & Restricciones
- UI: solo HTML5 + Tailwind CDN + Lucide icons. NUNCA frameworks JS.
- Estilos: usar clases Tailwind. NUNCA `style=""` inline salvo `blur-[120px]`.
- Imágenes: siempre en `assets/img/`. Nunca rutas absolutas externas para assets propios.

## Tokens de diseño invariables
- bg principal: `dark-900` (#050914) / secundario: `dark-800` (#0a0f1d)
- CTA color: `brand-500` (#0052FF)
- Cards oscuras: siempre con clase `.glass` + `border border-white/5`
- Cards blancas (workshops): `bg-white rounded-[24px] shadow-2xl`

## Tailwind Config (debe estar en index.html)
```js
tailwind.config = {
  theme: {
    extend: {
      colors: {
        'dark': { 900: '#050914', 800: '#0a0f1d', 700: '#0f1629' },
        'brand': { 500: '#0052FF', 400: '#3374FF', 600: '#0040CC' },
      }
    }
  }
}
```

## Convenciones de código
- Cada sección tiene su `id`: `#hero`, `#benefits`, `#courses`, `#faq`, `#register`
- Cada workshop DEBE tener su entrada en `syllabusData` en el mismo commit
- El form siempre hace POST a `/api/register` con JSON body `{ name, email, phone, workshop }`
- Al agregar un taller: imagen en `assets/img/`, entrada en `syllabusData`, card en el grid

## Estructura de archivos
```
index.html          ← landing completa (todo en un solo archivo)
assets/img/         ← todas las imágenes del proyecto
api/register.js     ← serverless function (Vercel)
CLAUDE.md           ← este archivo
```

## Workshop Card pattern (blanca)
```html
<div class="bg-white rounded-[24px] shadow-2xl p-8 flex flex-col gap-4">
  <img src="assets/img/{key}.jpg" alt="{name}" class="w-full h-48 object-cover rounded-2xl">
  <span class="text-xs font-semibold uppercase tracking-widest text-brand-500">{role}</span>
  <h3 class="text-xl font-bold text-dark-900">{name}</h3>
  <p class="text-dark-700 text-sm flex-1">{description}</p>
  <div class="flex items-center gap-2 text-sm text-dark-700">
    <i data-lucide="clock" class="w-4 h-4"></i> {hours}h
  </div>
  <button onclick="openSyllabus('{key}')"
    class="mt-auto bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3 rounded-xl transition-colors">
    Ver programa
  </button>
</div>
```

## syllabusData entry pattern
```js
'{key}': {
  title: '{name}',
  sumilla: 'Descripción corta del taller.',
  resultado: 'Al finalizar podrás...',
  handsOn: ['Proyecto 1', 'Proyecto 2', 'Proyecto 3'],
  requisitos: 'Sin requisitos previos.',
  horas: {hours}
}
```

## API / Backend
- Solo modificar `api/register.js` para cambios de schema
- Variables de entorno: `SUPABASE_URL` y `SUPABASE_ANON_KEY` (nunca hardcodear)
- CORS headers requeridos en toda respuesta de la API

## Glass card CSS (global, en `<style>`)
```css
.glass {
  background: rgba(255,255,255,0.03);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
```
