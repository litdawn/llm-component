//@ts-ignore
import React, {useState} from "react";
import {Button} from "antd";
import {CopyOutlined} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter"

interface RichTextProps {
    content: string
}

interface content {
    type: string,// text, bold,
    text: string
}

interface renderCodeProps {
    // type: string//javascript,c++....
    code: string
}

const RichText: React.FC = (props: RichTextProps) => {
    const [text, setText] = useState("");
    const handle = () => {
        // props.content
    }
    const renderCode: React.FC = (props: renderCodeProps) => {
        const copy2clipboard = () => {
            const clipboardObj = navigator.clipboard;
            clipboardObj.writeText(props.code)
        }
        return (
            <>
                <div id={"code"}>
                    <div className={"tool-bar"} style={{float:"right", marginLeft:"1vh"}}>
                        <Button type="primary" icon={<CopyOutlined/>} onClick={copy2clipboard}></Button>
                    </div>
                </div>
            </>
        )
    }
    const renderOther: React.FC = (content) => {
        return (
            <>
            </>
        )
    }
    return (
        <>
            <div id={"rich-text"}>
                <ReactMarkdown
                    components={{
                        code(props) {
                            const {children, className, node, ...rest} = props
                            const match = /language-(\w+)/.exec(className || '')
                            return match ? (
                                <>
                                    {renderCode({code:String(children).replace(/\n$/, '')})}
                                    <SyntaxHighlighter
                                        {...rest}
                                        PreTag="div"
                                        children={String(children).replace(/\n$/, '')}
                                        language={match[1]}
                                    />
                                </>
                            ) : (
                                <>
                                    <code {...rest} className={className}>
                                        {children}
                                    </code>
                                </>
                            )
                        }
                    }}
                >
                    {props.content}
                </ReactMarkdown>
            </div>
        </>
    )
}

export default RichText;