class Gif {
    /** 
    This is the interface for GIf objec related methods
    */
    
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
    
    
}