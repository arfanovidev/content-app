import { Global, Module } from '@nestjs/common';
import { DriveService } from './drive.service';
import { driveProvider } from './drive.provider';

@Global()
@Module({
  providers: [driveProvider, DriveService],
  exports: [DriveService],
})
export class DriveModule {}