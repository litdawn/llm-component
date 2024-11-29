// @ts-ignore
import React from "react";
//@ts-ignore
import SideBar from "./sideBar/sideBar.tsx";
import "./fullPage.less"
// @ts-ignore
import UpBar from "./upBar/upBar.tsx";
// @ts-ignore
import ChatShow from "./chatShow/chatShow.tsx";
// @ts-ignore
import FullInput from "./input/fullInput.tsx";
import {connect} from "react-redux";

interface FullPageProps{
    messages: Array<Object>
}
const FullPage:React.FC = (props:FullPageProps) => {

    // console.log("fullpages", props.messages)
    return (
        <>
            <div className={"full-page"}>
                <div className={"side-bar"}>
                    <SideBar></SideBar>
                </div>

                <div className={"container"}>
                    <div className={"up-bar"}>
                        <UpBar></UpBar>
                    </div>

                    <div className={"content"}>
                        {
                            props.messages.map((value) => {
                                return (
                                    <div key={value["id"]} className={"chat-show"}>
                                        <ChatShow content={value["content"]}></ChatShow>
                                    </div>
                                )
                            })
                        }

                    </div>
                    <div className={"full-input"}>
                        <FullInput/>
                    </div>
                </div>
            </div>
        </>
    )
}

const state2Props = (state)=>{
    return {messages: state.conversations[state.active]["chat_list"]}
}

export default connect(state2Props)(FullPage)
