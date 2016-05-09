var RaspiCam = require("raspicam");
var mkdirp = require('mkdirp');

var imagesDirectory = '/var/rhiot/camera/queue'

mkdirp(imagesDirectory, function (err) {
    if (err) console.error(err);
});

var camera = new RaspiCam({
	mode: "timelapse",
	output: imagesDirectory + "/image_%06d.jpg",
	encoding: "jpg",
	timelapse: 1000,
	timeout: 120000 // take a total of 4 pictures over 12 seconds
});

camera.on("start", function( err, timestamp ){
	console.log("timelapse started at " + timestamp);
});

camera.on("read", function( err, timestamp, filename ){
	console.log("timelapse image captured with filename: " + filename);
});

camera.on("exit", function( timestamp ){
	console.log("timelapse child process has exited");
});

camera.on("stop", function( err, timestamp ){
	console.log("timelapse child process has been stopped at " + timestamp);
});

camera.start();