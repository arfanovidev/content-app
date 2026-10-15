import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { DriveService } from '../drive/drive.service';
import { randomUUID } from 'crypto';

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);

  private readonly ALLOWED_MIME_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
  ];

  private readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

  constructor(private readonly drive: DriveService) {}

  async uploadImage(file: Express.Multer.File): Promise<{ id: string; url: string }> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    if (!this.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file type. Allowed: ${this.ALLOWED_MIME_TYPES.join(', ')}`,
      );
    }

    if (file.size > this.MAX_FILE_SIZE) {
      throw new BadRequestException(
        `File too large. Max ${this.MAX_FILE_SIZE / 1024 / 1024} MB`,
      );
    }

    const ext = file.originalname.split('.').pop() || 'jpg';
    const filename = `${randomUUID()}.${ext}`;

    this.logger.log(`Uploading ${filename} (${file.size} bytes)`);

    const result = await this.drive.uploadImage(
      file.buffer,
      filename,
      file.mimetype,
    );

    this.logger.log(`Uploaded: ${result.id} → ${result.url}`);

    return result;
  }
}
