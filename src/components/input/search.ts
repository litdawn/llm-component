import axios from "axios"
//@ts-ignore
import store from "../../store/index.ts";
//@ts-ignore
import {ADD_CONTENT, NEW_ANS, NEW_ASK, NEW_CHAT} from "../../store/action/index.ts";

const authorization = "pat_v1J0O54bHyLLnO1pSNtobI4HGAa2bFS0Cl6wW1HX6RekNjVhgKWAPGujKIDS6gdp"
const bot_id = "7442527754765647891"
const user_id = "123"
const url = ""


// axios.defaults.baseURL = 'https://api.coze.cn/';
axios.defaults.headers.common['Authorization'] = `Bearer ${authorization}`;
axios.defaults.headers.post['Content-Type'] = 'application/json'

//created_at:1732714299
// id:"7441951200360120346"
// last_section_id:"7441951200360120346"
// interface res{
//     code: number,
//     msg: string,
//     data:{
//         id:string,
//         conversation_id:string,
//         bot_id:string,
//         chat_id:string,
//         meta_data: object,
//         role: string
//     }
// }
const request = (url,
                 data,
                 onSuccess,
                 onError = (e) => {
                   console.log(e)
                 }
) => {
  axios({
    method: "POST",
    url,
    data
  }).then((res) => {
    console.log(res)
    if (res["status"] == 200 || (res["code"] && res["code"] === 0)) {
      onSuccess(res)
    }
  }).catch((err) => {
    onError(err)
  })
}

export const create_conversation = (content = "") => {
  const deal_with_result = (res) => {
    const data = res["data"]
    const conversation_id = data["id"];
    store.dispatch(NEW_CHAT(conversation_id));
  }
  request(
    " https://api.coze.cn/v1/conversation/create",
    {
      role: "user",//assistant,
      type: "question",// answer,function_call,tool_output,tool_response
      content,
      content_type: "text",//object_string
      // meta_data:n
    },
    deal_with_result
  )
}

