import './sideBar.less'
const SideBar = function (props) {
  const chat_list = [
    {"id":1,"name":"chat1"},
    {"id":2,"name":"chat2"},
  ]

  return(
    <>
      <div className={"side-bar"}>
        <div>My chat-bot</div>
        <button className={"start"}>start new chat</button>
        {chat_list.map((item,index)=>{
          return(
            <div className={"chat-item"} key={item.id}>{item.name}</div>
          )
        })}
      </div>
    </>
  )

}
export default SideBar