import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { GatewayModule } from './gateway/gateway.module';



@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://saketjha00:XmNB5oDBKBYJRgUe@cluster0.moqbit8.mongodb.net/?retryWrites=true&w=majority'),
    UsersModule,
    GatewayModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}