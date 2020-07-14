import fs from 'fs';
import path from 'path';

import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(process.cwd(), '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let resultRecursive;
let resultPlain;
let resultJson;

beforeAll(() => {
  resultRecursive = readFile('result-recursive').trimEnd();
  resultPlain = readFile('result-plain').trimEnd();
  resultJson = readFile('result-json').trimEnd();
});

test('compare 2 json files', () => {
  const before = getFixturePath('file1.json');
  const after = getFixturePath('file2.json');
  expect(genDiff(before, after)).toEqual(resultRecursive);
  expect(genDiff(before, after, 'plain')).toEqual(resultPlain);
  expect(genDiff(before, after, 'json')).toEqual(resultJson);
});

test('compare 2 yaml files', () => {
  const before = getFixturePath('file1.yml');
  const after = getFixturePath('file2.yml');
  expect(genDiff(before, after)).toEqual(resultRecursive);
  expect(genDiff(before, after, 'plain')).toEqual(resultPlain);
  expect(genDiff(before, after, 'json')).toEqual(resultJson);
});

test('compare 2 ini files', () => {
  const before = getFixturePath('file1.ini');
  const after = getFixturePath('file2.ini');
  expect(genDiff(before, after)).toEqual(resultRecursive);
  expect(genDiff(before, after, 'plain')).toEqual(resultPlain);
  expect(genDiff(before, after, 'json')).toEqual(resultJson);
});
