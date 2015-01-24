#!/usr/bin/env node

var program = require('commander');
var fs = require('fs');
var youtubedl = require('youtube-dl');
var Player = require('player');

program
  .version('0.0.0')
  .command('listen-to <title>')
  .action(function (title) {
    var video = youtubedl('http://www.youtube.com/watch?v=90AiXO1pAiA', ['--extract-audio']);

    video.on('info', function(info) {
      console.log('Download started');
      console.log('filename: ' + info.filename);
      console.log('size: ' + info.size);
    });

    video.pipe(fs.createWriteStream('song.mp3'));
    var player = new Player('./song.mp3');
    player.play(function(err, player){
      console.log('end!');
    });
  });

program.parse(process.argv);
