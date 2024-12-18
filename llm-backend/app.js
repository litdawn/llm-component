const express = require('express')
const cors = require("cors")
const logger = require('./middleware/logger');
const ws = require('ws');
const WebSocket = require('./websocket/index');
const router = require("./routes/routes")

const WebSocketServer = ws.WebSocketServer;
const corsConfig = {
  origin: ctx => '*', // * 表示接受任意域名的请求
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'], // Access-Control-Expose-Headers
  maxAge: 5, // 表示 preflight request(预检请求)的返回结果 OPTIONS 的预检请求是否被缓存，如果为-1，则表示每次请求都要发送 OPTIONS 预检请求
  credentials: true, // 是否接受凭证 cookie
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'], // 允许的请求方法
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-User-Token'], // 允许的请求头
};


const app = express()
// 使用
app.use(logger)
// CORS 跨域配置
app.use(cors());

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});
app.get('/hi', (req, res) => {
  res.send('hello,world')
})
//
// app.all('/update', (req, res) => {
//   console.log("hihihihi")
//   res.send("hi")
// })
const PORT = 2000

const server = app.listen(PORT, () => {
  console.log(`express start in ${PORT}`)
})
app.wss = WebSocket.createWebSocketServer(server, WebSocketServer);