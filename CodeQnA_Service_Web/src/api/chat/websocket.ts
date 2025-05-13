import { MessageDto } from "./type";

export class WebSocketService {
  private socket: WebSocket | null = null;
  private token: string = '';
  private userId: number = 0;
  private messageHandler: (data: MessageDto) => void = () => {};

  // 连接 WebSocket
  connect(token: string, userId: number) {
    this.token = token;
    this.userId = userId;
    this.socket = new WebSocket(`ws://localhost:8508/ws`);

    this.socket.onopen = () => {
        console.log('发送认证信息')
        this.sendAuth(); // 发送认证消息
    };

    this.socket.onmessage = (event) => {
        console.log(event);
        console.log(event.data);
        this.handleMessage(event.data);
    };

    this.socket.onclose = () => {
      console.log('WebSocket 连接已关闭');
    };
  }

  // 发送认证信息
  private sendAuth() {
    this.send({
      type: 'auth',
      token: this.token
    });
  }

  // 发送聊天消息
  sendMessage(message: MessageDto) {
    this.send({
      type: 'message',
      data: message
    });
  }

  // 处理接收消息
  private handleMessage(rawData: string) {
    const data = JSON.parse(rawData);
    console.log(rawData);
    console.log(data);
    if (data.type === 'message') {
        console.log(data.data);
        console.log(data.data.data);
      this.messageHandler(data.data.data);
    }
  }

  // 通用消息发送方法
  private send(data: any) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    }
  }

  // 设置消息处理器
  setMessageHandler(handler: (data: MessageDto) => void) {
    this.messageHandler = handler;
    console.log(this.messageHandler);
  }

  // 关闭连接
  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}