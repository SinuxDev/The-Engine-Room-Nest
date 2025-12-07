import { Injectable, NestMiddleware } from '@nestjs/common';
import { type NextFunction, type Request, type Response } from 'express';

@Injectable()
export class ExampleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: [{ error: 'Unauthorized' }] });
    }

    if (authorization !== 'Bearer example-token') {
      return res
        .status(403)
        .json({ message: [{ error: 'Forbidden - Invalid token' }] });
    }

    next();
  }
}
