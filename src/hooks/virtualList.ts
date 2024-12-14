import { useEffect, useState } from 'react';

/**
 * useVirtual：一个虚拟滚动的 hook，用于优化长列表的渲染性能。
 *
 * @param {object} listRef 列表的引用对象
 * @param {Array} list 初始列表数据
 * @param {boolean} isFullScreen 是否全屏显示
 * @returns {Array} 显示在视图中的列表数据和 padding 样式
 */
export const useVirtual = (listRef, list, isFullScreen) => {
    const origin = list;
    let viewHeight = null;
    let itemHeight = 0;
    let dur = 0;
    const rootFontSize = parseInt(document.documentElement.style.fontSize);

    const [viewList, setViewList] = useState(list);
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(0);
    const [padding, setPadding] = useState({
        paddingTop: 0,
        paddingBottom: 0,
    });

    useEffect(() => {
        init(listRef);
    }, []);

    useEffect(() => {
        initData(listRef.current);
        update();
    }, [startIndex]);

    function init(ref) {
        initData(ref.current);
        render(startIndex, dur + 1);
        eventBind(ref.current);
    }

    function initData(dom) {
        const target = isFullScreen ? document.documentElement : dom;
        viewHeight = isFullScreen ? target.offsetHeight : target.parentNode.offsetHeight;
        itemHeight = target.getElementsByClassName('virtual-item')[0].offsetHeight;
        dur = Math.floor(viewHeight / itemHeight);
    }

    function eventBind(dom) {
        const eventTarget = isFullScreen ? window : dom.parentNode;
        eventTarget.addEventListener('scroll', handleScroll, false);
    }

    function render(startIndex, endIndex) {
        setViewList(() => origin.slice(startIndex, endIndex));
        setEndIndex(() => startIndex + dur + 1);
    }

    function handleScroll(e) {
        e.stopPropagation();
        const target = isFullScreen ? document.documentElement : listRef.current.parentNode;
        setStartIndex(() => Math.floor(target.scrollTop / itemHeight));
    }

    function update() {
        if (startIndex === endIndex) return;
        setEndIndex(() => startIndex + dur);
        render(startIndex, endIndex);
        setPadding(() => {
            return {
                paddingTop: (startIndex * itemHeight) / rootFontSize,
                paddingBottom: ((origin.length - endIndex) * itemHeight) / rootFontSize,
            };
        });
    }

    return [viewList, padding];
};