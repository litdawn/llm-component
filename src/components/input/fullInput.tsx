// @ts-ignore
import React, {useState} from "react";
import {Button, Input} from "antd";
import {InfoCircleOutlined, UserOutlined, SearchOutlined} from '@ant-design/icons';
import "./fullInput.less"
//@ts-ignore
import {debug, ask_question, ask_question_stream} from "./search.ts";
//@ts-ignore
import store from "../../store/index.ts";

interface FullInputProps {

}

const FullInput: React.FC = (props: FullInputProps) => {
    const [value, setValue] = useState()
    const onSearch = () => {
        // debug()
        ask_question_stream(value)
        setValue(()=>{""})
    }
    return (
        <>
            <div className="full-input">
                <div style={{margin: '24px 0'}}/>
                {/*<SearchOutlined />*/}
                {/*<Search size="large" placeholder="input search text" allowClear onSearch={onSearch} style={{width: 200}}/>*/}
                <Input.TextArea
                    prefix={<SearchOutlined/>}
                    style={{width: "50vw", fontSize: "20px"}}
                    size="large"
                    placeholder="请输入你的问题"
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    autoSize={{minRows: 1, maxRows: 1}}
                />
                <Button style={{marginLeft: "5px"}} size="large" icon={<SearchOutlined/>} onClick={onSearch}/>
                <div style={{margin: '24px 0'}}/>
            </div>
        </>
    )
}

export default FullInput