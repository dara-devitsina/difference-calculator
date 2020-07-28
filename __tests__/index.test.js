import fs from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let resultStylish;
let resultPlain;
let resultJson;

beforeAll(() => {
  resultStylish = readFile('result-stylish');
  resultPlain = readFile('result-plain');
  resultJson = readFile('result-json');
});

const formats = [
  ['.json'], ['.yml'], ['.ini'],
];

test.each(formats)(
  'test %s',
  (format) => {
    const filePath1 = getFixturePath(`file1${format}`);
    const filePath2 = getFixturePath(`file2${format}`);
    expect(genDiff(filePath1, filePath2, 'stylish')).toEqual(resultStylish);
    expect(genDiff(filePath1, filePath2, 'plain')).toEqual(resultPlain);
    expect(genDiff(filePath1, filePath2, 'json')).toEqual(resultJson);
  },
);
