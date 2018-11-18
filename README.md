# p5.gif

[![NHibiki](https://img.shields.io/badge/Download-Stable-39c000.svg?style=flat-square)](https://p5gif-build.s3.us-west-2.amazonaws.com/stable/p5gif.min.js)
[![NHibiki](https://img.shields.io/badge/Download-Nightly-edb900.svg?style=flat-square)](https://p5gif-build.s3.us-west-2.amazonaws.com/nightly/latest.min.js)
[![CircleCI - Prod](https://circleci.com/gh/WenheLI/p5.gif/tree/master.svg?style=svg)](https://circleci.com/gh/WenheLI/p5.gif/tree/master)

A Powerful gif module for p5.js

## Outline
- [Final Project Proposal](#final-project-proposal)
    - [Project Title](#project-title)
    - [Team Members](#team-members)
    - [Define the problem.](#define-the-problem)
    - [Address Greater Landscape](#address-greater-landscape)
    - [Deliverables](#deliverables)
    - [Implementation](#implementation)
    - [Timeline](#timeline)
    - [Documentation](#documentation)
    - [Accessibility](#accessibility)
    - [Mentoring](#mentoring)
    - [More about you](#more-about-you)
            - [Jinzhong Yu (NHibiki)](#jinzhong-yu-nhibiki)
            - [Wenhe Li](#wenhe-li)
    - [References](#references)

## Project Title 
*P5.GIF*

*This is a library to process GIF on top of p5.js. It can help artists easily handling GIF related operations. eg. making GIFs, splitting frames, etc.*

## Team Members
- [**Wenhe Li**](https://github.com/WenheLI)
- [__Jinzhong Yu__](https://github.com/NHibiki)

## Define the problem. 
- GIF is a commonly used format to circulate in the web. While **p5.js** right now doesn't support any direct API related with GIF. We are thinking such a GIF library will be a huge help in terms of interenet experience. 
- Compared with video, the GIF format can be a better way to present the project. We want to give an API that allow artists to capture their project and export it as gif during runtime.

## Address Greater Landscape
A better gif experience for digital artists.

## Deliverables
- A constructor to typically load GIF, wrapping by a GIF Class.
- A set of methods to process GIF:
  - Splitting Frames.
  - Recombination of Frames / Files.
  - Extracting Images from Files.
- Any other APIs to construct GIFs.

## Implementation
- Implement an extended library for p5.js named `p5.gif`.
- A general constructor for GIF loading.

```js
let gifConfig = {
    width: 300,
    height: 300,
    quality: 1,
    scale: 1,
    interval: 100,
    ...
};

/* initialize gif instance */
let gif1 = p5GIF.loadGIF( gifUrl || image[], gifConfig{} );

/* modify gif */
gif1.resize(400, 400);
gif1.download([name]);

/* gif properties */
gif1.rawData                            // -> P5Image []
gif1.{...config}                        // config

/* split frame */
gif1.frames[0];                         // -> p5Image {0}
gif1.setFrame(0, frame)                 // -> gif1
gif1.insertFrames(0, frame[], *lambda); // -> gif1
gif1.range(0, 10);                      // -> p5GIF

/* general effects */
gif1.range(5, 10).grayscale(0.7);       // do grayscale on frame [5, 10)

/* display gif */
gif1.display(0, 0);

/* Addons API */
let cap = p5GIF.capture({
    top: 0, 
    left: 0, 
    width: CANVAS_WIDTH, 
    height: CANVAS_HEIGHT,
    framerate: 10
})                                      // -> Capture Instance

cap.start().stopAfter({ second: 3 });   // 1
cap.start().stopAfter({ frame: 180 });  // 2

cap.start();
setTimeout(cap.stop.bind(cap), 3000);   // 3

cap.start();
setTimeout(cap.pause.bind(cap), 1000);
setTimeout(cap.resume.bind(cap), 2000);
setTimeout(cap.stop.bind(cap), 3000);   // 4

cap.save();                             // -> p5GIF
```

## Timeline

| Week | Wenhe | Jinzhong |
| ---- | ------ | ----- |
|1|1️⃣ Set up Circle CI <br/> 2⃣️ Set up Eslinter <br/> 3⃣️ Design p5Gif object’s interface|1️⃣ Config grunt build file <br/> 2️⃣ Complete static class interface <br/> 3️⃣ Setup symlinks with p5|
|2|1️⃣ Implement gif general effects <br/> 2️⃣ Implement gif split function |1️⃣ Implement git loader <br/> 2️⃣ Implement gif display
|3|1️⃣ Connect with p5 library|1️⃣ Implement Capture function
|4|1️⃣ Test for functions related with p5Gif object interface and implementation <br/> 2⃣️ Document & Notations for p5Gif object implementation |1️⃣ Unit Test of library static functions <br/> 2️⃣ Document and Notate funcions of static methods
|5|1️⃣ Library homepage design & implement|1️⃣ Example codes for p5gif library

## Documentation
 - Telegram for nightly updating
 - Blog for digestion

## Accessibility
 - API of whether to insert aria label when playing/stoping/pausing the gif.
 - API of reading description & subtitle by voiceover throughout playing.

## Mentoring
*TBD*

## More about you

#### Jinzhong Yu (NHibiki)
| KEY | VALUE |
|---|---|
| Interests && Experience | [ "Creating interesting stuff for sharing", "Building fun libraries or tools for public use" ] |
| Contributed? | [ Hexo {}, EveriToken {} ] |
| Barriers \|\| Concerns | null |
| Github | [NHibiki](https://github.com/NHibiki) |
| Blog | [Blog](https://yuuno.cc) |
| Portfolio | [Portfolio](https://portfolio.yuuno.cc) |

#### Wenhe Li
| KEY | VALUE |
|---|---|
| Interests && Experience | ["Full-stack", "Hacker", "IoT", "Processing & P5.js", "Kinect & Leap motion", "Human Computer Interface"] |
| Contributed? | [ Not yet ] |
| Barriers \|\| Concerns | "What I should do in the Open Source World" |
| Github | [WenheLi](https://github.com/WenheLi) |
| Blog | [Blog](https://blog.steins.live) |
| Portfolio | Under Develop! |
## References

- [p5.js](https://p5js.org)
- [gif.js](https://jnordberg.github.io/gif.js/)
- [p5.js libraries](https://p5js.org/libraries/)
- [p5.gif.js](https://github.com/antiboredom/p5.gif.js/tree/master)
