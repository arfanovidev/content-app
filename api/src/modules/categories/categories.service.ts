import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { DriveService } from '../drive/drive.service';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);

  constructor(private readonly drive: DriveService) {}

  private get fileId(): string {
    const id = process.env.DRIVE_CATEGORIES_FILE_ID;
    if (!id) throw new Error('DRIVE_CATEGORIES_FILE_ID not set');
    return id;
  }

  private async getAll(): Promise<Category[]> {
    const data = await this.drive.readJson<Category[]>(this.fileId);
    return Array.isArray(data) ? data : [];
  }

  private async saveAll(categories: Category[]): Promise<void> {
    await this.drive.writeJson(this.fileId, categories);
  }

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private async uniqueSlug(baseSlug: string): Promise<string> {
    const categories = await this.getAll();
    const existing = new Set(categories.map((c) => c.slug));

    if (!existing.has(baseSlug)) return baseSlug;

    let counter = 2;
    while (existing.has(`${baseSlug}-${counter}`)) {
      counter++;
    }
    return `${baseSlug}-${counter}`;
  }

  async list(): Promise<Category[]> {
    const categories = await this.getAll();
    return categories.sort((a, b) => a.order - b.order);
  }

  async findBySlug(slug: string): Promise<Category> {
    const categories = await this.getAll();
    const found = categories.find((c) => c.slug === slug);

    if (!found) {
      throw new NotFoundException(`Category with slug "${slug}" not found`);
    }

    return found;
  }

  async findById(id: string): Promise<Category> {
    const categories = await this.getAll();
    const found = categories.find((c) => c.id === id);

    if (!found) {
      throw new NotFoundException(`Category with id "${id}" not found`);
    }

    return found;
  }

  async create(dto: CreateCategoryDto): Promise<Category> {
    const baseSlug = this.generateSlug(dto.name.en);
    if (!baseSlug) {
      throw new BadRequestException('Name must contain valid characters');
    }

    const slug = await this.uniqueSlug(baseSlug);
    const now = new Date().toISOString();

    const categories = await this.getAll();
    const maxOrder = categories.reduce((max, c) => Math.max(max, c.order), 0);
    const order = dto.order ?? maxOrder + 1;

    const category: Category = {
      id: randomUUID(),
      slug,
      name: dto.name,
      description: dto.description,
      icon: dto.icon ?? '',
      order,
      publishedAt: now,
      updatedAt: now,
    };

    categories.push(category);
    await this.saveAll(categories);

    this.logger.log(`Created category: ${category.slug} (${category.id})`);
    return category;
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<Category> {
    const categories = await this.getAll();
    const index = categories.findIndex((c) => c.id === id);

    if (index === -1) {
      throw new NotFoundException(`Category with id "${id}" not found`);
    }

    const existing = categories[index];

    let newSlug = existing.slug;
    if (dto.name?.en && dto.name.en !== existing.name.en) {
      const baseSlug = this.generateSlug(dto.name.en);
      newSlug = await this.uniqueSlug(baseSlug);
    }

    const updated: Category = {
      ...existing,
      ...dto,
      slug: newSlug,
      name: dto.name ?? existing.name,
      description: dto.description ?? existing.description,
      updatedAt: new Date().toISOString(),
    };

    categories[index] = updated;
    await this.saveAll(categories);

    this.logger.log(`Updated category: ${updated.slug} (${updated.id})`);
    return updated;
  }

  async remove(id: string): Promise<{ success: true; id: string }> {
    const categories = await this.getAll();
    const exists = categories.some((c) => c.id === id);

    if (!exists) {
      throw new NotFoundException(`Category with id "${id}" not found`);
    }

    const filtered = categories.filter((c) => c.id !== id);
    await this.saveAll(filtered);

    this.logger.log(`Deleted category: ${id}`);
    return { success: true, id };
  }
}
