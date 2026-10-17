import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { DriveService } from '../drive/drive.service';
import { Content } from './entities/content.entity';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class ContentsService {
  private readonly logger = new Logger(ContentsService.name);

  constructor(private readonly drive: DriveService) {}

  private get fileId(): string {
    const id = process.env.DRIVE_CONTENTS_FILE_ID;
    if (!id) throw new Error('DRIVE_CONTENTS_FILE_ID not set');
    return id;
  }

  private async getAll(): Promise<Content[]> {
    const data = await this.drive.readJson<Content[]>(this.fileId);
    return Array.isArray(data) ? data : [];
  }

  private async saveAll(contents: Content[]): Promise<void> {
    await this.drive.writeJson(this.fileId, contents);
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private async uniqueSlug(baseSlug: string): Promise<string> {
    const contents = await this.getAll();
    const existing = new Set(contents.map((c) => c.slug));

    if (!existing.has(baseSlug)) return baseSlug;

    let counter = 2;
    while (existing.has(`${baseSlug}-${counter}`)) {
      counter++;
    }
    return `${baseSlug}-${counter}`;
  }

  /**
   * Normalize delta fields.
   * Legacy fallback: if only quillDelta is set, route it to quillDeltaEn/Bn
   * based on the `lang` field.
   */
  private normalizeDeltas(dto: {
    quillDelta?: any;
    quillDeltaEn?: any;
    quillDeltaBn?: any;
    lang?: 'en' | 'bn';
  }): { quillDeltaEn?: any; quillDeltaBn?: any } {
    const out: { quillDeltaEn?: any; quillDeltaBn?: any } = {};

    if (dto.quillDeltaEn !== undefined) out.quillDeltaEn = dto.quillDeltaEn;
    if (dto.quillDeltaBn !== undefined) out.quillDeltaBn = dto.quillDeltaBn;

    // Legacy: only quillDelta provided → route by lang
    if (
      dto.quillDelta !== undefined &&
      dto.quillDeltaEn === undefined &&
      dto.quillDeltaBn === undefined
    ) {
      if (dto.lang === 'bn') out.quillDeltaBn = dto.quillDelta;
      else out.quillDeltaEn = dto.quillDelta;
    }

    return out;
  }

  async list(categoryId?: string): Promise<Content[]> {
    const contents = await this.getAll();

    if (categoryId) {
      return contents.filter((c) => c.categoryId === categoryId);
    }

    return contents;
  }

  async findBySlug(slug: string): Promise<Content> {
    const contents = await this.getAll();
    const found = contents.find((c) => c.slug === slug);

    if (!found) {
      throw new NotFoundException(`Content with slug "${slug}" not found`);
    }

    return found;
  }

  async findById(id: string): Promise<Content> {
    const contents = await this.getAll();
    const found = contents.find((c) => c.id === id);

    if (!found) {
      throw new NotFoundException(`Content with id "${id}" not found`);
    }

    return found;
  }

  async create(dto: CreateContentDto): Promise<Content> {
    const baseSlug = this.generateSlug(dto.title.en);
    if (!baseSlug) {
      throw new BadRequestException('Title must contain valid characters');
    }

    const slug = await this.uniqueSlug(baseSlug);
    const now = new Date().toISOString();
    const deltas = this.normalizeDeltas(dto);

    const content: Content = {
      id: randomUUID(),
      slug,
      title: dto.title,
      shortDescription: dto.shortDescription,
      categoryId: dto.categoryId,
      tags: dto.tags ?? [],
      coverImage: dto.coverImage,
      // legacy field — set to primary language's delta
      quillDelta:
        dto.quillDelta ??
        (dto.lang === 'bn' ? deltas.quillDeltaBn : deltas.quillDeltaEn),
      quillDeltaEn: deltas.quillDeltaEn,
      quillDeltaBn: deltas.quillDeltaBn,
      readTime: dto.readTime,
      lang: dto.lang,
      author: dto.author,
      publishedAt: now,
      updatedAt: now,
    };

    const contents = await this.getAll();
    contents.unshift(content);
    await this.saveAll(contents);

    this.logger.log(`Created content: ${content.slug} (${content.id})`);
    return content;
  }

  async update(id: string, dto: UpdateContentDto): Promise<Content> {
    const contents = await this.getAll();
    const index = contents.findIndex((c) => c.id === id);

    if (index === -1) {
      throw new NotFoundException(`Content with id "${id}" not found`);
    }

    const existing = contents[index];

    let newSlug = existing.slug;
    if (dto.title?.en && dto.title.en !== existing.title.en) {
      const baseSlug = this.generateSlug(dto.title.en);
      newSlug = await this.uniqueSlug(baseSlug);
    }

    const deltas = this.normalizeDeltas({
      ...dto,
      lang: dto.lang ?? existing.lang,
    });

    const updated: Content = {
      ...existing,
      ...dto,
      slug: newSlug,
      title: dto.title ?? existing.title,
      shortDescription: dto.shortDescription ?? existing.shortDescription,
      quillDelta: dto.quillDelta ?? existing.quillDelta,
      quillDeltaEn: deltas.quillDeltaEn ?? existing.quillDeltaEn,
      quillDeltaBn: deltas.quillDeltaBn ?? existing.quillDeltaBn,
      updatedAt: new Date().toISOString(),
    };

    contents[index] = updated;
    await this.saveAll(contents);

    this.logger.log(`Updated content: ${updated.slug} (${updated.id})`);
    return updated;
  }

  async remove(id: string): Promise<{ success: true; id: string }> {
    const contents = await this.getAll();
    const exists = contents.some((c) => c.id === id);

    if (!exists) {
      throw new NotFoundException(`Content with id "${id}" not found`);
    }

    const filtered = contents.filter((c) => c.id !== id);
    await this.saveAll(filtered);

    this.logger.log(`Deleted content: ${id}`);
    return { success: true, id };
  }
}