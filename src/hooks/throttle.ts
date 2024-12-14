function useThrottle(func, time) {
    let timer;
    return ()=> {
        if (!timer) {
            timer = setTimeout(() => {
                func.apply()
                timer = null;
            }, time)
        }
    }
}

function useDebounce(func, time) {
    let timer;
    return ()=> {
        timer = setTimeout(() => {
            func.apply()
            timer = null;
        }, time)
    }
}