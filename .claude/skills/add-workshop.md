---
name: add-workshop
description: Agrega una nueva workshop card + entrada en syllabusData a la landing page
---

Dado el nombre del taller "$1":

1. **Leer `index.html`** completo para ubicar:
   - El comentario `<!-- WORKSHOP CARDS -->` dentro de `#courses`
   - El objeto `syllabusData` en el bloque `<script>`

2. **Generar una `key` única** para el taller: slug en camelCase sin espacios ni tildes.  
   Ejemplo: "Claude & LLMs" → `claudeLLMs`, "Python for AI" → `pythonAI`

3. **Insertar la card** después de `<!-- WORKSHOP CARDS -->` siguiendo el "Workshop Card pattern" de `CLAUDE.md`:
   - `src="assets/img/{key}.jpg"`
   - El botón llama `openSyllabus('{key}')` con la key exacta

4. **Insertar entrada en `syllabusData`** con todos los campos del "syllabusData entry pattern" de `CLAUDE.md`:
   - `title`, `sumilla`, `resultado`, `handsOn[]` (mínimo 3 proyectos), `requisitos`, `horas`
   - Contenido coherente con el nombre real del taller "$1"

5. **Verificar consistencia**: la key del botón `openSyllabus()` DEBE ser idéntica a la key en `syllabusData`.

6. **Agregar al select del formulario** en `#register`: `<option value="{key}">{$1}</option>`

7. **Reportar**:
   - Línea donde se insertó la card
   - Línea donde se insertó la entrada en syllabusData
   - Key generada
   - Confirmar que `openSyllabus('{key}')` y `syllabusData['{key}']` usan la misma key

## Nota sobre imágenes
Crear un placeholder en `assets/img/{key}.jpg` no es posible sin imagen real.  
En su lugar, usar un color de fondo Tailwind como fallback en la card:
```html
<div class="w-full h-48 rounded-2xl bg-gradient-to-br from-brand-500/20 to-dark-800 flex items-center justify-center">
  <i data-lucide="image" class="w-12 h-12 text-white/20"></i>
</div>
```
Comentar: `<!-- Replace with: <img src="assets/img/{key}.jpg"> -->`
