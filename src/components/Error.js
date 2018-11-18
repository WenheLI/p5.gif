export default class P5GIFError extends Error {

    constructor(msg='Unexpected Error!', code=0) {
        super(msg);
        this.msg  = msg;
        this.code = code;
    }

    toString() {
        return `[P5Gif] Error: ${this.code}\n${this.msg}`;
    }

    // print error into console
    log() {
        console.error(this.toString());
        return this;
    }

    /**
     * another way to build Error, support avoiding throw yet just print
     * @param {String} msg Error message
     * @param {Number} code Error code
     * @param {Boolean} _throw print to console only or throw
     */
    static throw(msg='', code=0, _throw=false) {
        if (_throw) throw new P5GIFError(msg, code);
        else return new P5GIFError(msg, code).log();
    }

}

export class TimerError extends P5GIFError {
    
    toString() {
        return `[Timer] Error: ${this.code}\n${this.msg}`;
    }

}
