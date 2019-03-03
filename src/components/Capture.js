/**
 * This file defines interface of Capture class
 */
import P5GIFError from './Error.js';
import Gif from './Gif.js';
import { Routine } from '@nhibiki/js-routine';

export default class Capture {

    /**
     * default configuration
     */
    settings = {
        canvas: "defaultCanvas0",
        context: null,
        top: 0,
        left: 0,
        width: -1, 
        height: -1,
        framerate: 10,
        repeat: false,
        webgl: false
    };
    config = {};
    frames = [];
    recordRoutine = null;
    oriDensity = 1;
    
    get isRecording() {
        return this.recordRoutine ? this.recordRoutine.state === 1 : false;
    }

    get delay() {
        return Math.max(parseInt(1000 / this.settings.framerate, 10), 30); //limit the framerate below 30
    }

    /**
     * Capture Constructor
     * @param {object} config Config to initialize Capture instance
     */
    constructor(config) {
        this.settings = Object.assign(this.settings, config);
        this.settings.canvas = document.getElementById(`${this.settings.canvas}`) || window.canvas;
        if (!this.settings.canvas) throw P5GIFError("cannot find such canvas");
        if (this.settings.width < 0 || this.settings.width > this.settings.canvas.width) this.settings.width = this.settings.canvas.width;
        if (this.settings.height < 0 || this.settings.height > this.settings.canvas.height) this.settings.height = this.settings.canvas.height;
        if (this.settings.framerate > 30) this.settings.framerate = 30;
        this.settings.context = this.settings.webgl ?  this.settings.canvas.getContext("webgl") : this.settings.canvas.getContext("2d");
    }
    
    /**
     * Start to capture
     */
    start() {
        this.Density = p5.pixelDensity;
        p5.pixelDensity(1);
        this.recordUntil({});
        return this;
    }

    /**
     * Pause to capture
     */
    pause() {
        this.recordRoutine.pause();
        return this;
    }

    /**
     * Resume to capture
     */
    resume() {
        this.recordRoutine.start();
        return this;
    }

    /**
     * Stop capturing
     */
    stop() {
        p5.pixelDensity(this.oriDensity);
        this.oriDensity = null;
        this.recordRoutine.terminate();
        return this;
    }

    /**
     * Add frame to capture
     */
    addFrame() {
        if (!this.isRecording) {
            this._addFrame();
        } else {
            throw P5GIFError("cannot add frame when recording has started.");
        }
        return this;
    }

    /**
     * Auto stop capturing when meet some conditions
     * @param {object} config Stop Capturing Conditions
     */
    recordUntil(config, fn) {
        if (!this.settings.context) throw P5GIFError("canvas context does not exist");

        let stopAfterFrame = -1;
        if (config.frame && config.frame >= 1) stopAfterFrame = parseInt(config.frame, 10);

        let stopAfterMilliSecond = -1;
        if (config.milliSecond && config.milliSecond >= 1) stopAfterMilliSecond = parseInt(config.milliSecond, 10);
        else if (config.second && config.second >= 0.001) stopAfterMilliSecond = parseInt(config.second * 1000, 10);
        else if (config.minute && config.minute >= 0.001) stopAfterMilliSecond = parseInt(config.second * 1000 * 60, 10);

        this.frames = [];
        
        let that = this;
        this.recordRoutine = Routine.Routine(async function() {
            if (stopAfterFrame > 0 && this.tick > stopAfterFrame) {
                this.terminate();
                fn && fn.call(that);
            }
            else if (stopAfterMilliSecond > 0 && this.lasts > stopAfterMilliSecond) {
                this.terminate();
                fn && fn.call(that);
            }
            if (stopAfterFrame <= 0 || stopAfterFrame > that.frames.length) {
                let pixels = null;
                that._addFrame();
                that.frames.push(pixels);
            }
        }, { 
            tickIntv: that.delay, 
            infinite: true
        }).start();
        return this;
    }

    _addFrame() {
        let {left, top, width, height} = this.settings;
        let pixels = null;
        if (this.settings.webgl) {
            let gl = this.settings.context;
            pixels = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
            gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        } else pixels = this.settings.context.getImageData(left, top, width, height).data;
        this.frames.push(pixels);
    }

    /**
     * Save current captured data and return Gif instance
     * @returns {p5Gif.Gif} Gif instance
     */
    async export(fn) {
        if (this.frames && this.frames.length) {
            let newGif = new Gif(this.frames.map(f => ({
                delay: this.delay,
                dims: {width: this.settings.width, height: this.settings.height},
                patch: f
            })));
            Routine.Task(async function () {
                fn && fn.call(this, newGif);
            }, this)();
            return newGif;
        } else {
            Routine.Task(async function () {
                fn && fn.call(this, null);
            }, this)();
            return null;
        }
    }

    async download(fileName="default.gif") {
        console.log(`%c Gif download strats, your browser may lock up for sometime!`, 'background: #222; color:  #bada55');
        let newGif = await this.export();
        if (typeof fileName === "string"){
            newGif.download(fileName, this.settings);
        }
    }

}
