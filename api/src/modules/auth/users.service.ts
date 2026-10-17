import { Injectable, Logger } from '@nestjs/common';
import { DriveService } from '../drive/drive.service';
import { UserRecord } from './entities/user.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly drive: DriveService) {}

  private get fileId(): string {
    const id = process.env.DRIVE_USERS_FILE_ID;
    if (!id) throw new Error('DRIVE_USERS_FILE_ID not set');
    return id;
  }

  private async getAll(): Promise<UserRecord[]> {
    try {
      const data = await this.drive.readJson<UserRecord[]>(this.fileId);
      return Array.isArray(data) ? data : [];
    } catch (err) {
      this.logger.warn(`users readJson failed: ${(err as Error)?.message ?? err}`);
      return [];
    }
  }

  private async saveAll(users: UserRecord[]): Promise<void> {
    await this.drive.writeJson(this.fileId, users);
  }

  async findByEmail(email: string): Promise<UserRecord | null> {
    const users = await this.getAll();
    const normalized = email.toLowerCase().trim();
    return users.find((u) => u.email.toLowerCase() === normalized) ?? null;
  }

  async findByUsername(username: string): Promise<UserRecord | null> {
    const users = await this.getAll();
    const normalized = username.toLowerCase().trim();
    return users.find((u) => u.username.toLowerCase() === normalized) ?? null;
  }

  async create(data: {
    username: string;
    email: string;
    passwordHash: string;
    provider?: 'email' | 'google';
    role?: 'user' | 'admin';
  }): Promise<UserRecord> {
    const users = await this.getAll();
    const now = new Date().toISOString();

    const user: UserRecord = {
      id: randomUUID(),
      username: data.username.trim(),
      email: data.email.toLowerCase().trim(),
      passwordHash: data.passwordHash,
      role: data.role ?? 'user',
      provider: data.provider ?? 'email',
      createdAt: now,
      updatedAt: now,
    };

    users.push(user);
    await this.saveAll(users);
    return user;
  }

  async upsertGoogleUser(data: {
    email: string;
    name?: string;
    provider: 'google';
  }): Promise<UserRecord> {
    const existing = await this.findByEmail(data.email);
    if (existing) return existing;

    return this.create({
      username: data.name || data.email.split('@')[0],
      email: data.email,
      passwordHash: '',
      provider: 'google',
      role: 'user',
    });
  }
}