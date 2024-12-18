const url = require('url');
const {getCookie} = require('./cookle');

var messageIndex = 0;

// 广播当前 webSocket 连接用户
function broadcastUsers(wss, user) {
  // this.wss.clients 返回的是 Set 对象 可以使用 forEach 遍历或者使用 Array.from 将Set 转化为 Array
  let users = Array.from(wss.clients).map(function (client) {
    return client.user;
  });
  wss.broadcast(createMessage('users', user, {type: 'list', meg: users}));
}

// 从 cookie 中获取 user
function cookiesUser(req) {
  // if (!req) {
  //   return null;
  // }
  // const cookie = req.headers.cookie
  // if (!cookie) {
  //   return null;
  // }
  // return JSON.parse(getCookie(cookie, 'user'));
  // console.log(req.headers.cookie)//Webstorm-7e722af=61d66e01-0a51-4ea5-ad38-3a57dfd6f34b
  return {
    name: "dcc"
  }
}

// 创建消息
function createMessage(type, user, data) {
  messageIndex++;
  return JSON.stringify({
    id: messageIndex,
    type: type, // 消息类型
    user: user,
    data: data, // {type: 数据类型}
  });
}

// 连接后回调
function onConnect() {
  console.log("on connect")
  let user = this.user;
  let msg = createMessage('enter', user, {type: 'text', msg: `${user.name} 进入聊天室~.`});
  this.wss.broadcast(msg);
  broadcastUsers(this.wss, user);
}

// 监听客户端消息
function onMessage(message) {
  const ana_rec = JSON.parse(message.toString());
  if (ana_rec.type === 1000 && ana_rec.data === "HeartBeat") {
    const msg = createMessage('1000', this.user, {data:{text:"alive"}});
    this.wss.heartbeat(msg);
  }
  // else if (message) {
  //   console.log(message)
  //   const msg = createMessage('1000', this.user, JSON.parse("{'p':'ong'}"))
  //   this.wss.heartbeat(msg);
  // } else if (message && message.trim()) {
  //   const msg = createMessage('chat', this.user, JSON.parse(message.trim()));
  //   console.log("ready to broadcast")
  //   this.wss.broadcast(msg);
  // }
}

// 客户端关闭 webSocket
function onClose() {
  let user = this.user;
  let msg = createMessage('leave', user, {type: 'text', meg: `${user.name} 离开聊天室~.`});
  this.wss.broadcast(msg); // 当某一个 client 关闭 webSocket 的时候， 广播给其他所有 client
  broadcastUsers(this.wss, user);
}

// webSocket 连接异常
function onError(err) {
  console.log('[WebSocket] error: ' + err);
}

// 创建 webSocket 服务器
exports.createWebSocketServer = (server, WebSocketServer) => {
  //创建WebSocketServer:
  const wss = new WebSocketServer({
    server: server,
  });
  // 聊天功能：在接收到信息后，将消息广播发送到 webSocket 所有绑定的 client
  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === 1) {
        client.send(data);
      }
    });
  };

  wss.heartbeat = function heartbeat(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === 1) {
        console.log("heartbeat ready to reply");
        client.send(data);
      }
    });
  }

  wss.on('connection', function (client, req) {
    let location = url.parse(req.url, true);
    client.on('message', onMessage);
    client.on('close', onClose);
    client.on('error', onError);
    // 如果接收到 webSocket 请求，但不是 chat 聊天模块的，关闭改请求
    // if (location.pathname !== '/websocket/chat') {
    //   client.close(4000, 'Invalid URL');
    // }
    client.user = cookiesUser(req);
    client.wss = wss;
    client.send("hi")
    // 连接成功后的 自定义回调
    onConnect.apply(client);
  });


  console.log('webSocket 服务器启动成功!');
  return wss;
}