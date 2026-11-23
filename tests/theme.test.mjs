import { test } from 'node:test';
import assert from 'node:assert/strict';
import { render } from '../src/theme.mjs';
import { hsl, rgb } from '../src/variables.mjs';

const css = render();

const classToggles = () =>
  new Set(
    [...css.matchAll(/id: (oxg-[\w-]+)\n\s+title: .*\n(?:\s+description: .*\n)?\s+type: ([\w-]+)/g)]
      .filter(([, , type]) => type === 'class-toggle')
      .map(([, id]) => id),
  );

test('every --oxg variable that the CSS reads is defined', () => {
  const defined = new Set([...css.matchAll(/(--oxg-[\w-]+)\s*:/g)].map((m) => m[1]));
  const used = new Set([...css.matchAll(/var\((--oxg-[\w-]+)/g)].map((m) => m[1]));
  const missing = [...used].filter((name) => !defined.has(name));
  assert.deepEqual(missing, []);
});

test('every Style Settings toggle has a rule, and every rule has a toggle', () => {
  const toggles = classToggles();
  const selectorClasses = new Set([...css.matchAll(/\.(oxg-[\w-]+)/g)].map((m) => m[1]));
  assert.deepEqual([...toggles].filter((id) => !selectorClasses.has(id)), []);
  assert.deepEqual([...selectorClasses].filter((cls) => !toggles.has(cls)), []);
});

test('hsl converts greys and each hue sector', () => {
  assert.deepEqual(hsl('#808080'), { h: 0, s: 0, l: 50 });
  assert.deepEqual(hsl('#ff0000'), { h: 0, s: 100, l: 50 });
  assert.deepEqual(hsl('#00ff00'), { h: 120, s: 100, l: 50 });
  assert.deepEqual(hsl('#0000ff'), { h: 240, s: 100, l: 50 });
  assert.deepEqual(hsl('#ff00ff'), { h: 300, s: 100, l: 50 });
  assert.deepEqual(hsl('#78a9ff'), { h: 218, s: 100, l: 74 });
});

test('rgb gives the comma-separated channels Obsidian expects', () => {
  assert.equal(rgb('#ee5396'), '238, 83, 150');
});
