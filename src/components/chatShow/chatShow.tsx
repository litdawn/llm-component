// @ts-ignore
import React from "react";
import {store} from "../../store";
// import {MarkdownIt} from "Ma"
import "./chatShow.less"
import {Button} from "antd";
import {CopyOutlined} from '@ant-design/icons';
// @ts-ignore
import RichText from "./richText/richText.tsx";
/*
  显示字符的
 */

// const md :MarkdownIt = MarkdownIt()
interface ChatShowProps {
    type: string // assistant & user
    content: string // 内容
}

function ChatShow(props: ChatShowProps) {
    const copy2clipboard = () => {
        const clipboardObj = navigator.clipboard;
        clipboardObj.writeText(props.content)
    }


    return (
        <>
            <div id={"chat-show"}>
                <div className={"content"}>
                    <RichText content={props.content}></RichText>
                    {/*{props.content}*/}
                </div>
                {
                    props.type == "assistant"
                    &&
                  <div className={"tool-bar"}>
                    <Button style={{color:"bisque"}} type="primary" icon={<CopyOutlined/>} onClick={copy2clipboard}></Button>
                  </div>
                }

            </div>
        </>

    )
}

export default ChatShow