export const NEW_CHAT = (chat_id) => {
  return {
    type: 'new_chat',
    payload: {
      chat_id
    }
  }
}

export const NEW_ASK = (ask_id, content) => {
  return {
    type: 'new_ask',
    payload: {
      ask_id,
      content
    }
  }
}

export const NEW_ANS = (ans_id, content) => {
  return {
    type: 'new_ans',
    payload: {
      ans_id,
      content
    }
  }
}

export const ADD_CONTENT = (ans_id, content) => {
  return{
    type:"add_content",
    payload:{
      ans_id,
      content
    }
  }

}