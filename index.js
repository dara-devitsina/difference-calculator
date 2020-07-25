import parse from './src/parsers.js';
import format from './src/formatters/index.js';
import buildDiff from './src/diff.js';

const genDiff = (filePath1, filePath2, neededFormat) => {
  const file1 = parse(filePath1);
  const file2 = parse(filePath2);
  const difference = buildDiff(file1, file2);
  return format(difference, neededFormat);
};

export default genDiff;
