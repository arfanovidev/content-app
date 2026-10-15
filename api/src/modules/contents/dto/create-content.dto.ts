import {
  IsString,
  IsArray,
  IsNumber,
  IsObject,
  IsIn,
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

  @IsObject()
  quillDelta: any;

  @IsNumber()
  @Min(1)
  readTime: number;

  @IsString()
  @IsIn(['en', 'bn'])
  lang: 'en' | 'bn';

  @IsString()
  @IsNotEmpty()
  author: string;
}