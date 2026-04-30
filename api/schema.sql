-- Tabla de leads para IA Academy
CREATE TABLE IF NOT EXISTS leads (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name        text NOT NULL,
  email       text NOT NULL,
  phone       text,
  workshop    text NOT NULL,
  created_at  timestamptz DEFAULT now()
);

-- Índice para búsquedas rápidas por email
CREATE INDEX IF NOT EXISTS leads_email_idx ON leads(email);

-- RLS: insert abierto, lectura solo para service_role
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert for all"
  ON leads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Enable read for service role"
  ON leads FOR SELECT
  USING (auth.role() = 'service_role');
