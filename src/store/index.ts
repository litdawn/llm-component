import {configureStore, Tuple} from "@reduxjs/toolkit";
//@ts-ignore
import {reducer} from "./reducer/index.ts";

const init = {}

export const store = configureStore({
  reducer: reducer,
  // middleware:()=>new Tuple(),
  // devTools:process.env.NODE_ENV !== "production"
  preloadedState: {
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
            id: "2",//
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
})


export default store