import { fileURLToPath } from 'url';
import { dirname } from 'path'

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('compare 2 flat json files', () => {
  const before = `${__dirname}/../__fixtures__/f1.json`;
  const after = `${__dirname}/../__fixtures__/f2.json`;
  const result1 = genDiff(before, after);
  
  expect(result1).toEqual({
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
  - follow: false
});
// expect(gendiff('','')).toEqual({});
});

test('compare 2 flat yaml files', () => {
  const before = `${__dirname}/../__fixtures__/f1.yml`;
  const after = `${__dirname}/../__fixtures__/f2.yml`;
  const result1 = genDiff(before, after);

  expect(result1).toEqual({
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
  - follow: false
});
// expect(gendiff('','')).toEqual({});
});

test('compare 2 flat ini files', () => {
  const before = `${__dirname}/../__fixtures__/f1.ini`;
  const after = `${__dirname}/../__fixtures__/f2.ini`;
  const result1 = genDiff(before, after);

  expect(result1).toEqual({
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
  - follow: false
});
// expect(gendiff('','')).toEqual({});
});