// const data =
//     "event:conversation.chat.created\ndata:{\"id\":\"7441982054331547711\",\"conversation_id\":\"7441951200360120346\",\"bot_id\":\"7441780437695086628\",\"created_at\":1732721480,\"last_error\":{\"code\":0,\"msg\":\"\"},\"status\":\"created\",\"usage\":{\"token_count\":0,\"output_count\":0,\"input_count\":0},\"section_id\":\"7441951200360120346\"}\n\n" +
//     "event:conversation.chat.in_progress\ndata:{\"id\":\"7441982054331547711\",\"conversation_id\":\"7441951200360120346\",\"bot_id\":\"7441780437695086628\",\"created_at\":1732721480,\"last_error\":{\"code\":0,\"msg\":\"\"},\"status\":\"in_progress\",\"usage\":{\"token_count\":0,\"output_count\":0,\"input_count\":0},\"section_id\":\"7441951200360120346\"}\n\n" +
//     "event:conversation.message.delta\ndata:{\"id\":\"7441982054331629631\",\"conversation_id\":\"7441951200360120346\",\"bot_id\":\"7441780437695086628\",\"role\":\"assistant\",\"type\":\"answer\",\"content\":\"今天\",\"content_type\":\"text\",\"chat_id\":\"7441982054331547711\",\"section_id\":\"7441951200360120346\"}\n\n" +
//     "event:conversation.message.delta\ndata:{\"id\":\"7441982054331629631\",\"conversation_id\":\"7441951200360120346\",\"bot_id\":\"7441780437695086628\",\"role\":\"assistant\",\"type\":\"answer\",\"content\":\"星期三\",\"content_type\":\"text\",\"chat_id\":\"7441982054331547711\",\"section_id\":\"7441951200360120346\"}\n\n" +
//     "event:conversation.message.delta\ndata:{\"id\":\"7441982054331629631\",\"conversation_id\":\"7441951200360120346\",\"bot_id\":\"7441780437695086628\",\"role\":\"assistant\",\"type\":\"answer\",\"content\":\"。\",\"content_type\":\"text\",\"chat_id\":\"7441982054331547711\",\"section_id\":\"7441951200360120346\"}\n\n" +
//     "event:conversation.message.completed\ndata:{\"id\":\"7441982054331629631\",\"conversation_id\":\"7441951200360120346\",\"bot_id\":\"7441780437695086628\",\"role\":\"assistant\",\"type\":\"answer\",\"content\":\"今天星期三。\",\"content_type\":\"text\",\"chat_id\":\"7441982054331547711\",\"section_id\":\"7441951200360120346\",\"created_at\":1732721481}\n\n" +
//     "event:conversation.message.completed\ndata:{\"id\":\"7441982078243143699\",\"conversation_id\":\"7441951200360120346\",\"bot_id\":\"7441780437695086628\",\"role\":\"assistant\",\"type\":\"verbose\",\"content\":\"{\\\"msg_type\\\":\\\"generate_answer_finish\\\",\\\"data\\\":\\\"{\\\\\\\"finish_reason\\\\\\\":0,\\\\\\\"FinData\\\\\\\":\\\\\\\"\\\\\\\"}\\\",\\\"from_module\\\":null,\\\"from_unit\\\":null}\",\"content_type\":\"text\",\"chat_id\":\"7441982054331547711\",\"section_id\":\"7441951200360120346\",\"created_at\":1732721483,\"updated_at\":1732721483}\n\n" +
//     "event:conversation.message.completed\ndata:{\"id\":\"7441982078243160083\",\"conversation_id\":\"7441951200360120346\",\"bot_id\":\"7441780437695086628\",\"role\":\"assistant\",\"type\":\"follow_up\",\"content\":\"给我推荐一些关于星期三的冷知识\",\"content_type\":\"text\",\"chat_id\":\"7441982054331547711\",\"section_id\":\"7441951200360120346\",\"created_at\":1732721483,\"updated_at\":1732721483}\n\n" +
//     "event:conversation.message.completed\ndata:{\"id\":\"7441982078243176467\",\"conversation_id\":\"7441951200360120346\",\"bot_id\":\"7441780437695086628\",\"role\":\"assistant\",\"type\":\"follow_up\",\"content\":\"周三有什么特别的意义或象征吗？\",\"content_type\":\"text\",\"chat_id\":\"7441982054331547711\",\"section_id\":\"7441951200360120346\",\"created_at\":1732721483,\"updated_at\":1732721483}\n\n" +
//     "event:conversation.message.completed\ndata:{\"id\":\"7441982078243192851\",\"conversation_id\":\"7441951200360120346\",\"bot_id\":\"7441780437695086628\",\"role\":\"assistant\",\"type\":\"follow_up\",\"content\":\"星期三出生的人有什么特点？\",\"content_type\":\"text\",\"chat_id\":\"7441982054331547711\",\"section_id\":\"7441951200360120346\",\"created_at\":1732721483,\"updated_at\":1732721483}\n\n" +
//     "event:conversation.chat.completed\ndata:{\"id\":\"7441982054331547711\",\"conversation_id\":\"7441951200360120346\",\"bot_id\":\"7441780437695086628\",\"created_at\":1732721480,\"completed_at\":1732721483,\"last_error\":{\"code\":0,\"msg\":\"\"},\"status\":\"completed\",\"usage\":{\"token_count\":62,\"output_count\":3,\"input_count\":59},\"section_id\":\"7441951200360120346\"}\n\nevent:done\ndata:\"[DONE]\"\n\n"
// console.log(JSON.parse(data))
export const ask_question = (content = "") => {
  const state = store.getState()
  const list = state.conversations[state.active].chat_list
  let last_point = 1
  for (let item of list) {
    if (item.type == "user" && item.id > last_point) {
      last_point = item.id;
    }
  }

  store.dispatch(NEW_ASK((last_point * 1 + 1) + "", content))
  // console.log("content",content)
  const reader = (data: string) => {
    const delta = "event:conversation.message.delta"
    const completed = "event:conversation.message.completed"
    let pointer = data.indexOf(completed) + completed.length
    let end = data.indexOf(completed, pointer)
    const content = JSON.parse(data.substring(pointer + 6, end))
    console.log("ans", content)
    return {
      content: content["content"],
      ans_id: content["id"]
    }
  }

  const deal_with_result = (res) => {
    const {content, ans_id} = reader(res.data);
    store.dispatch(NEW_ANS(ans_id, content))
  }


  request(
    ` https://api.coze.cn/v3/chat?conversation_id=${state.active}`,
    {
      bot_id,
      user_id,
      stream: true,
      additional_messages: [{
        role: "user",
        type: "question",
        content,
        content_type: "text"
      }]
    },
    deal_with_result
  )
}
export const ask_question_stream = async (content = "") => {
  const state = store.getState();
  const add_new_ask = () => {
    const list = state["conversations"][state["active"]]["chat_list"];
    let last_point = 1
    for (let item of list) {
      if (item.type == "user" && item.id > last_point) {
        last_point = item.id;
      }
    }
    store.dispatch(NEW_ASK((last_point * 1 + 1) + "", content))
  }

  const fetch_mes= async (content="")=> {
    return await fetch(`https://api.coze.cn/v3/chat?conversation_id=${state.active}`, {
      method: "POST",
      body: JSON.stringify({
        bot_id,
        user_id,
        stream: true,
        additional_messages: [{
          role: "user",
          type: "question",
          content,
          content_type: "text"
        }],

      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authorization}`
      }
    })
  }

  const res_reader = (data: string) => {
    console.log(data)
    const delta = "event:conversation.message.delta"
    // const completed = "event:conversation.message.completed"
    const message = "event:conversation.message."
    let end = 0
    let pointer = 0
    while (data.indexOf(delta,pointer) != -1) {
      pointer = data.indexOf(delta,end) + delta.length
      end = data.indexOf(message, pointer) == -1 ? data.length : data.indexOf(message, pointer);
      const content = JSON.parse(data.substring(pointer + 6, end))
      // console.log("ans", content)
      store.dispatch(ADD_CONTENT(content["id"], content["content"]))
    }
  }

  add_new_ask()

  const res = await fetch_mes(content)
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  while(true) {
    const {done, value} = await reader.read();
    if (done) break;
    const text = decoder.decode(value)
    res_reader(text)
    // console.log(text, done)
  }

  // console.log("content",content)


  // const deal_with_result = (res) => {
  //   const {content, ans_id} = reader(res.data);
  //   store.dispatch(NEW_ANS(ans_id, content))
  // }

}



export const debug = () => {
  const state = store.getState()
  // axios({
  //     method: "GET",
  //     url : ` https://api.coze.cn/v3/chat/message/list?conversation_id=${state.chat_id}&chat_id=${"7442201853774921743"}`,
  // }).then((res) => {
  //     console.log("here is res",res)
  // })
  axios({
    method: "POST",
    url: ` https://api.coze.cn/v1/conversation/message/list?conversation_id=${state.active}`,
    data: {}
  }).then((res) => {
    console.log("here", res)
  })
}

export const ask_question_with_file = (content) => {
  const deal_with_result = (res) => {

  }
  request("", {}, content,)

}

class typewriter {
  private queue: string[] = [];
  private consuming = false;
  private timer = null

  constructor(private onConsume: (str: string) => void) {
  }

  dynamicSpeed = () => {
    const speed = 2000 / this.queue.length;
    if (speed > 200)
      return 200;
    else
      return speed;
  }

  add = (str: string) => {
    if (!str) return
    this.queue.push(...str.split(""))
  }

  consume = () => {
    if (this.queue.length > 0) {
      const str = this.queue.shift()
      str && this.onConsume(str)
    }
  }

  next() {
    this.consume()
    this.timer = setTimeout(() => {
      this.consume()
      if (this.consuming) {
        this.next()
      }
    }, this.dynamicSpeed())
  }

  start() {
    this.consuming = true;
    this.next();
  }

  done() {
    this.consuming = false;
    clearTimeout(this.timer)
    this.onConsume(this.queue.join(''))
    this.queue = []
  }
}