let nFramesInLoop = 120;
let recorder;

function setup() {
  createCanvas(200, 200);
  recorder = p5Gif.capture({framerate: 60});
}


function draw() {
  let percentCompleteFraction = float(frameCount % nFramesInLoop) / float(nFramesInLoop);
  renderMyDesign(percentCompleteFraction);
  recorder.addFrame();
  if (frameCount == nFramesInLoop) {
    recorder.download('codingtrain.gif');
  }
}

function renderMyDesign(percent) {
  background(180);
  stroke(0, 0, 0);
  strokeWeight(2);
  var cx = 100;
  var cy = 100;
  var radius = 80;
  var rotatingArmAngle = percent * TWO_PI;
  var px = cx + radius * cos(rotatingArmAngle);
  var py = cy + radius * sin(rotatingArmAngle);
  fill(255);
  line(cx, cy, px, py);
  ellipse(px, py, 20, 20);
}