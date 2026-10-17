import {
  IsString,
  IsArray,
  IsNumber,
  IsObject,
  IsIn,
  IsOptional,
  Min,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

class BilingualTextDto {
  @IsString()
  @IsNotEmpty()
  en: string;

  @IsString()
  @IsNotEmpty()
  bn: string;
}

export class CreateContentDto {
  @IsObject()
  @ValidateNested()
  @Type(() => BilingualTextDto)
  title: BilingualTextDto;

  @IsObject()
  @ValidateNested()
  @Type(() => BilingualTextDto)
  shortDescription: BilingualTextDto;

  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsString()
  @IsNotEmpty()
  coverImage: string;

  /** @deprecated use quillDeltaEn / quillDeltaBn */
  @IsOptional()
  @IsObject()
  quillDelta?: any;

  @IsOptional()
  @IsObject()
  quillDeltaEn?: any;

  @IsOptional()
  @IsObject()
  quillDeltaBn?: any;

  @IsNumber()
  @Min(0.0167)
  readTime: number;

  @IsString()
  @IsIn(['en', 'bn'])
  lang: 'en' | 'bn';

  @IsString()
  @IsNotEmpty()
  author: string;
}