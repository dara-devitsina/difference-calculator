#!/usr/bin/env node
import program from 'commander';

import genDiff from '../index.js';

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [stylish, plain, json]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    console.log(`\n${genDiff(filepath1, filepath2, program.format)}\n`);
  })
  .parse(process.argv);
