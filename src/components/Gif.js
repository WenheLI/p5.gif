// const Giguct = require("../lib/gifuct-js.js");

class Gif {
    /** 
    This is the interface for GIf objec related methods
    */

    /**
     * Decode Credit to https://stackoverflow.com/questions/48234696/how-to-put-a-gif-with-canvas
     */
    
    _src = ""; // String: Source URI
    _isloading = false; // Boolean: is loading gif or pictures
    
    _frames = []; //p5Image{}[]

    /** 
    * @param {sourceGif} it could be gifUrl or a list of p5Image
    * @param {gifConfig} A dict contains gif related configration, ie. size, quality
    * @returns {Gif} 
    */
    constructor(sourceGif, gifConfig={}) {}
    
    /**
     * 
     * @param {width} resized width 
     * @param {height} resized height 
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
            this._frames = this.__decodeGif(buffer);
            this._isloading = false;
        } catch(err) {
            this._isloading = false;
            throw err;
        }
    }

    async __decodeGif(buffer) {

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
    
}