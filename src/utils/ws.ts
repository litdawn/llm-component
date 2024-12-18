interface WSResult {
    code: number;
    message: string;
    errorCode?: number | string;
    httpMsg?: string;
    hide?: boolean;

    [x: string]: any;
}

interface WebSocketMegFunc {
    (res: WSResult): void;
}

interface WebSocketFunc {
    (ws: WebSocketExp): void;
}

interface WebSocketExp extends WebSocket {
    onMessageCallback?: WebSocketMegFunc; // 保存使用者的回调方法
    wsKey?: string; // 记录当前使用者基于 ws 的 Id
    timeout?: any; // 记录当前 ws 心跳定时器
    serverTimeout?: any; // 记录当前 ws 心跳发出等待后端响应的等待定时器
    debounceTimeout?: any; // 记录重连发出的定时器，用于重连机制的一个节流操作
}


const timeout = 1000 * 60 * 4 ; // 4分钟，后端推送间隔为两分钟
const reconnectTimeout = 1000 * 60 * 2; // 尝试重连间隔为两分钟
const wsMap = new Map(); // ws 对象的集合库

/**
 * 初始化 Props
 */
function initProps(ws: WebSocketExp, onMessageCallback: WebSocketMegFunc, wsKey: string): void {
    ws.onMessageCallback = onMessageCallback; // 记录使用者的回调函数
    ws.wsKey = wsKey; // 新 ws 集成旧 ws 的 Id
    ws.timeout = null; // 声明心跳定时器
    ws.serverTimeout = null; // 声明心跳反馈定时器
    // 这里保存上一个 ws 的重连状态，配合 reconnect 的节流功能，保存不会频繁发送无意义的心跳
    ws.debounceTimeout = wsMap.get(wsKey) ? wsMap.get(wsKey).debounceTimeout : null;
    wsMap.set(wsKey, ws); // 保存或者更新 ws 在资料库 map 的数据
}

/**
 * 清除定时器
 */
function clearTimeout(ws: WebSocketExp): void {
    ws.timeout && window.clearTimeout(ws.timeout);
    ws.serverTimeout && window.clearTimeout(ws.serverTimeout);
    ws.debounceTimeout && window.clearTimeout(ws.debounceTimeout);
}

/**
 * 重置心跳检查
 */
function reset(ws: WebSocketExp): void {
    clearTimeout(ws);
    start(ws);
}

/**
 * 开始心跳检查
 */
function start(ws: WebSocketExp): void {
    ws.timeout = setTimeout(function () {
        ws.send(JSON.stringify({type: 1000, data: 'HeartBeat'})); // 和后端约定，心跳发送标识为: HeartBeat
        ws.serverTimeout = setTimeout(function () {
            // 如何发起了心跳检查，timeout 时间后还是没有返回，那就直接关闭
            ws.close();
        }, timeout);
    }, timeout);
}

/**
 * 重连操作
 */
function reconnect(ws: WebSocketExp): void {	 // 节流
    clearTimeout(ws); // 如果发起重连，则关闭心跳等定时器
    const callNow = !ws.debounceTimeout;
    ws.debounceTimeout = setTimeout(() => {
        ws.debounceTimeout = null;
        reconnect(ws); // 已进行过重连的，下一次必须经过 reconnectTimeout 之后才能再次发起重连
    }, reconnectTimeout);
    if (callNow) {
        console.warn(`[WS RECONNECT](${ws.url})`);
        wsConstructor(ws.url, ws.onMessageCallback, ws.wsKey);
    }
}

/**
 * 收到服务器数据后的回调函数
 */
function onMessage(
    this: WebSocketExp,
    ev: MessageEvent,
    onMessageCallback: WebSocketMegFunc
): void {
    // 重置心跳
    reset(this);
    // 这里可以做一些通用措施，然后再传给 onMessageCallback
    if (onMessageCallback) {
        try {
            const res = JSON.parse(ev.data).data;
            if (res.data.text === 'alive') {
                console.log("heartbeat success")
                return; // 与后端约定，心跳反馈标识为: alive，得到 alive 标识链接正常，什么也不做
            }
            onMessageCallback(res);
        } catch (error) {
            console.error(`[WS JSON ERROR](${this.url})`);
            onMessageCallback(null);
        }
    }
}

/**
 * 报错时的回调函数
 */
function onError(this: WebSocketExp, ev: Event): void {
    console.error(`[WS ERROR](${this.url}) 异常`);
    this.close();
}

/**
 * 连接关闭后的回调函数
 */
function onClose(this: WebSocketExp, ev: CloseEvent): void {
    console.warn(`[WS CLOSED](${this.url}) ${ev.code}: ${ev.reason}`);
    // 前端手动关闭的就不用重连了
    if (ev.code !== 1000) {
        reconnect(this);
    } else {
        // web主动关闭就不再重连了
        // 清除所有定时器
        clearTimeout(this);
        // 删除了 wsMap 对应存储的 ws 实例
        wsMap.delete(this.wsKey);
    }
}

/**
 * 连接成功后的回调函数
 */
function onOpen(this: WebSocketExp, ev: Event): void {
    console.log(`ws: ${this.url} connection succeeded ~`);
    // 开启心跳
    start(this);
}

export const wsConstructor = function (
    url: string,
    onMessageCallback: WebSocketMegFunc,
    wsKey: string // 这是使用者对相应的 ws 给予身份证 Id
): WebSocket {
    const ws: WebSocketExp = new WebSocket(url);
    ws.onmessage = function (this: WebSocket, ev: MessageEvent): void {
        onMessage.call(this, ev, onMessageCallback);
    };
    ws.onerror = onError;
    ws.onclose = onClose;
    ws.onopen = onOpen;
    // 初始化 Props，记录使用者构建 ws 所提供的信息保存在 ws 对象自身中
    initProps(ws, onMessageCallback, wsKey);
    return ws;
}