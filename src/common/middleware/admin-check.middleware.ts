import { HttpException, HttpStatus, NestMiddleware } from '@nestjs/common';
import { JwtPayload } from '@src/users/auth/jwt-payload.model';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

export class AdminCheckMiddleware implements NestMiddleware {
  private readonly jwtPrivateKey: string = process.env.JWT_PRIVATE_KEY;

  use(req: Request, res: Response, next: NextFunction) {
    if (req.path === '/') {
      // console.log(req.originalUrl)
      next();
    } else {
      let token: string = req.headers['authorization'];
      if (!token) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
      token = token?.split(' ')[1];
      try {
        const decodedToken: JwtPayload = jwt.verify(token, this.jwtPrivateKey);
        const role = decodedToken.role;
        if (role === 'admin' || role === 'superAdmin') {
          next();
        } else {
          throw new HttpException('Not Allowed.', HttpStatus.FORBIDDEN);
        }
      } catch (error) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
    }
  }
}