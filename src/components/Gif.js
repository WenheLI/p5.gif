import Gifuct from '../../lib/gif/gif';
import P5GIFError from './Error.js';
import { Routine } from '@nhibiki/js-routine';
import GIFEncoder from 'gif-encoder';

//TODO: gif encoder, gif colo model, import p5.Image operation wrapper 

export default class Gif {
    /** 
    This is the interface for GIf objec related methods
    */

    /**
     * Decode Credit to https://stackoverflow.com/questions/48234696/how-to-put-a-gif-with-canvas
     */
    
    // String: Source URI
    _src = ''; 
    get src() { return this._src; }

    // Boolean: is loading gif or pictures
    _isloading = false;
    get isLoading() { return this._isloading; }
    
    // p5Image{}[]
    _frames = null;
    get frames() { this.__checkLoading(); return this._frames; }

    // Boolean: if the gif is repeating
    set repeat(t) { this._gifConfig.repeat = !!t; }
    get repeat() { return this._gifConfig.repeat; }

    get height() {return this._gifConfig.height || 0; }
    set height(h) {
        if (typeof h === 'number' && h >= 0) {
            this._gifConfig.height = h;
        } else {
            throw new P5GIFError("Wrong value for height");
        }
    }

    get width() {return this._gifConfig.width || 0; }
    set width(w) {
        if (typeof w === 'number' && w >= 0) {
            this._gifConfig.width = w;
        } else {
            throw new P5GIFError("Wrong value for width");
        }
    }
  

    // Number[]: the delay of each frame
    set delay(t) {
        if (typeof t === 'number') {
            if (t < 10) return this._gifConfig.delay;
            else return this._gifConfig.delay = Array(this._frames.length).fill(t);
        }
        else if(!this.__isList(t)) throw new P5GIFError('Cannot pass in a non-array.');
        for (let i = 0; i < this._frames.length; i++) {
            let _t = parseInt(t[i]);
            if (!_t || _t < 10) continue;
            else this._gifConfig.delay[i] = _t;
        }
        return this._gifConfig.delay;
    }
    setDelayOf(index, value) {
        index = parseInt(index);
        if (Number.isNaN(index) || index < 0 || index >= this._frames.length) throw new P5GIFError('The index is invalid');
        let _value = parseInt(value);
        if (!_value || _value < 10) _value = this._gifConfig.delay[index];
        this._gifConfig.delay[index] = _value;
        return _value;
    } 
    get delay() { this.__checkLoading(); return this._gifConfig.delay; }


    _gifConfig = {
        repeat: true,
        delay: [] //describe delay for every frame
    }

    /** 
    * @param {URI} sourceGif it could be gifUrl or a list of p5Image
    * @param {Object} gifConfig dict contains gif related configuration, ie. size, quality
    * @param {function} callback for finishing loading gif
    * @returns {Gif} 
    */
    constructor(sourceGif, gifConfig=null) {

        // check type of config
        if (gifConfig && typeof gifConfig !== 'object') throw new P5GIFError("Config can only be an object.");
        this._gifConfig = Object.assign(this._gifConfig, gifConfig);

        // check type of callback
        let callback = (gifConfig || {}).onPrepare || null;
        if (callback && typeof callback !== 'function') throw new P5GIFError("onPrepare can only be a function.");

        if (typeof sourceGif === 'string' && sourceGif.length) {
            this.__loadGif(sourceGif);
        }
        // check if sourceGif contains p5Image
        else if (this.__isList(sourceGif) && this.__checkFrames(sourceGif)) {
            this.__loadGifFromList(sourceGif);
        }
        else if (this.__isList(sourceGif)) {
            this._frames = this.__pixel2Iamge(sourceGif);
        }
        else throw new P5GIFError('Wrong type of sourceGif.');
        // register p5Image functions
        this.__register('filter');
        this.__register('blend');
        this.__register('mask');
    }
    
    /**
     * 
     * @param {int} width resized width 
     * @param {int} height height 
     */
    resize(width, height) {
        this._gifConfig = Object.assign(this._gifConfig, {width, height});
        return this;
    }

