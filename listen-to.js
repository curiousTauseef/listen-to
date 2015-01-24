#!/usr/bin/env node

var del = require('del');
var fs = require('fs');
var Player = require('player');
var program = require('commander');
var request = require('superagent');
var youtubedl = require('youtube-dl');

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

    del(['song.mp3'], function (err, deletedFiles) {
      console.log('Deleted ', deletedFiles.join(', '));
    });
  });

program.parse(process.argv);
