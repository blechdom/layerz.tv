var options = {
  tmpDir: __dirname + '/../public/uploaded/tmp',
  uploadDir: __dirname + '/../public/uploaded/files',
  uploadUrl: '/uploaded/files/',
  storage: {
    type: 'local'
  },
  maxPostSize: 500000000, // 500 MB
  minFileSize:  1,
  maxFileSize:  5000000000, // 10 GB
  acceptFileTypes:  /\.(gif|jpe?g|png|mov|mp4|qt|avi|ogg|3gp)/i
};

var optionsForeground = {
  tmpDir: __dirname + '/../public/foregrounds/tmp',
  uploadDir: __dirname + '/../public/foregrounds/files',
  uploadUrl: '/foregrounds/files/',
  storage: {
    type: 'local'
  },
  maxPostSize: 500000000, // 500 MB
  minFileSize:  1,
  maxFileSize:  5000000000, // 10 GB
  acceptFileTypes:  /\.(gif|jpe?g|png|mov|mp4|qt|avi|ogg|3gp)/i
};

var optionsBackground = {
  tmpDir: __dirname + '/../public/backgrounds/tmp',
  uploadDir: __dirname + '/../public/backgrounds/files',
  uploadUrl: '/backgrounds/files/',
  storage: {
    type: 'local'
  },
  maxPostSize: 500000000, // 500 MB
  minFileSize:  1,
  maxFileSize:  5000000000, // 10 GB
  acceptFileTypes:  /\.(gif|jpe?g|png|mov|mp4|qt|avi|ogg|3gp)/i
};

var optionsMidground = {
  tmpDir: __dirname + '/../public/midgrounds/tmp',
  uploadDir: __dirname + '/../public/midgrounds/files',
  uploadUrl: '/midgrounds/files/',
  storage: {
    type: 'local'
  },
  maxPostSize: 500000000, // 500 MB
  minFileSize:  1,
  maxFileSize:  5000000000, // 10 GB
  acceptFileTypes:  /\.(gif|jpe?g|png|mov|mp4|qt|avi|ogg|3gp)/i
};

var optionsAudio = {
  tmpDir: __dirname + '/../public/audio/tmp',
  uploadDir: __dirname + '/../public/audio/files',
  uploadUrl: '/audio/files/',
  storage: {
    type: 'local'
  },
  maxPostSize: 500000000, // 500 MB
  minFileSize:  1,
  maxFileSize:  5000000000, // 10 GB
  acceptFileTypes:  /\.(gif|jpe?g|png|mov|mp4|qt|avi|ogg|3gp)/i
};

var uploader = require('blueimp-file-upload-expressjs')(options);
var uploaderForeground = require('blueimp-file-upload-expressjs')(optionsForeground);
var uploaderBackground = require('blueimp-file-upload-expressjs')(optionsBackground);
var uploaderMidground = require('blueimp-file-upload-expressjs')(optionsMidground);
var uploaderAudio = require('blueimp-file-upload-expressjs')(optionsAudio);

module.exports = function(router) {
  router.get('/upload', function(req, res) {
    uploader.get(req, res, function(obj) {
      res.send(JSON.stringify(obj));
    });
  });

  router.post('/upload', function(req, res) {
    uploader.post(req, res, function(obj) {
      res.send(JSON.stringify(obj));
    });
  });

  router.delete('/uploaded/files/:name', function(req, res) {
    uploader.delete(req, res, function(obj) {
      res.send(JSON.stringify(obj));
    });
  });
  router.get('/uploadForeground', function(req, res) {
    uploaderForeground.get(req, res, function(obj) {
      res.send(JSON.stringify(obj));
    });
  });

  router.post('/uploadForeground', function(req, res) {
    uploaderForeground.post(req, res, function(obj) {
      res.send(JSON.stringify(obj));
    });
  });

  router.delete('/foregrounds/files/:name', function(req, res) {
    uploaderForeground.delete(req, res, function(obj) {
      res.send(JSON.stringify(obj));
    });
  });
  router.get('/uploadBackground', function(req, res) {
    uploaderBackground.get(req, res, function(obj) {
      res.send(JSON.stringify(obj));
    });
  });

  router.post('/uploadBackground', function(req, res) {
    uploaderBackground.post(req, res, function(obj) {
      res.send(JSON.stringify(obj));
    });
  });

  router.delete('/backgrounds/files/:name', function(req, res) {
    uploaderBackground.delete(req, res, function(obj) {
      res.send(JSON.stringify(obj));
    });
  });
  router.get('/uploadMidground', function(req, res) {
    uploaderMidground.get(req, res, function(obj) {
      res.send(JSON.stringify(obj));
    });
  });

  router.post('/uploadMidground', function(req, res) {
    uploaderMidground.post(req, res, function(obj) {
      res.send(JSON.stringify(obj));
    });
  });

  router.delete('/midgrounds/files/:name', function(req, res) {
    uploaderMidground.delete(req, res, function(obj) {
      res.send(JSON.stringify(obj));
    });
  });

router.get('/uploadAudio', function(req, res) {
    uploaderAudio.get(req, res, function(obj) {
      res.send(JSON.stringify(obj));
    });
  });

  router.post('/uploadAudio', function(req, res) {
    uploaderAudio.post(req, res, function(obj) {
      res.send(JSON.stringify(obj));
    });
  });

  router.delete('/audio/files/:name', function(req, res) {
    uploaderAudio.delete(req, res, function(obj) {
      res.send(JSON.stringify(obj));
    });
  });

  return router;
};
