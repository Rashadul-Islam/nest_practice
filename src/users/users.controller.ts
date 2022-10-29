import { UserDto } from './user.dto';
import { UsersService } from './users.service';
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
} from '@nestjs/common';
import { Response } from 'express';
import { JwtGuard } from './guards/jwt.gurd';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}
  // @UseGuards(JwtGuard)
  @Post('/signUp')
  public signUpUser(
    @Res({ passthrough: true }) response: Response,
    @Body() user: UserDto,
  ) {
    return this.usersService.signUpUser(response, user);
  }

  @Post('/login')
  public loginUser(
    @Res({ passthrough: true }) response: Response,
    @Body() user: UserDto,
  ) {
    return this.usersService.loginUser(response, user);
  }
}
