#!/usr/bin/env node
import pkg from 'commander';

import genDiff from '../src/index.js';

const { program } = pkg;

const gendiff = genDiff;

program
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .command('gendiff <filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    gendiff(filepath1, filepath2);
  })
  .parse(process.argv);

export default gendiff;