    /**
     * 
     * @param {string}  name the name you want to save as
     */
    async download(name='default.gif', setting={}){
        let data = []
        let gif = new GIFEncoder(this.width, this.height);
        gif.on('data', (buf) => {data.push(buf)})
        gif.writeHeader();
        let repeat = setting.repeat || false;
        gif.setRepeat(repeat ? 0 : -1);
        console.log(`%c You got ${this.frames.length} in total.`, 'background: #222; color:  #bada55');
        this.frames.forEach((frame, index) => {
            if (((100*index/this.frames.length)%10) === 0) {
                console.log(`%c ${index} frames have been processed, ${100*index/this.frames.length}%`, 'background: #222; color:  #bada55');
            }
            frame.loadPixels();
            gif.addFrame(frame.pixels);
        })
        gif.finish();
        console.log(`%c Frames are all dumped, download will start soon.`, 'background: #222; color: #bada55');
        let binData = data.reduce((prev, curr) => (this.__appendBuffer(prev, curr)), new ArrayBuffer(0))
        let gifData = new Blob([binData], {"type": "image/gif"})
        let downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(gifData);
        downloadLink.download = name;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        let tempTimer = setTimeout(() => {
            document.body.removeChild(downloadLink)
            clearTimeout(tempTimer);
        }, 100);
    }

    /**
     * 
     * @param {int} index Which index you want to set 
     * @param {p5.Image} frame the gif frame you want to set
     * @returns {Gif} 
     */
    setFrame(index, frame){
        if (index < 0 || index >= this.frames.length) throw new P5GIFError("Wrong value of index");
        else if (! (frame instanceof p5.Image)) throw new P5GIFError("Wrong frame type, it should be p5.Image");
        
        this._frames[index] = frame;
        this.setDelayOf(index, 100);
        return this
    }

    /**
     * 
     * @param {number} index The start index  
     * @param {Array} frames Frames you want to insert
     * @param {function} Iterator Optional, can replace your customized iterator for inseration. 
     * @returns {Gif}
     */
    insertFrames(index, frames, iterator=null) {
        if (iterator != null) {
            if (typeof iterator != 'function') throw new P5GIFError('Iterator should be a function'); 
            else iterator.call(this._frames);  
        } else {
            let framesReversed = frames.reverse();
            for (let i = 0; i < this.framesReversed.length; i++) {
                if(i >= index && framesReversed.length !== 0) {
                    this._frames[i] = framesReversed.pop();
                }
            }
        }
        return this;
    }

    /**
     * 
     * @param {start} start index for the range(Inclued)
     * @param {end} end index for range (Not inclued) 
     * @param {step} step 
     * @return {[p5.Image]}
     */
    range(start=0, end=this._frames.length, step=1) {
        let framesList = []
        if (start < 0 || start >= this._frames.length || end <= 0 || end > this._frames.length) throw new P5GIFError("Wrong end, start value");
        if (end < start && step > 0) throw new P5GIFError('end should bigger than start, if step is positive');

        for (let i = start; i < end; i+=step) {
            framesList.push(this.frames[i]);
        }
        return new Gif(framesList, this._gifConfig);
    }
    
    /**
     *  Display the gif
     * @param {x} x position for your gif display(0 By default) 
     * @param {y} y position for your gif display (0 By default)
     */
    draw(x=0, y=0) {
        if (!this._frames) throw new P5GIFError("should put frames first");
        p5.image(this._frames[0], x, y);
    }
    /**
     * @param {URL} url describe the gif url
     * @param {function} callbck function for finishing loading gif
     */
    async __loadGif(url) {
        try {
            this._isloading = true;
            let buffer = await this.__fetch(url);
            this._src = url;
            let preframes = this.__decodeGif(buffer);
            this._frames = this.__pixel2Iamge(preframes);
            this._isloading = false;
            this._gifConfig.onPrepare && Routine.Task(this._gifConfig.onPrepare, this)();
        } catch(err) {
            this._isloading = false;
            throw err;
        }
    }

    __decodeGif(buffer) {
        // do something with the frame data
        let gif = new Gifuct(buffer);
        let preframes = gif.decompressFrames(true);
        return preframes;
    }

    /**
     * function to download file remotely
     * @param {String} url 
     * @returns {Promise}
     */
    __fetch(url) {
        return new Promise((resolve, reject) => {
            var ajax = new XMLHttpRequest();
                ajax.responseType = 'arraybuffer';
                ajax.onload = function (e) {
                    if( e.target.status >= 200 && e.target.status < 300 ) { resolve(ajax.response); }
                    else { reject(new P5GIFError('Fetch from internet failure.', e.target.status)) }
                };
                ajax.open('GET', url, true);
                ajax.send();
                ajax.onerror = function (e) { reject(e); };
        });
    }

