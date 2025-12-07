import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateUserDto } from '../../dtos/CreateUser.dto';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    if (typeof value.age !== 'number') {
      throw new BadRequestException('Age must be a number, not a string');
    }

    if (!Number.isInteger(value.age) || value.age <= 0) {
      throw new BadRequestException('Age must be a positive integer');
    }

    return value;
  }
}
