import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let resultStylish;
let resultPlain;
let resultJson;

beforeAll(() => {
  resultStylish = readFile('result-stylish');
  resultPlain = readFile('result-plain');
  resultJson = readFile('result-json');
});

const cases = [
  ['before.json', 'after.json'],
  ['before.yml', 'after.yml'],
  ['before.ini', 'after.ini'],
];

test.each(cases)(
  'compare %s with %s',
  (before, after) => {
    const file1 = getFixturePath(before);
    const file2 = getFixturePath(after);
    expect(genDiff(file1, file2)).toEqual(resultStylish);
    expect(genDiff(file1, file2, 'plain')).toEqual(resultPlain);
    expect(genDiff(file1, file2, 'json')).toEqual(resultJson);
  },
);
