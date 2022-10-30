import { UserDto } from './user.dto';
import { IUser } from './interface/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>,
    private jwtService: JwtService,
  ) {}

  public async signUpUser(response: Response, userData: UserDto) {
    const user = new this.userModel(userData);
    const newRes = await user.save();
    if (!newRes) {
      throw new HttpException('Not Found', 404);
    }
    const jwt = await this.jwtService.sign({ name: newRes._id });
    response.cookie('jwt', jwt, { httpOnly: true });
    return newRes;
  }

  public async loginUser(response: Response, userData: UserDto) {
    const loginUser = await this.userModel
      .findOne({ email: userData.email })
      .exec();

    if (loginUser) {
      const isValidUser = await bcrypt.compare(
        userData.password,
        loginUser.password,
      );
      if (isValidUser) {
        const jwt = await this.jwtService.sign({ name: loginUser._id });
        response.cookie('jwt', jwt, { httpOnly: true });
        return loginUser;
      } else {
        throw new HttpException('Authentication error', 404);
      }
    } else {
      throw new HttpException('Authentication error', 404);
    }
  }
  public async getAllUser(): Promise<UserDto[]> {
    const user = await this.userModel.find();
    if (!user || !user[0]) {
      throw new HttpException('Not Found', 404);
    }
    return user;
  }
}
