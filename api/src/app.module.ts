import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DriveModule } from './modules/drive/drive.module';
import { ContentsModule } from './modules/contents/contents.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { AuthModule } from './modules/auth/auth.module';
import { UploadModule } from './modules/upload/upload.module';
import { WeatherModule } from './modules/weather/weather.module';
import { CompletedModule } from './modules/completed/completed.module';
import { VotesModule } from './modules/votes/votes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DriveModule,
    ContentsModule,
    CategoriesModule,
    AuthModule,
    UploadModule,
    WeatherModule,
    CompletedModule,
    VotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
