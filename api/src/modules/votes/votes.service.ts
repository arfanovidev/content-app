import { Injectable, Logger } from '@nestjs/common';
import { DriveService } from '../drive/drive.service';
import { VoteRecord } from './entities/vote.entity';
import { CreateVoteDto } from './dto/create-vote.dto';
import { randomUUID } from 'crypto';

export interface VoteTally {
  contentId: string;
  up: number;
  down: number;
  score: number;
}

@Injectable()
export class VotesService {
  private readonly logger = new Logger(VotesService.name);
  private writeQueue: Promise<void> = Promise.resolve();

  constructor(private readonly drive: DriveService) {}

  private get fileId(): string {
    const id = process.env.DRIVE_VOTES_FILE_ID;
    if (!id) throw new Error('DRIVE_VOTES_FILE_ID not set');
    return id;
  }

  private async getAll(): Promise<VoteRecord[]> {
    const data = await this.drive.readJson<VoteRecord[]>(this.fileId);
    return Array.isArray(data) ? data : [];
  }

  private async saveAll(records: VoteRecord[]): Promise<void> {
    this.writeQueue = this.writeQueue.then(async () => {
      await this.drive.writeJson(this.fileId, records);
    });
    return this.writeQueue;
  }

  private tally(contentId: string, records: VoteRecord[]): VoteTally {
    const votes = records.filter((r) => r.contentId === contentId);
    const up = votes.filter((v) => v.value === 1).length;
    const down = votes.filter((v) => v.value === -1).length;
    return { contentId, up, down, score: up - down };
  }

  async vote(dto: CreateVoteDto): Promise<VoteTally> {
    const all = await this.getAll();
    const filtered = all.filter(
      (v) => !(v.contentId === dto.contentId && v.userKey === dto.userKey),
    );
    const vote: VoteRecord = {
      id: randomUUID(),
      contentId: dto.contentId,
      userKey: dto.userKey,
      value: dto.value,
      votedAt: new Date().toISOString(),
    };
    filtered.push(vote);
    await this.saveAll(filtered);
    this.logger.log(`Vote: ${dto.value} on ${dto.contentId} by ${dto.userKey}`);
    return this.tally(dto.contentId, filtered);
  }

  async getTally(contentId: string): Promise<VoteTally> {
    const all = await this.getAll();
    return this.tally(contentId, all);
  }

  async getUserVote(
    contentId: string,
    userKey: string,
  ): Promise<{ value: 1 | -1 | 0 }> {
    const all = await this.getAll();
    const vote = all.find(
      (v) => v.contentId === contentId && v.userKey === userKey,
    );
    return { value: vote?.value ?? 0 };
  }

  async getUserVotes(userKey: string): Promise<VoteRecord[]> {
    const all = await this.getAll();
    return all.filter((v) => v.userKey === userKey);
  }
}
