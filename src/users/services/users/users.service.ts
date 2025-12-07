import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserType } from '../../utils/type';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 44 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 54 },
  ];

  getAllUsers(name?: string) {
    if (name) {
      return this.users.filter((user) =>
        user.name.toLowerCase().includes(name.toLowerCase()),
      );
    }

    console.log('usrs');

    return this.users;
  }

  getUserById(id: number) {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  createUser(userData: CreateUserType) {
    const newUser = {
      id: this.users.length + 1,
      ...userData,
    };

    this.users.push(newUser);
    return newUser;
  }
}
