import fs from 'fs';
import path from 'path';

import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.join(process.cwd(), '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const resultRecursive = readFile('result-recursive').trimEnd();
const resultPlain = readFile('result-plain').trimEnd();
const resultJson = readFile('result-json').trimEnd();

const cases = [
  [getFixturePath('file1.json'), getFixturePath('file2.json'), '', resultRecursive],
  [getFixturePath('file1.yml'), getFixturePath('file2.yml'), '', resultRecursive],
  [getFixturePath('file1.ini'), getFixturePath('file2.ini'), '', resultRecursive],
  [getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain', resultPlain],
  [getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain', resultPlain],
  [getFixturePath('file1.ini'), getFixturePath('file2.ini'), 'plain', resultPlain],
  [getFixturePath('file1.json'), getFixturePath('file2.json'), 'json', resultJson],
  [getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json', resultJson],
  [getFixturePath('file1.ini'), getFixturePath('file2.ini'), 'json', resultJson],
];

describe('test', () => {
  test.each(cases)(
    'given %p and %p as arguments with format %p, returns %p',
    (firstArg, secondArg, thirdArg, expected) => {
      const result = genDiff(firstArg, secondArg, thirdArg);
      expect(result).toEqual(expected);
    },
  );
});
