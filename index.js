import fs from 'fs';
import path from 'path';
import parse from './src/parsers.js';
import format from './src/formatters/index.js';
import buildDiff from './src/diffBuilder.js';

const genDiff = (filePath1, filePath2, outputFormat) => {
  const file1 = fs.readFileSync(filePath1, 'utf8');
  const file2 = fs.readFileSync(filePath2, 'utf8');
  const inputFormat1 = path.extname(filePath1).slice(1);
  const inputFormat2 = path.extname(filePath2).slice(1);
  const diffTree = buildDiff(parse(file1, inputFormat1), parse(file2, inputFormat2));
  // console.log(diffTree);

  return format(diffTree, outputFormat);
};

export default genDiff;

const spaces = '  ';
console.log(spaces.repeat(3));
