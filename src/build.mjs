import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { render } from './theme.mjs';

const out = join(import.meta.dirname, '..', 'theme.css');
const css = render();

if (process.argv.includes('--check')) {
  let current = '';
  try {
    current = readFileSync(out, 'utf8');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  if (current !== css) {
    console.error('theme.css is out of date. Run `npm run build`.');
    process.exit(1);
  }
} else {
  writeFileSync(out, css);
  console.log(`wrote theme.css (${(css.length / 1024).toFixed(1)} KB)`);
}
