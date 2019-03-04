# p5.gif

[![NHibiki](https://img.shields.io/badge/Download-Stable-39c000.svg?style=flat-square)](https://unpkg.com/p5.gif@1.0.6/dist/p5gif.min.js)
[![NHibiki](https://img.shields.io/badge/Download-Nightly-edb900.svg?style=flat-square)](https://unpkg.com/p5.gif/dist/p5gif.min.js)
[![Docs](https://img.shields.io/badge/Read-Docs-4da1ff.svg?style=flat-square)](https://github.com/WenheLI/p5.gif/wiki)
[![CircleCI - Prod](https://circleci.com/gh/WenheLI/p5.gif/tree/master.svg?style=svg)](https://circleci.com/gh/WenheLI/p5.gif/tree/master)

[Loading Demo](https://editor.p5js.org/eric1998/sketches/ryClTBjyE) | [Capturing Demo](https://editor.p5js.org/eric1998/sketches/HkWo7LskN)

## Summary
p5gif is a library to process GIF on top of p5.js. It can help artists easily handling GIF related operations. eg. making GIFs, splitting frames, etc.

## How to use

### Refer to CDN

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/p5.min.js"></script>
<script src="https://unpkg.com/p5.gif/dist/p5gif.min.js"></script>
```

### Build From Source

```sh
git clone https://github.com/WenheLI/p5.gif.git ./node_modules/p5.gif
cd ./node_modules/p5.gif

yarn && yarn build
cd ../..
```

In your nodejs

```javascript
import p5Gif from 'p5.gif/build/p5gif.min.js';
```

## Manual

- [**p5Gif Intance**]()
  - [p5Gif.Gif](https://github.com/WenheLI/p5.gif/wiki/gif)
  - [p5Gif.Capture](https://github.com/WenheLI/p5.gif/wiki/capture)
  - [p5Gif.loadGif -> new p5Gif.Gif()](https://github.com/WenheLI/p5.gif/wiki/gif#constructor)
  - [p5Gif.capture -> new p5Gif.Capture()](https://github.com/WenheLI/p5.gif/wiki/capture#constructor)
