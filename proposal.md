# Final Project Proposal
- [Final Project Proposal](#final-project-proposal)
    - [Project Title](#project-title)
    - [Team Members](#team-members)
    - [Define the problem.](#define-the-problem)
    - [Deliverables](#deliverables)
    - [Implementation](#implementation)
    - [Timeline](#timeline)
        - [Week 1](#week-1)
        - [Week 2](#week-2)
        - [Week 3](#week-3)
        - [Week 4](#week-4)
        - [Week 5](#week-5)
    - [Documentation](#documentation)
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
*What is the current state of things? What issue do you wish to solve and why? Who is the audience?*
- GIF is a commonly used format to circulate in the web. While **p5.js** right now doesn't support any direct API related with GIF. We are thinking such a GIF library will be a huge help in terms of interenet experience. 
- Compared with video, the GIF format can be a better way to present the project. We want to give an API that allow artists to capture their project and export it as gif during runtime.

## Deliverables
*Propose a clear list of deliverables.*
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

### Week 1
 - Environment for p5
 - Setup Coding Frameworks and Interfaces
 - CI setup 

### Week 2
 - Implement gif loader & display
 - Implement gif general effects & split function 

### Week 3
  - Implement Capture function 
  - Connect with p5 library

### Week 4
 - Testing / 
 - Documentations / Notations  

### Week 5
 - snacks🍟 and fun🤡 
 - Presentation  

## Documentation
 - Telegram for nightly updating
 - Blog for digestion

## Mentoring
*List some possible mentors for this project. Describe what kinds of help you need (technical, conceptual, outreach, etc.)*

## More about you
*What are your interests and experience? Have you contributed to other open source projects? What barriers or concerns have kept you from contributing to free and open source software? If you have an online portfolio, github account, or other relevant documentation of your work, please include links. If the project is a collaboration, a section should be included for each collaborator.*

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

## References

- [p5.js](https://p5js.org)
- [gif.js](https://jnordberg.github.io/gif.js/)
- [p5.js libraries](https://p5js.org/libraries/)
- [p5.gif.js](https://github.com/antiboredom/p5.gif.js/tree/master)