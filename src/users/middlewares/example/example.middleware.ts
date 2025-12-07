import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ExampleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (authorization === 'Bearer example-token') next();

    if (!authorization) {
      return res.status(401).json({ message: [{ error: 'Unauthorized' }] });
    }

    next();
  }
}
