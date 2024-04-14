import { Injectable, InternalServerErrorException, } from '@nestjs/common';
import { UserTest } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(UserTest.name) private UserModel: Model<UserTest>) {}
 async create(body, res) {
    try {
      const id = 'User' + Math.random().toString(36).substring(7);
      const { Name, Email, Password } = body;
      console.log(body)
      const user = await  this.UserModel.create({ id, Name:Name, Email:Email, Password:Password });
      res.status(200).send({ message: 'User Created Successfully',data:user });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

 async login(body: any, res) {
    try {
      const { Email, Password } = body;
      const user: any =await this.UserModel.findOne({ Email });
      if (user.Password === Password) {
        res.status(200).send({ message: 'Login Success' });
      }
    } catch (error) {}
  }

 async findAll( res) {
    try {
      const users = await this.UserModel.find();
      res.status(200).send({data:users});
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
