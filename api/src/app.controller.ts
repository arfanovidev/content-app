import {
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { AppService } from './app.service';
import { DriveService } from './modules/drive/drive.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly appService: AppService,
    private readonly driveService: DriveService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test-drive')
  async testDrive() {
    try {
      const fileId = process.env.DRIVE_CONTENTS_FILE_ID;
      this.logger.log(`Testing Drive with fileId: ${fileId}`);

      const contents = await this.driveService.readJson<any[]>(fileId!);

      return {
        success: true,
        message: 'Google Drive connection working!',
        contentsCount: contents.length,
        contents,
      };
    } catch (error) {
      this.logger.error('Drive test failed:', error);

      const err = error as Error & { code?: string };

      throw new InternalServerErrorException({
        message: 'Drive connection failed',
        error: err.message,
        code: err.code,
      });
    }
  }
}