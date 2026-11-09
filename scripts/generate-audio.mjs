// Pre-generates pronunciation clips into public/audio using macOS `say` + ffmpeg.
// Run: node scripts/generate-audio.mjs
import { readFileSync, mkdirSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';

const src = readFileSync('constants.ts', 'utf8');
const phrases = new Set();
for (const m of src.matchAll(/word:\s*'([^']+)'/g)) phrases.add(m[1]);
for (let i = 1; i <= 100; i++) phrases.add(String(i));
for (const c of 'abcdefghijklmnopqrstuvwxyz') {
  phrases.add(c);
  phrases.add(`capital ${c}`);
}

// Must match slug() in services/audioService.ts
const slug = (t) => t.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

mkdirSync('public/audio', { recursive: true });
for (const text of phrases) {
  const out = `public/audio/${slug(text)}.mp3`;
  if (existsSync(out)) continue;
  const aiff = path.join(tmpdir(), `kiddos-${slug(text)}.aiff`);
  // Single letters are spelled out so "a" is the letter name, not the article.
  const spoken = text.length === 1
    ? `[[char LTRL]] ${text}`
    : text.replace(/^capital (\w)$/, 'Capital [[char LTRL]] $1');
  execFileSync('say', ['-v', 'Samantha', '-r', '150', '-o', aiff, spoken]);
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', aiff, '-ac', '1', '-b:a', '48k', out]);
}
console.log(`Generated ${phrases.size} clips`);
