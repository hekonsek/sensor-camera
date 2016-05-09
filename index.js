var RaspiCam = require("../lib/raspicam");

var camera = new RaspiCam({
	mode: "timelapse",
	output: "/var/rhiot/camera/queue/image_%06d.jpg", // image_000001.jpg, image_000002.jpg,...
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