'use strict';
var express = require('express');
var fs = require('fs');
var async = require ('async');
var router = express.Router();

var uploadManager = require('./uploadManager')(router);

router.get('/', function(req, res, next) {
        	res.render('index', { title: 'Twitch Odyssey' });
});
router.get('/foreground_lair', function(req, res, next) {
                fs.readdir(__dirname + '/../public/thumbnails', function (err, files) {
                     if (err) throw err;
                             res.render('foreground_lair.html', { title: 'Layerz.tv', files: files });
                     });
});
router.get('/background_lair', function(req, res, next) {
                fs.readdir(__dirname + '/../public/foreground', function (err, files) {
                     if (err) throw err;
                             res.render('background_lair.html', { title: 'Layerz.tv', files: files });
                     });
});
router.get('/multilayer_lair', function(req, res, next) {
	var foregroundFiles = [];
	var backgroundFiles = [];
	var midgroundFiles = [];
	async.parallel ( [
		function(callback) {
			fs.readdir(__dirname + '/../public/foreground_thumbs', function (err, foregrounds) {
                     		if (err) throw err;
				console.log("foregrounds: ", foregrounds);
				foregroundFiles = foregrounds;
				callback();
			});	
		},
		function(callback) {
			 fs.readdir(__dirname + '/../public/background_thumbs', function (err, backgrounds) {
                                if (err) throw err;
                                console.log("backgrounds: ", backgrounds);
                                backgroundFiles = backgrounds;
                                callback();
                        });
		},
		function(callback) {
                         fs.readdir(__dirname + '/../public/midground_thumbs', function (err, midgrounds) {
                                if (err) throw err;
                                console.log("midgrounds: ", midgrounds);
                                midgroundFiles = midgrounds;
                                callback();
                        });
                }
	], function (error, results) {
		res.render('multilayer_lair.html', { title: 'Layerz.tv', foregrounds: foregroundFiles, backgrounds: backgroundFiles, midgrounds: midgroundFiles });
	});
});
router.get('/philly', function(req, res, next) {
                fs.readdir(__dirname + '/../public/thumbnails', function (err, files) {
                                if (err) throw err;
                    res.render('philly.html', { title: 'Twitch Odyssey', files: files });
        	});
        });

router.get('/files', function (req, res) {
  	fs.readdir(__dirname + '/../public/uploaded/files', function (err, files) {
  		if (err) throw err;
                res.render('files.html', {files: files });
        });
});
router.get('/content', function (req, res) {
        fs.readdir(__dirname + '/../public/uploaded/files', function (err, files) {
                if (err) throw err;
                res.render('content.html', {files: files });
        });
});
router.get('/foreground', function (req, res) {
        fs.readdir(__dirname + '/../public/foregrounds/files', function (err, files) {
                if (err) throw err;
                                 res.render('foreground.html', {title: 'Foreground', files: files });
        });
});
router.get('/background', function (req, res) {
        fs.readdir(__dirname + '/../public/backgrounds/files', function (err, files) {
                if (err) throw err;
                                 res.render('background.html', {files: files });
        });
});
router.get('/webcam', function (req, res) {
          res.render('webcam.html');
});
router.get('/midground', function (req, res) {
        fs.readdir(__dirname + '/../public/midgrounds/files', function (err, files) {
                if (err) throw err;
                                 res.render('midground.html', {files: files });
        });
});
router.get('/audio', function (req, res) {
        fs.readdir(__dirname + '/../public/audio/files', function (err, files) {
                if (err) throw err;
                                 res.render('audio.html', {files: files });
        });
});
router.get('/homer', function (req, res) {
        fs.readdir(__dirname + '/../public/uploaded/files', function (err, files) {
                if (err) throw err;
                // console.log(files);
                res.render('homer.html', {files: files });
        });
});

router.get('/control', function (req, res) {
    	res.render('control.html');
});

router.get('/instructions', function (req, res) {
    res.render('instructions.html');
});

router.get('/theatre', function (req, res) {
	res.render('index.html');
});

router.get('/couch', function (req, res) {
        res.render('couch.html');
});

// router.get('/chat', function (req, res) {
//     res.render('chat.html');
// });


router.get('/chat', function (req, res) {
        fs.readdir(__dirname + '/../public/uploaded/files', function (err, files) {
                if (err) throw err;
                // console.log(files);
                res.render('chat.html', {files: files });
        });
});

router.get('/streamOnly', function (req, res) {
        fs.readdir(__dirname + '/../public/uploaded/files', function (err, files) {
                if (err) throw err;
                // console.log(files);
                res.render('streamOnly.html', {files: files });
        });
});

router.get('/mobile', function (req, res) {
        fs.readdir(__dirname + '/../public/thumbnails', function (err, files) {
                if (err) throw err;
                // console.log(files);
                res.render('mobile.html', {files: files });
        });
});

module.exports = router;
