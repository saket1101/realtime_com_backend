import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, messageSchema } from 'src/users/schema/message.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:Message.name,schema:messageSchema}])],
  providers: [GatewayService],
})
export class GatewayModule {}
