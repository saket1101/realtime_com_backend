import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  create(@Body() body:any,@Res() res:Response) {
    return this.usersService.create(body,res);
  }
  @Post('/login')
  login(@Body() body:any,@Res() res:Response) {
    return this.usersService.login(body,res);
  }

  @Get('/getAll')
  findAll(@Res() res:Response) {
    return this.usersService.findAll(res);
  }


}
