import { Body, Controller, Post } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  @Post('login')
  login(@Body() body: AuthPayloadDto) {
    // Implement login logic here
    return { message: `User ${body.username} logged in successfully.` };
  }
}
