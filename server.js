const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
};

const server = http.createServer((req, res) => {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // ── API mock ────────────────────────────────────────────────────
  if (req.method === 'OPTIONS') {
    res.writeHead(200, cors);
    return res.end();
  }

  if (req.url === '/api/register' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { name, email, workshop } = JSON.parse(body || '{}');
        if (!name || !email || !workshop) {
          res.writeHead(400, { 'Content-Type': 'application/json', ...cors });
          return res.end(JSON.stringify({ error: 'name, email and workshop are required' }));
        }
        console.log(`[LEAD] ${name} | ${email} | ${workshop}`);
        res.writeHead(200, { 'Content-Type': 'application/json', ...cors });
        res.end(JSON.stringify({ success: true, id: crypto.randomUUID() }));
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json', ...cors });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    return;
  }

  // ── Static files ────────────────────────────────────────────────
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';

  const filePath = path.join(ROOT, urlPath);

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Not found');
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\n  IA Academy — dev server`);
  console.log(`  http://localhost:${PORT}\n`);
  console.log(`  API mock activo en POST /api/register`);
  console.log(`  Ctrl+C para detener\n`);
});
