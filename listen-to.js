#!/usr/bin/env node

var program = require('commander');

program
  .version('0.0.0')
  .command('listen-to <song title>')
  .action(function () {
  });

program.parse(process.argv);
