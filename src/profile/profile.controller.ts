import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  Res,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { JwtGuard } from '../users/guards/jwt.gurd';
import { ProfileDto } from './profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}
  @UseGuards(JwtGuard)
  @Post('/create')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image', maxCount: 1 }], {
      storage: diskStorage({
        destination: async (req, file, callback) => {
          const dest = './uploads';
          callback(null, dest);
        },
        filename: async (req, file, cb) => {
          cb(null, Date.now() + path.extname(file.originalname));
        },
      }),
    }),
  )
  public createNew(
    @UploadedFiles()
    files: { image?: Express.Multer.File[] },
    @Body() profile: ProfileDto,
  ) {
    const { image } = files;
    const fileImage = image && image[0];
    let newUser = { ...profile };
    if (fileImage) {
      newUser = {
        ...profile,
        image: fileImage.filename,
      };
    }
    return this.profileService.createNew(newUser);
  }
}
