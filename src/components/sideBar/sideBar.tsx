import './sideBar.less'
// @ts-ignore
import store from "../../store/index.ts";
// @ts-ignore
import React from "react";
import {Button} from "antd";
// @ts-ignore
import {create_conversation} from "../input/search.ts";
import {connect} from "react-redux";

interface SideBarProps {
    themes
}

const SideBar: React.FC = (props: SideBarProps) => {
    const state = store.getState()

    return (
        <>
            <div className={"side-bar"}>
                <div style={{marginTop: "3vh"}}>chat-bot</div>
                <div className={"start"}>
                    <Button style={{color: "white"}}
                            type={"text"} onClick={create_conversation}>开启一个新会话</Button>
                </div>
                <div className={"chat-list"}>
                    {props.themes.list.map((item, index) => {
                        return (
                            <div className={"chat-item"} key={item.id}>{item.theme}</div>
                        )
                    })}
                </div>
                <div className="this-chat">
                    {state.chat_id}
                </div>
            </div>
        </>
    )

}

const state2props = (state) => {
    const themes = {
        active: state.active,
        list: []
    }
    const ids = Object.keys(state.conversations)
    themes.list = ids.map((item) => {
        return {
            id: item,
            theme: state.conversations[item].theme
        }
    })
    return {themes}
}
export default connect(state2props)(SideBar)