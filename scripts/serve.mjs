// Zero-dependency static server so /fonts/... and /images/... resolve at the root, like in the real apps.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// Rebuild styleguide/keres.css whenever src/ (tokens.css included) changes, so edits show up on reload.
const tailwind = spawn(process.execPath, [
  fileURLToPath(new URL('../node_modules/tailwindcss/lib/cli.js', import.meta.url)),
  '-c', 'tailwind.config.js', '-i', 'src/keres.css', '-o', 'styleguide/keres.css', '--watch=always',
], { stdio: 'inherit', cwd: fileURLToPath(new URL('..', import.meta.url)) });
for (const sig of ['SIGINT', 'SIGTERM']) process.on(sig, () => { tailwind.kill(); process.exit(); });
process.on('exit', () => tailwind.kill());
const [root = 'styleguide', port = '4173'] = process.argv.slice(2);
const base = resolve(root);
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.ttf': 'font/ttf', '.webp': 'image/webp', '.png': 'image/png' };

createServer(async (req, res) => {
  let path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname));
  let file = join(base, path);
  if (!file.startsWith(base)) { res.writeHead(403).end(); return; }
  try { if ((await stat(file)).isDirectory()) file = join(file, 'index.html'); } catch {}
  let body;
  try { body = await readFile(file); } catch { res.writeHead(404).end('Not found'); return; }
  res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' }).end(body);
}).listen(Number(port), () => console.log(`Style guide: http://localhost:${port}`));
