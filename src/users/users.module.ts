import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserTest, userSchema } from './schema/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserTest.name, schema: userSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
