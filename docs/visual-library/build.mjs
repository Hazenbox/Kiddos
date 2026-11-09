// Regenerates library.csv and index.html from library.json.
// Usage: node docs/visual-library/build.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = dirname(fileURLToPath(import.meta.url));
const lib = JSON.parse(readFileSync(join(dir, 'library.json'), 'utf8'));
const refs = lib.references;

const cols = [
  ['id', r => r.id],
  ['letter', r => r.letter],
  ['word', r => r.word],
  ['role', r => r.role],
  ['category', r => r.category],
  ['style', r => r.style],
  ['background', r => r.background],
  ['width', r => r.resolution.width],
  ['height', r => r.resolution.height],
  ['native_square', r => r.resolution.native_square],
  ['ai_check', r => r.ai_check],
  ['file', r => r.file],
  ['pinterest_image_url', r => r.source.pinterest_image_url],
  ['pinterest_pin_url', r => r.source.pinterest_pin_url ?? ''],
  ['original_domain', r => r.source.original_domain ?? ''],
  ['original_link', r => r.source.original_link ?? ''],
  ['rationale', r => r.rationale],
  ['approval_status', r => r.approval.status],
  ['rights_status', r => r.rights.status],
  ['rights_notes', r => r.rights.notes ?? ''],
];
const csvCell = v => {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const csv = [cols.map(c => c[0]).join(','), ...refs.map(r => cols.map(c => csvCell(c[1](r))).join(','))].join('\n') + '\n';
writeFileSync(join(dir, 'library.csv'), csv);

const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const letters = [...new Set(refs.map(r => r.letter))];
const roleOrder = ['Primary', 'Alternative', 'Exploration', 'Distinctive'];
const card = r => `
      <figure class="card">
        <div class="img"><img src="${esc(r.file)}" alt="${esc(r.word)}" loading="lazy"></div>
        <figcaption>
          <div class="top"><span class="role role-${r.role.toLowerCase()}">${r.role}</span><span class="id">${r.id}</span></div>
          <h3>${esc(r.word)}</h3>
          <p class="tags">${r.category} · ${r.style} · ${r.resolution.width}×${r.resolution.height}${r.resolution.native_square ? '' : ' · cropped'} · <span class="ai ai-${r.ai_check}">${r.ai_check}</span></p>
          <p class="why">${esc(r.rationale)}</p>
          <p class="src"><a href="${esc(r.source.pinterest_pin_url || r.source.pinterest_image_url)}" target="_blank" rel="noopener">Pinterest</a> · ${esc(r.source.original_domain || 'unknown')} · <span class="rights rights-${r.rights.status}">${r.rights.status}</span></p>
        </figcaption>
      </figure>`;
const sections = letters.map(L => {
  const rs = refs.filter(r => r.letter === L).sort((a, b) => roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role));
  return `
    <section id="${L}">
      <h2>${L}${rs[0]?.foundation ? ' <small>foundation</small>' : ''}</h2>
      <div class="grid">${rs.map(card).join('')}
      </div>
    </section>`;
}).join('');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Kiddos Visual Library</title>
<style>
  :root { --bg:#fafaf8; --fg:#1c1c1a; --muted:#6b6b66; --card:#fff; --line:#e6e4df; --accent:#e8590c; }
  @media (prefers-color-scheme: dark) { :root { --bg:#161615; --fg:#ecebe7; --muted:#9a9993; --card:#1f1f1d; --line:#2e2d2a; } }
  * { box-sizing: border-box; }
  body { margin:0; background:var(--bg); color:var(--fg); font:14px/1.45 -apple-system, system-ui, sans-serif; }
  header { padding:32px 16px 8px; max-width:1200px; margin:auto; }
  header h1 { margin:0 0 4px; font-size:28px; }
  header p { margin:0; color:var(--muted); }
  nav { position:sticky; top:0; background:var(--bg); border-bottom:1px solid var(--line); padding:8px 16px; display:flex; flex-wrap:wrap; gap:4px; justify-content:center; z-index:1; }
  nav a { color:var(--fg); text-decoration:none; width:28px; text-align:center; padding:4px 0; border-radius:6px; font-weight:600; }
  nav a:hover { background:var(--line); }
  main { max-width:1200px; margin:auto; padding:0 16px 64px; }
  section { padding-top:24px; }
  h2 { font-size:40px; margin:0 0 12px; }
  h2 small { font-size:12px; color:var(--muted); font-weight:500; text-transform:uppercase; letter-spacing:.06em; }
  .grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(240px, 1fr)); gap:16px; }
  .card { margin:0; background:var(--card); border:1px solid var(--line); border-radius:12px; overflow:hidden; }
  .img { aspect-ratio:1; background:#fff; }
  .img img { width:100%; height:100%; object-fit:cover; display:block; }
  figcaption { padding:10px 12px 12px; }
  .top { display:flex; justify-content:space-between; align-items:center; }
  .id { color:var(--muted); font-variant-numeric:tabular-nums; font-size:12px; }
  .role { font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.05em; padding:2px 6px; border-radius:4px; background:var(--line); }
  .role-primary { background:#e8590c22; color:var(--accent); }
  h3 { margin:6px 0 2px; font-size:16px; }
  .tags, .src { color:var(--muted); font-size:12px; margin:2px 0; }
  .why { margin:6px 0; }
  .src a { color:inherit; }
  .rights-unverified { color:#b7791f; }
  .rights-replace-before-release { color:#c92a2a; font-weight:600; }
  .ai-ai-generated-suspected { color:#c92a2a; font-weight:600; }
  .ai-likely-real { color:#2f9e44; }
</style>
</head>
<body>
<header>
  <h1>Kiddos A–Z Visual Library</h1>
  <p>${refs.length} references · ${letters.length} letters · generated from library.json · see CURATION_GUIDELINE.md</p>
</header>
<nav>${letters.map(L => `<a href="#${L}">${L}</a>`).join('')}</nav>
<main>${sections}
</main>
</body>
</html>
`;
writeFileSync(join(dir, 'index.html'), html);
console.log(`Wrote library.csv and index.html for ${refs.length} references.`);
