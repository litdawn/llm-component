// @ts-ignore
import React, {useState} from "react";
import {Button, Input, Tooltip, message} from "antd";
import {SearchOutlined, UploadOutlined, PaperClipOutlined} from '@ant-design/icons';
import "./fullInput.less"
//@ts-ignore
import {debug, ask_question, ask_question_stream} from "./search.ts";

//@ts-ignore
import UploadDIf from "./upload/upload.tsx";

interface FullInputProps {

}

const FullInput: React.FC = (props: FullInputProps) => {
    const [value, setValue] = useState("")
    const [messageApi, contextHolder] = message.useMessage();
    const warn = (content: string) => {
        messageApi.open({
            type: "warning",
            content
        })
    }
    const onSearch = () => {
        if (value && value.length > 0) {
            // debug()
            ask_question_stream(value).then()
        } else {
            warn("请输入内容后进行提问")
        }
        setValue("")
    }
    const onUpload = () => {
        console.log("nihao ")
        //     prefix={
        //     <Upload/>
        // }
    }
    return (
        <>
            <div id="full-input">
                <div className={"container"}>
                    <Input
                        className={"input"}
                        size="large"
                        placeholder="请输入你的问题"
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                        autoSize={{minRows: 1, maxRows: 1}}
                        prefix={
                            <>
                                <UploadDIf></UploadDIf>

                            </>}
                        suffix={
                            <Tooltip title="发送消息">
                                <Button style={{marginLeft: "5px"}}
                                        size="large" type="link"
                                        shape="round" disabled={value.length === 0}
                                        icon={<SearchOutlined/>}
                                        onClick={onSearch}/>
                            </Tooltip>

                        }
                    />
                </div>
            </div>
            {contextHolder}
        </>
    )
}

export default FullInput