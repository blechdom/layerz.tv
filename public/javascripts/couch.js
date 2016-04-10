$(function() {
  // Initialize variables
  var $window = $(window);
  var connected = false;

  var socket = io();
  var selection = "";
  var logsPumped = false;

  socket.on('streamStatus', function (data) {
    console.log('stream status ' + data.streamRunning + ' : ' + data.paused);
    if (data.streamRunning) {
      playerInstance.load([{file:"rtmp://danmnet.ucsc.edu/live/twitchodyssey"}]);
    } else {
      playerInstance.load([{file:"/uploaded/files/twitch_timeout.mp4"}]);
    }
    if (data.paused) {
      pause = true;
      thumbnails.forEach(lock);
    }
  });

  socket.on('changeStream', function (data) {
    console.log('change stream ' + data);
    if (data == 'start') {
      playerInstance.load([{file:"rtmp://danmnet.ucsc.edu/live/twitchodyssey"}]);
    } else {
      playerInstance.load([{file:"/uploaded/files/twitch_timeout.mp4"}]);
    }
  });


  // function pumpLog() {
    // var text = fs.readFileSync('./public/text/chatLog.txt', 'utf-8');
  // }
  // console.log(thumbnails);

	function myResize (event) {
		height = window.innerHeight;
		width = window.innerWidth;
		if (playerInstance) {
			playerInstance.resize(width, height);
		}
	}
	myResize();
	window.onresize = myResize;
	
  var w = window.innerWidth;
  var h = window.innerHeight;

  var playerInstance = jwplayer("rtmpfeed");
  playerInstance.setup({
    file: "/uploaded/files/twitch_timeout.mp4",
    controls: false,
    autostart : true,
    autoplay : true,
    repeat : true,
    width: w, // * .5,
    height: h
  });
  // socket.emit('getStreaming', '?');
  socket.emit('streamStatus', '');
});
