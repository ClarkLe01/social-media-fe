import { useEffect, useRef, useState } from 'react';

const useEffectOnce = (effect) => {
    useEffect(effect, []);
};

const useUnmount = (fn) => {
    const fnRef = useRef(fn);

    // update the ref each render so if it change the newest callback will be invoked
    fnRef.current = fn;

    useEffectOnce(() => () => fnRef.current());
};

const useThrottleFn = (fn, ms = 200, args) => {
    const [ state, setState ] = useState(null);
    const timeout = useRef();
    const nextArgs = useRef();

    useEffect(() => {
        if (!timeout.current) {
            setState(fn(...args));
            const timeoutCallback = () => {
                if (nextArgs.current) {
                    setState(fn(...nextArgs.current));
                    nextArgs.current = undefined;
                    timeout.current = setTimeout(timeoutCallback, ms);
                } else {
                    timeout.current = undefined;
                }
            };
            timeout.current = setTimeout(timeoutCallback, ms);
        } else {
            nextArgs.current = args;
        }
    }, args);

    useUnmount(() => {
        timeout.current && clearTimeout(timeout.current);
    });

    return state;
};

export default useThrottleFn;
