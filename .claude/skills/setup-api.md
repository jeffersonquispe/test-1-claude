---
name: setup-api
description: Genera api/register.js (serverless Vercel) + SQL de tabla leads para Supabase
---

Crea dos archivos:

## 1. `api/register.js` — Serverless Function (Vercel)

Requisitos:
- Método: solo aceptar POST (devolver 405 para otros métodos)
- Leer variables de entorno: `process.env.SUPABASE_URL` y `process.env.SUPABASE_ANON_KEY`
- Parsear body JSON con campos: `{ name, email, phone, workshop }`
- Validar que `name`, `email` y `workshop` no estén vacíos; devolver 400 si faltan
- Insertar en tabla `leads` vía Supabase REST API (fetch nativo, sin SDK para reducir cold start)
- CORS headers en TODAS las respuestas:
  ```
  Access-Control-Allow-Origin: *
  Access-Control-Allow-Methods: POST, OPTIONS
  Access-Control-Allow-Headers: Content-Type
  ```
- Manejar preflight OPTIONS devolviendo 200
- Devolver `{ success: true, id }` en éxito o `{ error: "mensaje" }` con status apropiado

Estructura del archivo:
```js
export default async function handler(req, res) {
  // CORS headers
  // OPTIONS preflight
  // Validar método POST
  // Parsear y validar body
  // Insert en Supabase
  // Responder
}
```

## 2. `api/schema.sql` — SQL para Supabase

Crear tabla `leads`:
```sql
CREATE TABLE IF NOT EXISTS leads (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name        text NOT NULL,
  email       text NOT NULL,
  phone       text,
  workshop    text NOT NULL,
  created_at  timestamptz DEFAULT now()
);

-- Index para búsquedas por email
CREATE INDEX IF NOT EXISTS leads_email_idx ON leads(email);

-- RLS: solo el service role puede leer, insert abierto
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable insert for all" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read for service role" ON leads FOR SELECT USING (auth.role() = 'service_role');
```

## 3. Reportar
- Líneas de `api/register.js`
- Recordar al usuario: crear variables de entorno `SUPABASE_URL` y `SUPABASE_ANON_KEY` en el dashboard de Vercel
- Recordar: ejecutar el SQL en Supabase SQL Editor antes de hacer deploy
