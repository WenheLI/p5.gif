import Gifuct from "../../lib/gif/gif";

export default class Gif {
    /** 
    This is the interface for GIf objec related methods
    */

    /**
     * Decode Credit to https://stackoverflow.com/questions/48234696/how-to-put-a-gif-with-canvas
     */
    
    _src = ""; // String: Source URI
    _isloading = false; // Boolean: is loading gif or pictures
    
    _frames = []; //p5Image{}[]

    _gitConfig = {
        delay: [] //describe delay for every frame
    }

    /** 
    * @param {URI} sourceGif it could be gifUrl or a list of p5Image
    * @param {Object} gifConfig dict contains gif related configuration, ie. size, quality
    * @returns {Gif} 
    */
    constructor(sourceGif, gifConfig={}) {
       
        if (typeof sourceGif === "string" && sourceGif.length != 0) {
            this._src = sourceGif;
            this.__loadGif(this._src);
        }
        //TODO check if sourceGif contains p5Image
        else if (this.__isList(sourceGif) && sourceGif[0]) {
            this._src = "";// local file location?
            this._frames = sourceGif;
        }
        else throw new Error("Wrong type of sourceGif")
        this._gitConfig = {
            ... gifConfig,
            ... this._gitConfig
        }
    }
    
    /**
     * 
     * @param {int} width resized width 
     * @param {int} height height 
     */
    resize(width, height){}

    /**
     * 
     * @param {name} the name you want to save as
     */
    download(name=""){}

    /**
     * @returns {frames} A set of frames in gif
     */
    frames(){}

    /**
     * 
     * @param {index} Which index you want to set 
     * @param {frame} the gif frame you want to set
     * @returns {Gif} 
     */
    setFrame(index, frame){}

    /**
     * 
     * @param {index} The start index  
     * @param {frames} Frames you want to insert
     * @param {Iterator} Optional, can replace your customized iterator for inseration. 
     * @returns {Gif}
     */
    insertFrames(index, frames, iterator=null) {}

    /**
     * 
     * @param {start} start index for the range(Inclued)
     * @param {end} end index for range (Not inclued) 
     * @param {step} step 
     * @return {[Gif]}
     */
    range(start, end, step=1) {}
    
    /**
     * 
     * @param {x} x position for your gif display(0 By default) 
     * @param {y} y position for your gif display (0 By default)
     */
    display(x=0, y=0) {}
    
    async __loadGif(url) {
        try {
            this._isloading = true;
            let buffer = await this.__fetch(url);
            this._src = url;
            let preframes = this.__decodeGif(buffer);
            this._frames = this.__pixel2Iamge(preframes);
            this._isloading = false;
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
                ajax.responseType = "arraybuffer";
                ajax.onload = function (e) {
                    if( e.target.status >= 200 && e.target.status < 300 ) { resolve(ajax.response); }
                    else { reject(new Error("Unexcepted Response Code: " + e.target.status)) }
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
        let frames = []
        preframes.forEach(frame => {
            this._gitConfig.delay.push(frame.delay);
            let {width, height} = frame.dims;
            let pixels = frame.pixels;
            //create image from pixel array
            let tempIamge = createImage(width, height);
            tempIamge.loadPixels();
            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    let cursor = y * width + x;
                    tempIamge.set(x, y, color(pixels[cursor]));
                    //let cursor = y * width + 4*x;
                    //tempIamge.set(x, y, color(pixels[cursor], pixels[cursor+1], pixels[cursor+2], pixels[cursor+3]));
                }
            }
            tempIamge.updatePixels();
            frames.push(tempIamge);
        });

        return frames;
    }

    __isList(obj) {
        return Object.prototype.toString.call(obj) === "[object Array]"
    }

    /**
     * Display the gif
     * @param {int} x display position x
     * @param {int} y display position y
     * 
     */
    __play(x, y, width, height) {
        let helper = (index) => {
            let timer = setTimeout(() => {
                image(this._frames[index], x, y);
                clearTimeout(timer);
                index ++;
                if (index < this._frames.length) helper(index+1);
                else helper(0);
            }, this._gitConfig.delay[index])
        }
        helper(0);
    }
    
}