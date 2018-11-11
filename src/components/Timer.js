import {TimerError} from "./Error.js";

export default class Timer {

    /**
     * playing states for js routine
     */
    static ROUTINE_STATE = {
        STOP: -1,
        START: 1,
        PAUSE: 0,
        TERMINATED: -2,
    };

    /**
     * await Timer.Await(some_time) to sleep current routine for some time.
     * @param {Number} time miniseconds to sleep
     */
    static Await(time=0) {
        if (!(time = parseInt(time))) return null;
        if (time <= 0) return null;
        return new Promise((resolve) => setTimeout(resolve, time));        
    }

    /**
     * construct a new routine
     * @param {Function} fn callback function on each tick, as (currentTickIndex: Number) => AwaitingTimeTillNextTick: Number
     * @param {Object} param1 
     * @returns {Routine} { start(), pause(), stop(), terminate(), state, tick }
     */
    static Routine(fn, {defaultTick=100} = {}) {

        // check callback IS a callable
        if (!fn || !fn.call) return null;

        // initialize routine
        let tick = 0;
        let state = Timer.ROUTINE_STATE.STOP;
        let _currentRoutine = {};
        
        // eternal routine, unless terminated
        const routine = async () => {
            while(state !== Timer.ROUTINE_STATE.TERMINATED) {

                // get sleep interval time from callback function
                let nextTick = defaultTick;
                try {
                    nextTick = state !== Timer.ROUTINE_STATE.START ?
                                defaultTick :
                                await fn.call(_currentRoutine, tick) || defaultTick;
                } catch(e) { console.error(e); }

                // add tick counter
                tick += 1;

                // interval time cannot be less than 10ms
                await Timer.Await(Math.max(10, nextTick));
            }
        }
        routine();

        // controller functions
        const start = () => { state = Timer.ROUTINE_STATE.START; };
        const stop = () => { state = Timer.ROUTINE_STATE.STOP; tick = 0; };
        const pause = () => { state = Timer.ROUTINE_STATE.PAUSE; };
        const terminate = () => { state = Timer.ROUTINE_STATE.TERMINATED; };

        // check if the routine is terminated before each call
        const check = (_fn) => () => {
            if (state === Timer.ROUTINE_STATE.TERMINATED) throw new TimerError("Cannot operate on a terminated routine.", 0);
            if (_fn && _fn.call) return _fn.call(_fn);
            else return _fn;
        }

        // return routine instance
        return _currentRoutine = {
            get start() {return check(start)},
            get pause() {return check(pause)},
            get stop() {return check(stop)},
            get terminate() {return check(terminate)},
            get state() {return state},
            get tick() {return check(tick)}
        }

    }

}