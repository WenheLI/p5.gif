var jpg1, jpg2;
var gif1, gif2;
var startFrame = 0;

function setup() {
    // put setup code here
    createCanvas(500, 500);

    gif1 = p5Gif.loadGif("test.gif", function() {
        this.loop();
    }, {repeat:false});

    jpg1 = loadImage("test.jpg");
    jpg2 = loadImage("test.jpg", () => {
        jpg2.filter('gray');
    });
    
    gif2 = p5Gif.loadGif([jpg1, jpg2], function() {
        this.play({y:200});
        this.resize(100, 100)
    });
}



function draw() {
    // put drawing code here
    // if (gif.isLoading) return;
    // if (!startFrame) {
    //     startFrame = frameCount;
    //     gif.play();
    // }
    // if (frameCount < 200 + startFrame) {
    //     gif.delay = [50, 50];
    // } else if (frameCount < 400 + startFrame) {
    //     gif.delay = [null, 300];
    // } else {
    //     gif.pause();
    // }
}

