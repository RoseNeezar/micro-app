import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'dgram';

const mockData = [
  {
    id: 1,
    app: 'root',
    data: '3 Talmadge Park',
  },
  {
    id: 2,
    app: 'mobility',
    data: '2 Huxley Parkway',
  },
  {
    id: 3,
    app: 'xp',
    data: '6473 Toban Alley',
  },
  {
    id: 4,
    app: 'mobility',
    data: '2093 Miller Terrace',
  },
  {
    id: 5,
    app: 'xp',
    data: '93 Petterle Plaza',
  },
];

@WebSocketGateway({
  path: '/kanban/socket.io',
  cors: {
    origin: '*',
  },
  transports: ['polling', 'websocket'],
})
export class KanbanGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('MessageGateway');
  @SubscribeMessage('setup')
  handleMessage(client: Socket, payload: any) {
    console.log('some connect !!!!', payload);
    // client.emit('connected', 'from me here');

    setInterval(() => {
      const random = Math.floor(Math.random() * 5);

      client.emit('connected', mockData[random]);
    }, 1000);
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: `);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: `);
  }
}
