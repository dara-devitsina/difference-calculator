import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path'

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('compare 2 flat json files', () => {
  const before = `${__dirname}/../__fixtures__/f1.json`;
  const after = `${__dirname}/../__fixtures__/f2.json`;
  const result = fs.readFileSync(`${__dirname}/../__fixtures__/flat-result.js`, 'utf8');
  expect(genDiff(before, after)).toBe(result);
});

test('compare 2 flat yaml files', () => {
  const before = `${__dirname}/../__fixtures__/f1.yml`;
  const after = `${__dirname}/../__fixtures__/f2.yml`;
  const result = `${__dirname}/../__fixtures__/flat-result`;
  expect(genDiff(before, after)).toEqual(result);
});

test('compare 2 flat ini files', () => {
  const before = `${__dirname}/../__fixtures__/f1.ini`;
  const after = `${__dirname}/../__fixtures__/f2.ini`;
  const result = `${__dirname}/../__fixtures__/flat-result`;
  expect(genDiff(before, after)).toEqual(result);
});