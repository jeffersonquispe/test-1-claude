---
name: add-section
description: Agrega una sección completa (hero/benefits/courses/faq/register/footer/navbar) a index.html
---

Dado el nombre de sección "$1", agrega el contenido completo dentro del elemento con `id="$1"` en `index.html`.

## Instrucciones generales
1. Leer `index.html` y localizar `<section id="$1">` (o `<nav id="navbar">` / `<footer id="footer">`)
2. Reemplazar el placeholder vacío con el HTML completo de la sección
3. Respetar TODOS los tokens de diseño de `CLAUDE.md`
4. Reportar las líneas modificadas

---

## Contenido por sección

### `navbar`
- Fondo `bg-dark-900/80 backdrop-blur-md` fijo en top, z-50
- Logo a la izquierda (texto + ícono Lucide `brain`)
- Links de navegación: Beneficios, Talleres, FAQ, Registro
- CTA button `bg-brand-500 hover:bg-brand-600` → `#register`

### `hero`
- Altura mínima `min-h-screen` centrado vertical y horizontal
- Badge animado con texto "Nuevo · Talleres 2025"
- H1 grande (text-5xl md:text-7xl font-black) con gradiente brand
- Subtítulo descriptivo (max-w-2xl)
- Dos botones: CTA primario `bg-brand-500` → `#register` y secundario outline → `#courses`
- Elemento decorativo: blob con `blur-[120px]` y color brand-500/20 (este es el único `style=""` permitido)

### `benefits`
- Título de sección centrado
- Grid de 3 columnas en desktop, 1 en móvil
- Cada card: `.glass border border-white/5 rounded-2xl p-8`
- 6 beneficios con ícono Lucide, título y descripción

### `courses`
- Título + subtítulo centrados
- Grid de cards blancas: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`
- Comentario `<!-- WORKSHOP CARDS -->` donde van las cards
- Cada card sigue el "Workshop Card pattern" de `CLAUDE.md`

### `faq`
- Título centrado
- Lista de acordeón: cada ítem es un `<details>` con `<summary>`
- Mínimo 5 preguntas frecuentes relevantes al taller de IA
- Estilo: `.glass border border-white/5 rounded-2xl` por ítem

### `register`
- Fondo diferenciador: `bg-dark-800`
- Título + subtítulo centrados
- Formulario centrado `max-w-lg mx-auto`
- Campos: nombre completo, email, teléfono, select de taller
- Submit button `bg-brand-500 w-full py-4 rounded-xl font-bold`
- Script: POST a `/api/register` con JSON, mostrar mensaje de éxito/error

### `footer`
- `bg-dark-900 border-t border-white/5`
- Logo + descripción breve a la izquierda
- Links de navegación al centro
- RRSS icons (Lucide) a la derecha
- Copyright `© 2025` al fondo centrado
