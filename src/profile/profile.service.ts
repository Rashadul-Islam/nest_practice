import { InjectModel } from '@nestjs/mongoose';
import { Injectable, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { IProfile } from 'src/profile/interface/profile.interface';
import { ProfileDto } from './profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel('Profile') private readonly profileModel: Model<IProfile>,
  ) {}

  public async createNew(profileData: ProfileDto) {
    const profile = new this.profileModel(profileData);
    const newProfile = await profile.save();
    if (!newProfile) {
      throw new HttpException('Not Found', 404);
    }
    return newProfile;
  }

  public async getAllProfile(): Promise<ProfileDto[]> {
    const user = await this.profileModel.find().populate("user");
    if (!user || !user[0]) {
      throw new HttpException('Not Found', 404);
    }
    return user;
  }
}
