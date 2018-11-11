var jpg;
var gif;
var startFrame = 0;

function setup() {
    // put setup code here
    createCanvas(500, 500);
    jpg = loadImage("test.jpg");
    gif = new p5Gif.Gif("test.gif");
}

function draw() {
    // put drawing code here
    if (gif.isLoading) return;
    if (!startFrame) {
        startFrame = frameCount;
        gif.play();
    }
    if (frameCount < 200 + startFrame) {
        gif.delay = [50, 50];
    } else if (frameCount < 400 + startFrame) {
        gif.delay = [null, 300];
    } else {
        gif.pause();
    }
}

