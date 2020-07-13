import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path'

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let resultStylish;
let resultPlain;
let resultJson;

beforeAll(() => {
  resultStylish = fs.readFileSync(`${__dirname}/../__fixtures__/result-stylish`, 'utf8').trimEnd();
  resultPlain = fs.readFileSync(`${__dirname}/../__fixtures__/result-plain`, 'utf8').trimEnd();
  resultJson = fs.readFileSync(`${__dirname}/../__fixtures__/result-json`, 'utf8').trimEnd();
});

test('compare 2 json files', () => {
  const before = `${__dirname}/../__fixtures__/file1.json`;
  const after = `${__dirname}/../__fixtures__/file2.json`;
  expect(genDiff(before, after)).toEqual(resultStylish);
  expect(genDiff(before, after, 'plain')).toEqual(resultPlain);
  expect(genDiff(before, after, 'json')).toEqual(resultJson);
});

test('compare 2 yaml files', () => {
  const before = `${__dirname}/../__fixtures__/file1.yml`;
  const after = `${__dirname}/../__fixtures__/file2.yml`;
  expect(genDiff(before, after)).toEqual(resultStylish);
  expect(genDiff(before, after, 'plain')).toEqual(resultPlain);
  expect(genDiff(before, after, 'json')).toEqual(resultJson);
});

test('compare 2 ini files', () => {
  const before = `${__dirname}/../__fixtures__/file1.ini`;
  const after = `${__dirname}/../__fixtures__/file2.ini`;
  expect(genDiff(before, after)).toEqual(resultStylish);
  expect(genDiff(before, after, 'plain')).toEqual(resultPlain);
  expect(genDiff(before, after, 'json')).toEqual(resultJson);
});
