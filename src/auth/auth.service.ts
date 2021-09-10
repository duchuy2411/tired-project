import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

import { User, UserDocument } from '../schemas/user.schema';

import { UserClass } from '../interface/iUser';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configServer: ConfigService,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    console.log("==login==:", user);
    const validateUser = await this.validateUser(user.username, user.password);
    if (!validateUser) {
      return null;
    }
    const payload = { username: validateUser.username, sub: validateUser._id };
    console.log("===payload===: ", payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(user: UserClass): Promise<any> {
    if (!user.username || !user.password) return null;
    const newUser = new this.userModel({ ...user });
    const saltOrRounds = 10;
    const password = newUser.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    newUser.password = hash;
    const saveUser = await newUser.save();
    if (saveUser) {
      const accessToken = { username: saveUser.username, sub: saveUser._id };
      return { accessToken: this.jwtService.sign(accessToken) };
    }
    return null;
  }
} 