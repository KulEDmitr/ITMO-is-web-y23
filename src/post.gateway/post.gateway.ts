import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
    transports: ['websocket'],
  },
})
export class PostsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor() {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('post')
  async handleMessage(client: Socket, payload: any) {
    console.log(payload);

    const answer = {
      title: payload.title,
      author: payload.authorId,
    };

    this.server.emit('post', answer);
  }

  afterInit(server: Server): any {
    console.log('init');
  }

  handleConnection(client: Socket, ...args: any[]): any {
    console.log('client connected: ' + client.id);
  }

  handleDisconnect(client: any): any {
    console.log('client disconnected: ' + client.id);
  }
}
