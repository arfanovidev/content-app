import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { DriveService } from '../drive/drive.service';
import { CompletedRecord } from './entities/completed.entity';
import { CreateCompletedDto } from './dto/create-completed.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class CompletedService {
  private readonly logger = new Logger(CompletedService.name);
  private writeQueue: Promise<void> = Promise.resolve();

  constructor(private readonly drive: DriveService) {}

  private get fileId(): string {
    const id = process.env.DRIVE_COMPLETED_FILE_ID;
    if (!id) throw new Error('DRIVE_COMPLETED_FILE_ID not set');
    return id;
  }

  private async getAll(): Promise<CompletedRecord[]> {
    const data = await this.drive.readJson<CompletedRecord[]>(this.fileId);
    return Array.isArray(data) ? data : [];
  }

  private async saveAll(records: CompletedRecord[]): Promise<void> {
    this.writeQueue = this.writeQueue.then(async () => {
      await this.drive.writeJson(this.fileId, records);
    });
    return this.writeQueue;
  }

  async listByUser(userKey: string): Promise<CompletedRecord[]> {
    const all = await this.getAll();
    return all
      .filter((r) => r.userKey === userKey)
      .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
  }

  async markComplete(dto: CreateCompletedDto): Promise<CompletedRecord> {
    const all = await this.getAll();
    const existing = all.find(
      (r) => r.contentId === dto.contentId && r.userKey === dto.userKey,
    );
    if (existing) {
      throw new ConflictException('Content already marked as complete');
    }

    const record: CompletedRecord = {
      id: randomUUID(),
      contentId: dto.contentId,
      userKey: dto.userKey,
      completedAt: new Date().toISOString(),
      readDuration: dto.readDuration,
    };

    all.unshift(record);
    await this.saveAll(all);
    this.logger.log(`Completed: ${dto.contentId} by ${dto.userKey}`);
    return record;
  }

  async remove(contentId: string, userKey: string): Promise<{ success: true }> {
    const all = await this.getAll();
    const filtered = all.filter(
      (r) => !(r.contentId === contentId && r.userKey === userKey),
    );
    if (filtered.length === all.length) {
      throw new NotFoundException('Completion record not found');
    }
    await this.saveAll(filtered);
    this.logger.log(`Uncompleted: ${contentId} by ${userKey}`);
    return { success: true };
  }
}
