// @ts-ignore
import React from "react";
import "./upBar.less"
import { Button } from "antd";
import {DownOutlined} from "@ant-design/icons"
import {connect} from "react-redux";
/*
  上方的状态栏
 */
interface UpBarProps{
    theme: string
}
const UpBar:React.FC = (props:UpBarProps)=>{

    return(
        <>
            <div id={"up-bar"}>
                <Button
                    type="text"
                    block
                    style={{color:"white", fontSize:"22px",marginTop:"1vh"}}
                    icon={<DownOutlined />}>
                    @{props.theme}
                </Button>
            </div>
        </>

    )
}
const state2props = (state)=>{
    return {
        theme:state.conversations[state.active].theme
    }
}
export default connect(state2props)(UpBar)