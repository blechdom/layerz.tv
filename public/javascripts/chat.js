$(function() {
  
 var FADE_TIME = 150; // ms
  var TYPING_TIMER_LENGTH = 400; // ms
  var COLORS = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
  ];
	var $window = $(window);
  var $usernameInput = $('.usernameInput'); // Input for username
  
  var $messages = $('.messages'); // Messages area
  
  var $inputMessage = $('#inputMessage'); // Input message input box
  var $loginPage = $('.login.page'); // The login page
  var $chatPage = $('.chat.page'); // The chatroom page

  var username;
  
  var $currentInput = $usernameInput.focus();

  var socket = io();
  var logsPumped = false;

  function addParticipantsMessage (data) {
    return;
    var $el = $('<li>').addClass('log').text(data);
    addMessageElement($el, options);
	console.log("add users message " + data);	
    socket.emit('sendchat', data);
  }

  function setUsername () {
    username = cleanInput($usernameInput.val().trim());
    console.log(username);
    if (username) {
      $loginPage.fadeOut();
      $chatPage.show();
      $loginPage.off('click');
      socket.emit('adduser', username);
    }
  }

  function sendMessage () {
    	var message = $inputMessage.val();
	console.log("send message " + message);
    	message = cleanInput(message);
 	if (message && username) {
     		$inputMessage.blur(); 
     		$inputMessage.val('');
      	socket.emit('sendchat', message);
	console.log("sending message to server");
    	}
  }

  function log (data, options) {
    var $el = $('<li>').addClass('log').text(data.username + ": " + data.message);
    addMessageElement($el, options);
  }

function addMessageElement (el, options) {
    var $el = $(el);

    $el[0].className = 'chatLine';
    if (!options) {
      options = {};
    }
    if (typeof options.fade === 'undefined') {
      options.fade = true;
    }
    if (typeof options.prepend === 'undefined') {
      options.prepend = false;
    }

    if (options.fade) {
      $el.hide().fadeIn(FADE_TIME);
    }
    if (options.prepend) {
      $messages.prepend($el);
    } else {
      $messages.append($el);
    }
    $messages[0].scrollTop = $messages[0].scrollHeight;
  }
  
  function cleanInput (input) {
    return $('<div/>').text(input).text();
  }


  $window.keydown(function (event) {
    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
      $currentInput.focus();
    }
    if (event.which === 13) {
	console.log("pressed return");
      if (username) {
	console.log("has username " + username);
        sendMessage();
      } else {
        setUsername();
      }
    }
  });


  $loginPage.click(function () {
    $currentInput.focus();
  });

  socket.on('updatechat', function (data) {
	log(data);
  });

  socket.on('updateusers', function (data) {
    addParticipantsMessage(data);
	$('#users').empty();
	$.each(data, function(key, value) {	
		$('#users').append('<div>' + key + '</div>');
	});

  });

  socket.emit('requestLog', '');
  socket.on('pumpLog', function (data) {
    console.log(data);
    if (!logsPumped && typeof(data) == String) {
      chats = data.split('\n');
      logsPumped = true;
    }
  });
});
