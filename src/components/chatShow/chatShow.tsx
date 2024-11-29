// @ts-ignore
import React from "react";
import {store} from "../../store";
// import {MarkdownIt} from "Ma"
import "./chatShow.less"
/*
  显示字符的
 */
// const md :MarkdownIt = MarkdownIt()
interface ChatShowProps{
    content
}
function ChatShow(props:ChatShowProps){


    return(
        <>
            <div id={"chat-show"}>
                    {props.content}

            </div>
        </>

    )
}

export default ChatShow