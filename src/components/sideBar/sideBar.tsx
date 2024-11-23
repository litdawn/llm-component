import './sideBar.less'

const SideBar = function (props) {
  const chat_list = [
    {"id": 1, "name": "chat1"},
    {"id": 2, "name": "chat2"},
  ]

  return (
    <>
      <div className={"side-bar"}>
        <div>My chat-bot</div>
        <div className={"start"}>start new chat</div>
        <div className={"chat-list"}>
          {chat_list.map((item, index) => {
            return (
              <div className={"chat-item"} key={item.id}>{item.name}</div>
            )
          })}
        </div>
      </div>
    </>
  )

}
export default SideBar