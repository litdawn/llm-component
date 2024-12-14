// 创建 WebSocket 连接
const socket = new WebSocket('ws://localhost:8080');

// 连接建立时触发的事件处理程序
socket.onopen = function() {
    console.log('已连接到服务器');

    // 发送消息到服务器
    socket.send('Hello, server!');
};

// 接收到消息时触发的事件处理程序
socket.onmessage = function(event) {
    console.log('收到消息:', event.data);
};

// 连接关闭时触发的事件处理程序
socket.onclose = function() {
    console.log('已断开与服务器的连接');
};

// 发生错误时触发的事件处理程序
socket.onerror = function(error) {
    console.error('发生错误:', error);
};