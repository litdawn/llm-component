//@ts-ignore
import React, {useState} from "react";
import {Button, ConfigProvider} from "antd";
import {createStyles} from "antd-style"
import {CopyOutlined, CheckCircleOutlined} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
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
    type: string//language-javascript....
    code: string
}

const useStyle = createStyles(({prefixCls, css}) => ({
    copyCode: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      border-width: 0;
      &:hover{
        color: black;
      }
      &{
        color:gray;
      }
    }
  `,
}))

const RenderCode: React.FC = (props: renderCodeProps) => {
    // const {styles} = useStyle()
    const [copy, setCopy] = useState(false)

    const copy2clipboard = () => {

        const clipboardObj = navigator.clipboard;
        clipboardObj.writeText(props.code).then(()=>{
            setCopy(true)
            let time = setTimeout(()=>{
                setCopy(false)
                clearTimeout(time)
            },2000)
        })
    }

    return (
        <>
            <div id={"code"}>
                <div className={"tool-bar"} style={{
                    paddingTop: "5px",
                    paddingBottom: "3px",
                    backgroundColor: "whitesmoke",
                    display: "flex",
                    justifyContent: "space-between",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px"
                }}>
                        <span style={{
                            marginLeft: "2vh",
                            color: "gray",
                            marginTop: "6px"
                        }}>{props.type.substring(9)}</span>
                    <div>
                        <ConfigProvider
                            // theme={{
                            // components:{
                            button={{
                                // className: styles.copyCode
                            }}
                        >
                            <Button
                                style={{marginRight: "2vh"}}
                                size="large" type="link" icon={copy? <CheckCircleOutlined />:<CopyOutlined/>} onClick={copy2clipboard}>

                                {/*{buttonContent}*/}
                            </Button>
                        </ConfigProvider>
                    </div>
                </div>
            </div>
        </>
    )
}

const RichText: React.FC = (props: RichTextProps) => {
    const [text, setText] = useState("");
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
                                    <RenderCode code={String(children).replace(/\n$/, '')} type={className}/>
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