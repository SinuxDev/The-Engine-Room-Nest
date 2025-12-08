import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/role.decorator';

const fakeUser = {
  id: 1,
  name: 'John Doe',
  roles: ['user'],
};

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('RoleGuard: ');
    const roles = this.reflector.get(Roles, context.getHandler());

    if (roles.every((role) => fakeUser.roles.includes(role))) {
      console.log(
        `RoleGuard: Access granted for user with roles [${fakeUser.roles.join(', ')}]`,
      );
      return true;
    }

    console.log(
      `RoleGuard: Access denied for user with roles [${fakeUser.roles.join(', ')}]`,
    );

    return false;
  }
}
