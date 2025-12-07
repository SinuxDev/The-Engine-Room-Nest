import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/CreateUser.dto';

@Controller('users')
export class UsersController {
  private users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
  ];

  @Get()
  getAllUsers(@Query('name') name?: string) {
    if (name) {
      return this.users.filter((user) =>
        user.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()),
      );
    }
    return this.users;
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.users.find((u) => u.id === id);
    return user || { message: 'User not found' };
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createUser(@Body() userData: CreateUserDto) {
    console.log('Creating user with data:', userData);
    const newUser = {
      id: this.users.length + 1,
      name: userData.name,
      email: userData.email,
    };

    this.users.push(newUser);
    return this.users;
  }
}
