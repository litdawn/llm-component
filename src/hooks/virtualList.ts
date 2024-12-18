import {useEffect, useState} from 'react';

/**
 * useVirtual：一个虚拟滚动的 hook，用于优化长列表的渲染性能。
 *
 * @param {object} listRef 列表的引用对象
 * @param {Array} list 初始列表数据
 * @param {boolean} isFullScreen 是否全屏显示
 * @returns {Array} 显示在视图中的列表数据和 padding 样式
 */
export const useVirtual = (listRef, list, stick2end=false) => {
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
        const stick2end = listRef.current.getAttribute("stick2end")==="true";
        if(!stick2end) {
            update();
        }else{
            toEnd();
            listRef.current.setAttribute("stick2end","false");
        }

    }, [startIndex]);

    function init(ref) {
        initData(ref.current);
        render(startIndex, dur + 1);
        eventBind(ref.current);
    }

    function initData(dom) {
        const target = dom;
        viewHeight = target.parentNode.offsetHeight;
        // itemHeight = target.getElementsByClassName('virtual-item')[0].offsetHeight;
        itemHeight = 100;
        dur = Math.floor(viewHeight / itemHeight);
    }

    function eventBind(dom) {
        dom.addEventListener('scroll', handleScroll, false);
    }

    function render(startIndex, endIndex) {
        setViewList(() => origin.slice(startIndex, endIndex));
        setEndIndex(() => startIndex + dur + 1);
    }

    function handleScroll(e) {
        e.stopPropagation();
        // let scrollTop = e.target.scrollTop;
        // let clientHeight = e.target.clientHeight;
        // let scrollHeight = e.target.scrollHeight;
        //
        // // 打印数值
        // console.table([
        //     {
        //         label: "距顶部",
        //         value: scrollTop,
        //     },
        //     {
        //         label: "可视区高度",
        //         value: clientHeight,
        //     },
        //     {
        //         label: "滚动条总高度",
        //         value: scrollHeight,
        //     },
        //     {
        //         label: "距顶部 + 可视区高度",
        //         value: scrollTop + clientHeight,
        //     }, {
        //         label: "startIndex",
        //         value: Math.floor(e.target.scrollTop / itemHeight)
        //     },
        // ]);
        const target = e.target;
        setStartIndex(() => Math.floor(target.scrollTop / itemHeight));
    }

    function update() {
        if (startIndex >= list.length - dur - 1) return;
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

    function toEnd() {
        setEndIndex(() => list.length - 1);
        setStartIndex(() => list.length - 1 - dur)
        render(startIndex, endIndex);
    }

    return [viewList, padding];
};
