import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const date = (): string => new Date().toLocaleString();
    console.log(
      `Estas ejecutando un metodo ${req.method} en la ruta ${req.originalUrl} con fecha/hora: ${date()}`,
    );

    next();
  }
}
