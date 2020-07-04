import fs from 'fs';

import path from 'path';

import genDiff from '../src/index.js';

test('compare 2 flat files', () => {
  // HTML находится в файле withLinks.html в директории __fixtures__
  // При чтении текстовых файлов, в конце может добавляться пустая строка.
  // Она удаляется с помощью метода `trim`, если нужно
  // __dirname – директория, в которой находится данный файл с тестами
  const before = fs.readFileSync(`${__dirname}/../__fixtures__/f1.json`, 'utf-8');
  const after = fs.readFileSync(`${__dirname}/../__fixtures__/f2.json`, 'utf-8');
  // Теперь с HTML удобно работать и он не загромождает тесты.
  const result1 = genDiff(before, after);

  expect(result1).toEqual('{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
  - follow: false
}');

expect(genDiff('','')).toEqual('{}');

});
