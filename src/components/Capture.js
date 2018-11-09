/**
 * This file defines interface of Capture class
 */

class Capture {

    /**
     * default configuration
     */
    settings = {}

    /**
     * Capture Constructor
     * @param {object} config Config to initialize Capture instance
     */
    constructor(config) {}
    
    /**
     * Start to capture
     */
    start() {}

    /**
     * Pause to capture
     */
    pause() {}

    /**
     * Resume to capture
     */
    resume() {}

    /**
     * Stop capturing
     */
    stop() {}

    /**
     * Auto stop capturing when meet some conditions
     * @param {object} config Stop Capturing Conditions
     */
    stopAfter(config) {}

    /**
     * Save current captured data and return Gif instance
     * @returns {p5Gif.Gif} Gif instance
     */
    save() {}

}