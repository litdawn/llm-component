import React from "react";
import ReactDOM from 'react-dom/client'

// 函数式组件，没有自己的state

const users = [{
  name:1,
  age:12
},{
  name:"hi",
  age:13
},{
  name:"hello",
  age:14
}]
const User = (props)=>{
  return(
    <div>
      <div>姓名：{props.name || "no name"}</div>
      <div>年龄：{props.age || "no age"}</div>
    </div>
  )
}
const Son = (props)=> {
  function son_click(ev){
    console.log(ev, "click son")
  }
  return (
    <>
      <div onClick={son_click}>this is a son component</div>
      <div>
        {
          users.map((user,index,array)=>{
            return (
              <User key={index} name={user.name} age={user.age}></User>
            )
          }).filter((item)=>{
            return true
          }).reduce((item)=>{

          })
        }
      </div>
    </>
  )

}
function MyComponent(props) {
  const word = "this is a test"
  const shouldOn = true
  const component = <div>this is a component</div>
  return (
    <>
      <div className={"hi"}>{1 + 2}:{word}</div>
      <div>{shouldOn ? <div>shouldOn</div> : <div>shouldOff</div>}</div>
      <Son/>
      {component}
    </>
  )

}

ReactDOM.render(
  <></>
)