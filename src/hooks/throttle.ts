import { useRef, useState,useEffect } from "react";
//@ts-ignore
import React from "react";

/**
 * useThrottle：一个节流的 hook，用于限制状态更新的频率。
 *
 * @param {any} initialState 初始状态
 * @param {number} delay 节流间隔时间，默认为 5000 ms
 * @returns {any} 节流后的状态
 */
export const useThrottle = (initialState, delay = 5000) => {
    const [state, setState] = useState(initialState);
    const timeout = useRef(null);
    const nextValue = useRef(null);
    const hasNextValue = useRef(false);

    useEffect(() => {
        if (timeout.current) {
            nextValue.current = initialState;
            hasNextValue.current = true;
        } else {
            setState(initialState);
            const timeoutCallback = () => {
                if (hasNextValue.current) {
                    setState(nextValue.current);
                    hasNextValue.current = false;
                }
                timeout.current = undefined;
            };
            timeout.current = setTimeout(timeoutCallback, delay);
        }
        return () => {
            timeout.current && clearTimeout(timeout.current);
        }
    }, [initialState]);

    return state;
};