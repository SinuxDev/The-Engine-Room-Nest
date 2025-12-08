import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('AuthGuard: Checking authentication...');
    const request = context.switchToHttp().getRequest<Request>();
    const isAuthenticated = Boolean(request.headers['authorization']);
    return isAuthenticated;
  }
}
