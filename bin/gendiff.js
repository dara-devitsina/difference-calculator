#!/usr/bin/env node
import pkg from 'commander';

import genDiff from '../src/index.js';

const { program } = pkg;

const gendiff = genDiff;
// export default gendiff;

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [stylish, plain, json]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2, program.format));
  })
  .parse(process.argv);
