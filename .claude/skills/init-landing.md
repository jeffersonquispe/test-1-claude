---
name: init-landing
description: Crea index.html base con CDNs, tailwind.config, CSS global y estructura de secciones vacías
---

Crea el archivo `index.html` en la raíz del proyecto con la siguiente estructura base:

1. **`<head>`** debe incluir:
   - `<meta charset="UTF-8">` y `<meta name="viewport">`
   - `<title>` descriptivo del taller de IA
   - Tailwind CDN: `<script src="https://cdn.tailwindcss.com"></script>`
   - Lucide CDN: `<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>`
   - tailwind.config con los tokens de `CLAUDE.md` (colores dark-900, dark-800, dark-700, brand-500, brand-400, brand-600)
   - Bloque `<style>` con la clase `.glass` de `CLAUDE.md`

2. **`<body>`** con `bg-dark-900 text-white min-h-screen`:
   - `<nav id="navbar">` — placeholder vacío
   - `<section id="hero">` — placeholder vacío
   - `<section id="benefits">` — placeholder vacío
   - `<section id="courses">` — placeholder vacío
   - `<section id="faq">` — placeholder vacío
   - `<section id="register">` — placeholder vacío
   - `<footer id="footer">` — placeholder vacío

3. **Script al final del body**:
   ```js
   // syllabusData — workshops catalog
   const syllabusData = {};
   
   // Modal logic
   function openSyllabus(key) { /* implementar al agregar workshops */ }
   
   // Init Lucide icons
   lucide.createIcons();
   ```

4. Verificar que el archivo se guardó correctamente y reportar cuántas líneas tiene.

No agregar contenido real todavía — solo la estructura esqueleto lista para recibir secciones.
