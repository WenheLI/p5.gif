/**
 * This file defines interface of p5Gif static functions
 */

const p5Gif = {

    /**
     * module defined classes
     */
    Gif: null,
    Capture: null,

    /**
     * Static method of loading gif into Gif instance
     * @param   {Any}       args Any types passed to Gif constructor
     * @returns {p5Gif.Gif}      Gif instance
     */
    loadGif(...args) {
        return null;
    },
    
    /**
     * Static method of initializing Capture instance 
     * @param   {object}        config Config to initialize Capture instance
     * @returns {p5Gif.Capture}        Capture instance
     */
    capture(config={}) {
        return null;
    }

}

module.exports = p5Gif;