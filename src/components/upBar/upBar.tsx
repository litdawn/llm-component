// @ts-ignore
import React from "react";
import "./upBar.less"
import {Button, message} from "antd";
import {DownOutlined} from "@ant-design/icons"
import {connect} from "react-redux";
//@ts-ignore
import useOnlineStatus from "../../hooks/onlineStatus.ts";

/*
  上方的状态栏
 */
interface UpBarProps {
    theme: string
}

const UpBar: React.FC = (props: UpBarProps) => {
    const isOnline = useOnlineStatus();
    const [messageApi, contextHolder] = message.useMessage();

    const loading = () => {
        messageApi.open({
            type: 'loading',
            content: 'Action in progress..',
            duration: 0,
        });
    };

    return (
        <>

            <div id={"up-bar"}>
                <div className={"container"}>
                    <Button
                        type="text"
                        block
                        style={{color: "white", fontSize: "22px", marginTop: "1vh", fontFamily: "汇文明朝体"}}
                        // icon={<DownOutlined/>}
                    >
                        @{props.theme}
                    </Button>
                </div>
                {
                    isOnline ?
                        <div className={"online"}>Online</div> :
                        contextHolder
                }
            </div>
        </>

    )
}
const state2props = (state) => {
    return {
        theme: state.conversations[state.active].theme
    }
}
export default connect(state2props)(UpBar)