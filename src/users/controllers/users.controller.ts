import { Controller, Get, Param, Body, Post, Query } from '@nestjs/common';
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
  getUserById(@Param('id') id: string) {
    const user = this.users.find((u) => u.id === parseInt(id));
    return user || { message: 'User not found' };
  }

  @Post()
  createUser(@Body() userData: CreateUserDto) {
    const newUser = {
      id: this.users.length + 1,
      name: userData.name,
    };

    this.users.push(newUser);
    return this.users;
  }
}
