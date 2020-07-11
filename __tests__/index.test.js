import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path'

import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('compare 2 flat json files', () => {
  const before = `${__dirname}/../__fixtures__/deep1.json`;
  const after = `${__dirname}/../__fixtures__/deep2.json`;
  const result = fs.readFileSync(`${__dirname}/../__fixtures__/result-plain`, 'utf8');
  expect(genDiff(before, after)).toBe(result);
});