    /**
     * convey pixels in gif to p5Image
     * @param {Array} preframes all frames in array
     * @returns {Array} frames call frames that are produced to p5Image
     */    
    __pixel2Iamge(preframes) {
        let frames = [];
        let _width = 0, _height = 0;
        preframes.forEach(frame => {
            this._gifConfig.delay.push(frame.delay);

            let {width, height} = frame.dims;
            _width = Math.max(_width, width);
            _height = Math.max(_height, height);

            let pixels = frame.patch;
            //create image from pixel array
            let tempIamge = createImage(width, height);
            tempIamge.loadPixels();
            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    let cursor = y * width*4 + 4*x;
                    tempIamge.set(x, y, color(pixels[cursor], pixels[cursor+1], pixels[cursor+2], pixels[cursor+3]));
                }
            }
            tempIamge.updatePixels();
            frames.push(tempIamge);
        });

        this._gifConfig = Object.assign(this._gifConfig, {width: _width, height: _height});
        return frames;
    }

    /**
     * Check if the object is an array (or can be iterated)
     * @param {Object} obj 
     */
    __isList(obj) {
        return Array.isArray(obj); // Using Built-in Array Class to Check
    }
    
    /**
     * Only keep iterative items from an array object
     * @param {Array} arr 
     */
    __loadGifFromList(arr) {
        this._frames = Array.from(arr);
        this._src = null;
        this._isloading = false;
        this.delay = 100;
        this._gifConfig.onPrepare && Routine.Task(this._gifConfig.onPrepare, this)();
    }

    __checkFrames(arr) {
        if (!arr || !arr.forEach) {
            P5GIFError.throw('Cannot construct P5GIF from non-array object.');
            return false;
        }
        for (let item of arr) {
            if (!(item instanceof p5.Image)) return false; //P5GIFError.throw('Elements of constructor array should be p5.Image objects.');
        }
        return true;
    }

    __checkLoading() {
        if (this._isloading || !this._frames || !this._frames.length) throw new P5GIFError('Gif has not been prepared yet.', 1);
        return true;
    }

    __appendBuffer = function(buffer1, buffer2) {
        let tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
        tmp.set(new Uint8Array(buffer1), 0);
        tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
        return tmp.buffer;
      };

    /**
     * Controller of the gif
     */
    __currentController = null;
    get __controller() {

        // check if the gif is loaded, or if the controller exists
        this.__checkLoading();
        if (this.__currentController) return this.__currentController;

        // initialize controller
        let index = 0;
        let defaultConf = {
            x:0, y:0, width: this._gifConfig.width || 0, height: this._gifConfig.height || 0, clear: true
        };

        // play routine loop
        let playRoutine = Routine.Routine(async () => {
            let {x, y} = defaultConf;
            let {width, height} = this._gifConfig;
            let clear = this._gifConfig.clear || true;
            if (clear && window.push && window.noStroke && window.fill && window.rect && window.pop) {
                window.push();
                window.noStroke();
                window.fill(255, 255, 255);
                window.rect(x, y, width, height);
                window.pop();
            }
            image(this._frames[index++], x, y, width, height);
            if (index >= this._frames.length) {
                index = 0;
                if (!this._gifConfig.repeat) playRoutine.stop();
            }
            return this._gifConfig.delay && this._gifConfig.delay[index] || 100;
        }, { infinite: true });

        // controllers
        const loop = (_defaultConf=null) => {
            if (defaultConf) defaultConf = Object.assign(defaultConf, _defaultConf);
            this._gifConfig.repeat = true;
            playRoutine.start();
        }
        const play = (_defaultConf=null) => {
            if (defaultConf) defaultConf = Object.assign(defaultConf, _defaultConf);
            playRoutine.start();
        }
        const next = () => { playRoutine.next(); }
        const pause = () => { playRoutine.pause(); }

        return this.__currentController = { 
            get loop() {return loop}, 
            get play() {return play},
            get next() {return next},
            get pause() {return pause},
            get state() {return playRoutine.state},
            get index() {return index}
        };

    }

    get play() { return this.__controller && this.__controller.play; }
    get loop() { return this.__controller && this.__controller.loop; }
    get next() { return this.__controller && this.__controller.next; }
    get pause() { return this.__controller && this.__controller.pause; }

    __register(func, name=null) {
        this[name || func] = function (...args) {
            if (!this.frames || typeof this.frames[0][func] !== 'function') throw new P5GIFError('cannot execute ' + func);
            this.frames.forEach(frame => {
                frame[func].apply(frame, args)
            });
        }
    }
}
