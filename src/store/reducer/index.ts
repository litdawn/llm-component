const conversations =
    {
        "gdugde": {
            theme: "",
            chat_list: [
                {
                    type: "user",//assistant,
                    id: "",//
                    content: ""
                }
            ]
        }
    }


export const reducer = (state, action) => {
    switch (action.type) {
        case 'new_chat': {
            const chat_id = action.payload.chat_id;
            add_new_chat(chat_id)
            return {
                ...state,
                conversations: {
                    ...state.conversations,
                    chat_id: {
                        id: action.payload.chat_id,
                        theme: "默认主题",
                        chat_list: []
                    }
                }
            }
        }
        case 'new_ask': {
            const new_state = JSON.parse(JSON.stringify(state))
            new_state.conversations[new_state.active].chat_list.push({
                type:"user",
                id:action.payload.ask_id,
                content:action.payload.content
            })
            let chat_theme = new_state.conversations[new_state.active].theme;
            if (action.payload.ask_id == 1) {
                chat_theme = action.payload.content;
            }
            new_state.conversations[new_state.active].theme = chat_theme;
            return new_state
        }
        case 'new_ans': {
            const new_state = JSON.parse(JSON.stringify(state))
            new_state.conversations[state.active].chat_list.push({
                type:"assistant",
                id:action.payload.ans_id,
                content:action.payload.content
            })
            return new_state
        }
        case 'add_content':{
            const new_state = JSON.parse(JSON.stringify(state));
            const chat_list = new_state.conversations[state.active].chat_list;
            let is_contained = false;
            for(const chat of chat_list){
                if(action.payload.ans_id == chat.id){
                   chat.content.concat(action.payload.content);
                   is_contained = true;
                   break;
                }
            }

            return new_state
        }
        default:
            return state
    }
}

const add_new_chat = (chat_id) => {
    //把新的chat_id存在indexDB里
}

const cut_theme = (content, length) => {
    content = content.substring(0, length)
    return `${content}...`
}