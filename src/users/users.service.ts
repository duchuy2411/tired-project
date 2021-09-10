import { Injectable } from '@nestjs/common';
import  { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserDocument, User } from '../schemas/user.schema';
// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ){}

  async findOne(username: string): Promise<any> {
    return this.userModel.findOne({ username });
  }
}