import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';
require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', ''),
    }),
    UsersModule,
    ProfileModule,
  ],
})
export class AppModule {}
