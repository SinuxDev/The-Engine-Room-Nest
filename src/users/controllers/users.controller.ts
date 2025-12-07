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
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/CreateUser.dto';
import { UsersService } from '../services/users/users.service';
import { ValidateCreateUserPipe } from '../pipes/validate-create-user/validate-create-user.pipe';
import { AuthGuard } from '../guards/auth/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAllUsers(@Query('name') name?: string) {
    return this.userService.getAllUsers(name);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  createUser(@Body(ValidateCreateUserPipe) userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }
}
