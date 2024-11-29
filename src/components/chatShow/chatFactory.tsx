import ChatShow from "./chatShow";
// @ts-ignore
import {store} from '../../store/index.ts';


/*
    对话框生成工厂，返回组件
 */
function chatFactory(props) {

    store.subscribe(
        ()=>{

        }
    )

    return (
        <>
            <ChatShow content = "hi"></ChatShow>
        </>
    )
}