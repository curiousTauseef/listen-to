#!/usr/bin/env node

var program = require('commander');
var fs = require('fs');
var youtubedl = require('youtube-dl');

program
  .version('0.0.0')
  .command('listen-to <song title>')
  .action(function () {
    console.log('testing');
  });

program.parse(process.argv);
