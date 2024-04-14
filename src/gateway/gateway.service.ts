import { Injectable, OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from 'src/users/schema/message.schema';  // Assuming you have a message model defined

@WebSocketGateway()
export class GatewayService implements OnModuleInit {
  constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
      console.log('Socket Connected');
      console.log(socket.id);

      // Send chat history to the client
      this.messageModel.find().then(messages => {
        socket.emit('chatHistory', messages);
      });
    });
  }

  @SubscribeMessage('chatMessage')
  async handleMessage(@MessageBody() data: any, @ConnectedSocket() socket: Socket): Promise<void> {
    console.log(data);

    // Check if the message is sent to a valid recipient
    if (this.isValidRecipient(data.receiverId, socket.id)) {
      // Save message to the database
      const message = new this.messageModel(data);
      await message.save();

      // Broadcast the message to the intended recipient
      const recipientSocket = this.findSocketById(data.receiverId);
      if (recipientSocket) {
        recipientSocket.emit('newMessage', data);
      } else {
        console.log(`Recipient socket not found for ID: ${data.receiverId}`);
      }
    } else {
      console.log(`Invalid recipient: ${data.receiverId}`);
    }
  }

  private isValidRecipient(receiverId: string, senderSocketId: string): boolean {
    // Add your logic to validate if the recipient is valid for the sender
    // For example, you might check if the recipient is in the sender's contact list
    // Return true if valid, false otherwise
    return true; // Replace with your validation logic
  }

  private findSocketById(socketId: string): Socket | undefined {
    return Array.from(this.server.sockets.sockets.values()).find(socket => socket.id === socketId);
  }
}
