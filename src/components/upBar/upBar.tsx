// @ts-ignore
import React from "react";
import "./upBar.less"
// @ts-ignore
import {store} from "../../store/index.ts";
import { Button } from "antd";
import {DownOutlined} from "@ant-design/icons"
import {connect} from "react-redux";
/*
  显示字符的
 */
interface UpBarProps{
    theme
}
const UpBar:React.FC = (props:UpBarProps)=>{

    return(
        <>
            <div id={"up-bar"}>
                <Button
                    type="text"
                    block
                    style={{color:"white", fontSize:"22px"}}
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