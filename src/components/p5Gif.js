/**
 * This file defines interface of p5Gif static functions
 */
import Gif from './Gif.js';
import Capture from './Capture.js';

export default class p5Gif {

    /**
     * module defined classes
     */
    static Gif = Gif;
    static Capture = Capture;

    /**
     * Static method of loading gif into Gif instance
     * @param   {Any}       args Any types passed to Gif constructor
     * @returns {p5Gif.Gif}      Gif instance
     */
    static loadGif(...args) {
        return null;
    }
    
    /**
     * Static method of initializing Capture instance 
     * @param   {object}        config Config to initialize Capture instance
     * @returns {p5Gif.Capture}        Capture instance
     */
    static capture(config={}) {
        return null;
    }

}