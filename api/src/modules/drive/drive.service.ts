import { Inject, Injectable, Logger } from '@nestjs/common';
import { drive_v3 } from 'googleapis';
import { Readable } from 'stream';
import { DRIVE_CLIENT } from './drive.provider';

@Injectable()
export class DriveService {
  private readonly logger = new Logger(DriveService.name);
  private writeQueue = new Map<string, Promise<void>>();

  constructor(@Inject(DRIVE_CLIENT) private readonly drive: drive_v3.Drive) {}

  async readJson<T>(fileId: string): Promise<T> {
    try {
      const res = await this.drive.files.get(
        { fileId, alt: 'media' },
        { responseType: 'json' },
      );
      return res.data as T;
    } catch (error) {
      this.logger.error(`Failed to read file ${fileId}:`, error);
      throw error;
    }
  }

  async writeJson<T>(fileId: string, data: T): Promise<void> {
    const previous = this.writeQueue.get(fileId) ?? Promise.resolve();

    const next = previous.then(async () => {
      try {
        await this.drive.files.update({
          fileId,
          media: {
            mimeType: 'application/json',
            body: JSON.stringify(data, null, 2),
          },
        });
      } catch (error) {
        this.logger.error(`Failed to write file ${fileId}:`, error);
        throw error;
      }
    });

    this.writeQueue.set(
      fileId,
      next.catch(() => undefined),
    );

    return next;
  }

  async uploadImage(
    buffer: Buffer,
    name: string,
    mimeType: string,
  ): Promise<{ id: string; url: string }> {
    try {
      const folderId = process.env.DRIVE_IMAGES_FOLDER_ID;
      if (!folderId) throw new Error('DRIVE_IMAGES_FOLDER_ID is not set');

      // Convert Buffer to Readable Stream (googleapis requirement)
      const bufferStream = new Readable();
      bufferStream.push(buffer);
      bufferStream.push(null);

      const res = await this.drive.files.create({
        requestBody: {
          name,
          parents: [folderId],
        },
        media: {
          mimeType,
          body: bufferStream,
        },
        fields: 'id, webViewLink',
      });

      const fileId = res.data.id!;

      // Make file public
      await this.drive.permissions.create({
        fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });

      return {
        id: fileId,
        url: `https://drive.google.com/uc?id=${fileId}`,
      };
    } catch (error) {
      this.logger.error(`Failed to upload image ${name}:`, error);
      throw error;
    }
  }

  async deleteFile(fileId: string): Promise<void> {
    try {
      await this.drive.files.delete({ fileId });
    } catch (error) {
      this.logger.error(`Failed to delete file ${fileId}:`, error);
      throw error;
    }
  }
}
