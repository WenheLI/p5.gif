/**
 * This file defines interface of p5Gif static functions
 */
import Gif from './Gif.js';
import Capture from './Capture.js';

export default class p5Gif {
    
    /**
     * module defined classes
     */
    static get Gif() { p5Gif.checkP5(); return Gif; }
    static get Capture() { p5Gif.checkP5(); return Capture; }

    /**
     * Check if p5 exists
     */
    static checkP5() {
        if (typeof window !== 'undefined' && window.p5 && window.p5.Image && typeof window.p5.Image === 'function') return true;
        throw new Error('p5 is not imported.');
    }

    /**
     * Static method of loading gif into Gif instance
     * @param   {Any}       args Any types passed to Gif constructor
     * @returns {p5Gif.Gif}      Gif instance
     */
    static loadGif(source, ...args) {
        p5Gif.checkP5();
        
        let config = null;
        let callback = null;

        args.forEach(arg => {
            if (!config && typeof arg === 'object') config = arg;
            else if (!callback && typeof arg === 'function') callback = arg;
        });

        return new Gif(source, { ...config, onPrepare: callback || null });
    }

    /**
     * Static method of initializing Capture instance
     * @param   {object}        config Config to initialize Capture instance
     * @returns {p5Gif.Capture}        Capture instance
     */
    static capture(config={}) {
        p5Gif.checkP5();
        return null;
    }

}
