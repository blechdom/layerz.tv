$(function() {
  var FADE_TIME = 150; // ms
  var TYPING_TIMER_LENGTH = 400; // ms
  var COLORS = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
  ];

  // Initialize variables
  var $window = $(window);

  var connected = false;

  var thumbnails = [];
  var foreThumbs = [];
  var midThumbs = []; 
  var backThumbs = [];  
  var pause = false;
  
  var socket = io();
  var selection = "";
  var selectionB = "";
  var selectionM = "";
  var selectionF = "";
  var logsPumped = false;

var $backgroundThumbs = $('.background.thumbs');
var $midgroundThumbs = $('.midground.thumbs');
var $foregroundThumbs = $('.foreground.thumbs');
var $audio = $('.audio');
var $webcam = $('.webcam');
var videoType = 'backgrounds';
var $dzone = $('.dzone');

$midgroundThumbs.hide();
$foregroundThumbs.hide();
$webcam.hide();
$audio.hide();
$dzone.show();
$backgroundThumbs.show();


  function testThumb () {

	console.log("test Thumb");
	socket.emit('thumbClick', 'for realz');
  }


$('#thumbsButtons button').click(function(){

	$('#thumbsButtons button').addClass('active').not(this).removeClass('active');
	videoType = $(this).val();
	if(videoType=="backgrounds") {
		$midgroundThumbs.hide();
		$foregroundThumbs.hide();
		$webcam.hide();
		$audio.hide();
		$dzone.show();
		$backgroundThumbs.show();

	}
	     if(videoType=="midgrounds") {
		$backgroundThumbs.hide();
                $foregroundThumbs.hide();
                $webcam.hide();
		$audio.hide();
		$dzone.show();
                $midgroundThumbs.show();
        }
	     if(videoType=="foregrounds") {
		$midgroundThumbs.hide();
                $backgroundThumbs.hide();
                $webcam.hide();
		$audio.hide();
		$dzone.show();
                $foregroundThumbs.show();
        }
	if(videoType=="webcam") {
		$midgroundThumbs.hide();
                $foregroundThumbs.hide();
                $backgroundThumbs.hide();
		$audio.hide();
		$dzone.hide();
        	$webcam.show();
	}
	if(videoType=="audio") {
                $midgroundThumbs.hide();
                $foregroundThumbs.hide();
                $backgroundThumbs.hide();
                $webcam.hide();
                $dzone.show();
		$audio.show();
        }
	console.log("video type: " + videoType);
});
 /* 
Dropzone.options.multiDropzone = {

                        dictDefaultMessage: videoType + '<br>Dragjhgjhgkhg a video here to upload',
                        success: function(file, response) {
                                var obj = JSON.parse(response);
                                var name = obj.files[0].name;
                                console.log('create multi thumb : ' + name + " video type: " + videoType);
                                socket.emit('createMultiThumb', { name: name, type: videoType});
                        }
                };
*/
  socket.on('streamStatus', function (data) {
    console.log('stream status ' + data.streamRunning + ' : ' + data.paused);
    if (data.streamRunning) {
      playerInstance.load([{file:"rtmp://danmnet.ucsc.edu/live/layerz"}]);
    } else {
      playerInstance.load([{file:"/uploaded/files/green.mp4"}]);
    }
    if (data.paused) {
      pause = true;
      thumbnails.forEach(lock);
    }
  });

  socket.on('nextPlaying', function (data) {
    console.log('new playing ');
    if (selection) {
      selection.style.borderStyle = "none";
      selection = null;
    }
  });

 socket.on('nextPlayingB', function (data) {
    console.log('new playing background ');
    if (selectionB) {
      selectionB.style.borderStyle = "none";
      selectionB = null;
    }
  });
  socket.on('nextPlayingM', function (data) {
    console.log('new playing mid ');
    if (selectionM) {
      selectionM.style.borderStyle = "none";
      selectionM = null;
    }
  });
  socket.on('nextPlayingF', function (data) {
    console.log('new playing foreground ');
    if (selectionF) {
      selectionF.style.borderStyle = "none";
      selectionF = null;
    }
  });
socket.on('changeStream', function (data) {
    console.log('change stream ' + data);
    if (data == 'start') {
      playerInstance.load([{file:"rtmp://danmnet.ucsc.edu/live/layerz"}]);
    } else {
      playerInstance.load([{file:"/uploaded/files/green.mp4"}]);
    }
  });

  function lock(element, index, array) {
    element.className = 'locked';
  };

  function unlock(element, index, array) {
    element.className = 'thumbnail';
  }

  socket.on('pause', function (data) {
    if (!pause) {
      // playerInstance.pause();
      console.log(data);
      pause = true;
      thumbnails.forEach(lock);
    }
  });


  socket.on('unpause', function (data) {
    if (pause) {
      // playerInstance.play();
      console.log(data);
      pause = false;
      // if (nextVid.length != 0) {
      //   playerInstance.load([{file:nextVid}]);
      //   nextVid = "";
      // }
      thumbnails.forEach(unlock);
    }
  });

  socket.emit('requestLog', '');
  socket.on('pumpLog', function (data) {
    console.log(data);
    if (!logsPumped && typeof(data) == String) {
      chats = data.split('\n');
      logsPumped = true;
      //TODO: append chats by logs
    }
  });
 
function thumbClick2 () {
    if (!selection && !pause) {
      socket.emit('recieveVote', this.src);
      console.log('voting for ' + this.src);
      this.style.borderColor = "#00e600";
      selection = this;
    }
	}
function thumbClickB () {
    if (!selectionB && !pause) {
      socket.emit('recieveVoteB', this.src);
      console.log('voting for background ' + this.src);
      this.style.borderColor = "#00e600";
      selectionB = this;
    }
}
function thumbClickM () {
    if (!selectionM && !pause) {
      socket.emit('recieveVoteM', this.src);
      console.log('voting for midground ' + this.src);
      this.style.borderColor = "#00e600";
      selectionM = this;
    }
}
function thumbClickF () {
    if (!selectionF && !pause) {
      socket.emit('recieveVoteF', this.src);
      console.log('voting for foreground ' + this.src);
      this.style.borderColor = "#00e600";
      selectionF = this;
	}    
}
  function mouseOver () {
    if (!selection && !pause) {
      this.style.borderWidth = "thick";
      this.style.borderColor = "#1a75ff";
      this.style.borderStyle = "solid";
    }
  }

  function mouseOut () {
    if (!selection && !pause) {
      this.style.borderStyle = "none";
    }
  }
/*  
var grab = document.getElementById('grab');
  for (var a in grab.childNodes) {
    a = grab.childNodes[a];
    for (var b in a.childNodes) {
      b = a.childNodes[b];
      for (var c in b.childNodes) {
        c = b.childNodes[c];
        if (c.childNodes && c.childNodes.length != 0) {
          var target = c.childNodes[0].nextSibling;
          target.onclick = thumbClick2;
          target.onmouseover = mouseOver;
          target.onmouseout = mouseOut;
          target.className = 'thumbnail';
          thumbnails.push(target);
        }
      }
    }
  }
*/	
  var grabB = document.getElementById('grabB');
  for (var a in grabB.childNodes) {
    a = grabB.childNodes[a];
    for (var b in a.childNodes) {
      b = a.childNodes[b];
      for (var c in b.childNodes) {
        c = b.childNodes[c];
        if (c.childNodes && c.childNodes.length != 0) {
          var target = c.childNodes[0].nextSibling;
          target.onclick = thumbClickB;
          target.onmouseover = mouseOver;
          target.onmouseout = mouseOut;
          target.className = 'thumbnail';
          backThumbs.push(target);
        }
      }
    }
  }
var grabF = document.getElementById('grabF');
  for (var a in grabF.childNodes) {
    a = grabF.childNodes[a];
    for (var b in a.childNodes) {
      b = a.childNodes[b];
      for (var c in b.childNodes) {
        c = b.childNodes[c];
        if (c.childNodes && c.childNodes.length != 0) {
          var target = c.childNodes[0].nextSibling;
          target.onclick = thumbClickF;
          target.onmouseover = mouseOver;
          target.onmouseout = mouseOut;
          target.className = 'thumbnail';
          foreThumbs.push(target);
        }
      }
    }
  }
var grabM = document.getElementById('grabM');
  for (var a in grabM.childNodes) {
    a = grabM.childNodes[a];
    for (var b in a.childNodes) {
      b = a.childNodes[b];
      for (var c in b.childNodes) {
        c = b.childNodes[c];
        if (c.childNodes && c.childNodes.length != 0) {
          var target = c.childNodes[0].nextSibling;
          target.onclick = thumbClickM;
          target.onmouseover = mouseOver;
          target.onmouseout = mouseOut;
          target.className = 'thumbnail';
          midThumbs.push(target);
        }
      }
    }
  }
	function myResize (event) {
		height = window.innerHeight;
		width = window.innerWidth;
		if (playerInstance) {
			playerInstance.resize(width, height * .5);
		}
	}
	myResize();
	window.onresize = myResize;
	
  var w = window.innerWidth;
  var h = window.innerHeight;

  var playerInstance = jwplayer("webRTCfeed");
  playerInstance.setup({
    file: "/uploaded/files/green.mp4",
    controls: false,
    autostart : true,
    autoplay : true,
    repeat : true,
    width: w, // * .5,
    height: h * .5
  });
  // socket.emit('getStreaming', '?');
  socket.emit('streamStatus', '');
});
