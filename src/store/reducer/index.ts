export const reducer = (state, action) => {
    let new_state = ""
    switch (action.type) {
        case 'new_chat': {
            const chat_id = action.payload.chat_id;
            add_new_chat(chat_id)
            new_state = {
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
            break;
        }
        case 'new_ask': {
            new_state = JSON.parse(JSON.stringify(state))
            new_state["conversations"][state.active].chat_list.push({
                type:"user",
                id:action.payload.ask_id,
                content:action.payload.content
            })
            let chat_theme = new_state["conversations"][state.active].theme;
            if (action.payload.ask_id == 1) {
                chat_theme = action.payload.content;
            }
            new_state["conversations"][state.active].theme = chat_theme;
            break;
        }
        case 'new_ans': {
            new_state = JSON.parse(JSON.stringify(state))
            new_state["conversations"][state.active].chat_list.push({
                type:"assistant",
                id:action.payload.ans_id,
                content:action.payload.content
            })
            break;
        }
        case 'add_content':{
            new_state = JSON.parse(JSON.stringify(state));
            const chat_list = new_state["conversations"][state.active].chat_list;
            let is_contained = false;
            for(const chat of chat_list){
                if(action.payload.ans_id == chat.id){
                   chat.content = chat.content.concat(action.payload.content);
                   is_contained = true;
                   break;
                }
            }
            if(!is_contained){
                new_state["conversations"][state.active].chat_list.push({
                    type:"assistant",
                    id:action.payload.ans_id,
                    content:action.payload.content
                })
            }
            break;
        }
        case 'init':{
            new_state = action.payload.state;
            break;
        }
        default:
            return state
    }
    new_state["timestamp"] = Date.now();
    return new_state;
}

const add_new_chat = (chat_id) => {
    //把新的chat_id存在indexDB里
}

const cut_theme = (content, length) => {
    content = content.substring(0, length)
    return `${content}...`
}