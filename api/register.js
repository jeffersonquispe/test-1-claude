export default async function handler(req, res) {
  // CORS headers — required on every response
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, workshop } = req.body ?? {};

  if (!name || !email || !workshop) {
    return res.status(400).json({ error: 'name, email and workshop are required' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`,
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({ name, email, phone: phone || null, workshop })
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    return res.status(502).json({ error: err.message ?? 'Database error' });
  }

  const [record] = await response.json();
  return res.status(200).json({ success: true, id: record.id });
}
