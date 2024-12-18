import { useState, useEffect } from 'react';

// 获取横向，纵向滚动条位置
const getPosition = (ref) => {
    return {
        x: ref.current.scrollLeft,
        y: ref.current.scrollTop,
    };
};
const useScroll = (ref) => {
    // 定一个 position 这个 state 保存滚动条位置
    const [position, setPosition] = useState([0,0]);
    useEffect(() => {
        const handler = () => {
            //@ts-ignore
            setPosition(getPosition(ref));
        };
        // 监听 scroll 事件，更新滚动条位置
        document.addEventListener("scroll", handler);
        return () => {
            // 组件销毁时，取消事件监听
            document.removeEventListener("scroll", handler);
        };
    }, []);
    return position;
};

export default useScroll;