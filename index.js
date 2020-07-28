import fs from 'fs';
import path from 'path';
import parse from './src/parsers.js';
import toFormat from './src/formatters/index.js';
import buildDiff from './src/diffBuilder.js';

const genDiff = (filePath1, filePath2, outputFormat) => {
  const file1 = fs.readFileSync(filePath1, 'utf8');
  const file2 = fs.readFileSync(filePath2, 'utf8');
  const inputFormat = path.extname(filePath1);
  const diffTree = buildDiff(parse(file1, inputFormat), parse(file2, inputFormat));
  return toFormat(diffTree, outputFormat);
};

export default genDiff;
