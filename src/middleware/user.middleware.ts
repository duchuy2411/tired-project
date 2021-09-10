import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

Model
@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}
