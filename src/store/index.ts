import {configureStore, Tuple} from "@reduxjs/toolkit";
//@ts-ignore
import {reducer} from "./reducer/index.ts";

// preloadedState: {
//     timestamp:"1660926192826",
//         active: "7442535896710119462",
//         "conversations": {
//         "7442535896710119462": {
//             theme: "默认主题",
//                 chat_list: [
//                 {
//                     type: "user",//assistant,
//                     id: "1",//
//                     content: "你好"
//                 }, {
//                     type: "assistant",
//                     id: "7442267374478344201",
//                     content: "我挺好的哇，你有什么想聊的吗"
//                 }, {
//                     type: "user",//assistant,
//                     id: "2",//
//                     content: "今天星期几",
//                 }, {
//                     type: "assistant",
//                     id: "7442267374478344211",
//                     content: "今天星期四"
//                 }, {
//                     type: "user",//assistant,
//                     id: "3",//
//                     content: "这是一个长长长长长长长长长长长长长长长长长长长长长长长" +
//                         "长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长" +
//                         "长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长" +
//                         "长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长" +
//                         "长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长" +
//                         "长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长" +
//                         "长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长" +
//                         "长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长" +
//                         "长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长" +
//                         "长长长长长长长长长长对话",
//                 },
//                 {
//                     type: "assistant",
//                     id: "7442267374478344299",
//                     content: "今天星期四."
//                 },
//             ]
//         }
const init_state = () => {
    const init_state = {
        timestamp: "1660926192826",
        active: "7442535896710119462",
        "conversations": {
            "7442535896710119462": {
                theme: "默认主题",
                chat_list: [
                    {
                        type: "user",//assistant,
                        id: "1",//
                        content: "你好"
                    }, {
                        type: "assistant",
                        id: "7442267374478344201",
                        content: "我挺好的哇，你有什么想聊的吗"
                    }, {
                        type: "user",//assistant,
                        id: "2",//
                        content: "今天星期几",
                    }, {
                        type: "assistant",
                        id: "7442267374478344211",
                        content: "今天星期四"
                    }, {
                        type: "user",//assistant,
                        id: "3",//
                        content: "这是一个长长长长长长长长长长长长长长长长长长长长长长长" +
                            "长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长" +
                            "长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长" +
                            "长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长" +
                            "长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长" +
                            "长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长" +
                            "长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长" +
                            "长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长" +
                            "长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长" +
                            "长长长长长长长长长长对话",
                    },
                    {
                        type: "assistant",
                        id: "7442267374478344299",
                        content: "今天星期四."
                    },
                ]
            }
        }
    }
    const raw_state = localStorage.getItem('state');
    if (raw_state) {
        const stored_state = JSON.parse(raw_state);
        stored_state.timestamp = Date.now()
        return stored_state
    }
    return init_state
}

export const store = configureStore({
    reducer: reducer,
    // middleware:()=>new Tuple(),
    // devTools:process.env.NODE_ENV !== "production",
    preloadedState: init_state()


})


export default store