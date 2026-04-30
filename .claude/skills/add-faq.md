---
name: add-faq
description: Inserta un nuevo ítem en el acordeón FAQ de la landing page
---

Dada la pregunta "$1":

1. **Leer `index.html`** y localizar la sección `<section id="faq">`.

2. **Generar una respuesta** coherente y útil para la pregunta "$1" en el contexto de talleres de IA / programación.

3. **Insertar el nuevo ítem** al final de la lista del acordeón, antes del cierre del contenedor:
   ```html
   <details class="glass border border-white/5 rounded-2xl overflow-hidden group">
     <summary class="flex items-center justify-between p-6 cursor-pointer font-semibold text-white list-none">
       {pregunta}
       <i data-lucide="chevron-down" class="w-5 h-5 text-brand-500 transition-transform group-open:rotate-180"></i>
     </summary>
     <div class="px-6 pb-6 text-white/70 text-sm leading-relaxed">
       {respuesta}
     </div>
   </details>
   ```

4. **Reportar**:
   - Línea donde se insertó el nuevo ítem
   - Total de preguntas FAQ ahora en la página
