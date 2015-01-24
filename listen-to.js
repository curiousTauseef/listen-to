#!/usr/bin/env node

var program = require('commander');
var fs = require('fs');
var youtubedl = require('youtube-dl');

program
  .version('0.0.0')
  .command('listen-to <title>')
  .action(function (title) {
    var video = youtubedl('http://www.youtube.com/watch?v=90AiXO1pAiA');

    video.on('info', function(info) {
      console.log('Download started');
      console.log('filename: ' + info.filename);
      console.log('size: ' + info.size);
    });

    video.pipe(fs.createWriteStream('song.mp4'));
  });

program.parse(process.argv);
