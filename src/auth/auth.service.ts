import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';

const fakeUsers = [
  { username: 'admin', password: 'admin' },
  { username: 'user', password: 'user' },
];

@Injectable()
export class AuthService {
  validateUser(authPayloadDTO: AuthPayloadDto) {
    const { username, password } = authPayloadDTO;

    const finUser = fakeUsers.find(
      (user) => user.username === username && user.password === password,
    );

    return finUser ? true : false;
  }
}
