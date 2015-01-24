#!/usr/bin/env node

var del = require('del');
var fs = require('fs');
var Player = require('player');
var program = require('commander');
var request = require('superagent');
var youtubedl = require('youtube-dl');

function searchMusic(query, cb) {
  superagent
  .get('http://partysyncwith.me:3005/search/'+ query +'/1')
  .end(function(err, res) {
    if(err) {
      console.log(err);
    } else {
      if (typeof JSON.parse(res.text).data !== 'undefined') {
        if (JSON.parse(res.text).data[0].duration < 600) {
          var url = JSON.parse(res.text).data[0].video_url;
          cb(url);
        } else {
          cb(null);
        }
      }
    }
  })
}

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
