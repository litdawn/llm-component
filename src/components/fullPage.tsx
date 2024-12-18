// @ts-ignore
import React, {useEffect, useRef} from "react";
//@ts-ignore
import SideBar from "./sideBar/sideBar.tsx";
import "./fullPage.less"
// @ts-ignore
import UpBar from "./upBar/upBar.tsx";
// @ts-ignore
import ChatShow from "./chatShow/chatShow.tsx";
// @ts-ignore
import FullInput from "./input/fullInput.tsx";
//@ts-ignore
import useScroll from "../hooks/useScroll.ts";
import {connect} from "react-redux";
//@ts-ignore
import {useVirtual} from "../hooks/virtualList.ts";
import {FloatButton} from "antd";
import {DownOutlined} from "@ant-design/icons"
//@ts-ignore
import {wsConstructor} from "../utils/ws.ts"


interface FullPageProps {
    messages: Array<Object>
}

const FullPage: React.FC = (props: FullPageProps) => {
    const content_ref = useRef(null)
    // const [view_list, padding] = useVirtual(listRef, props.messages, false)
    // useEffect(() => {
    const [view_list, padding] = useVirtual(content_ref, props.messages, false)
    const scroll = useScroll(content_ref);

    const scroll2end = () => {
        // let dom = document.documentElement;
        const dom = content_ref.current;
        // window.scrollTo({ behavior: 'smooth', top: dom.scrollHeight });
        dom.setAttribute("stick2end","true")
        dom.scrollTo({behavior: 'smooth', top: dom.scrollHeight});
    }
    useEffect(() => {
        const ws:WebSocket = wsConstructor('ws://localhost:2000/ws/chat',(msg)=>{
            console.log("msg",msg)
        },"key");

    }, []);

    return (
        <>
            {/*<FloatButton.BackTop />*/}
            <div id={"full-page"}>
                <div className={"side-bar"}>
                    <SideBar></SideBar>
                </div>

                <div className={"container"}>
                    <div className={"up-bar"}>
                        <UpBar></UpBar>
                    </div>

                    <div ref={content_ref} className={"content"}>
                        {
                            view_list.map((value) => {
                                return (
                                    <div key={value["id"]} className={`chat-show virtual-item ${value["type"]}`}>
                                        <ChatShow content={value["content"]} type={value["type"]}/>
                                    </div>
                                )
                            })
                            // view_list.map((value) => {
                            //     return (
                            //         <div key={0} className={"chat-show virtual-item"}>
                            //             <ChatShow type={"assistant"} content={value}/>
                            //         </div>
                            //     )
                            // })
                        }

                    </div>
                    <div className={"full-input"}>
                        <FullInput/>
                    </div>
                </div>
                <div className={"float"}>
                    <FloatButton icon={<DownOutlined/>} onClick={scroll2end}/>
                </div>
            </div>
        </>
    )
}

const state2Props = (state) => {
    return {messages: state.conversations[state.active]["chat_list"]}
}

export default connect(state2Props)(FullPage)
