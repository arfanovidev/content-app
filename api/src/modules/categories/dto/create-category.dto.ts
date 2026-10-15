import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsObject,
  ValidateNested,
  IsOptional,
  Min,
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

export class CreateCategoryDto {
  @IsObject()
  @ValidateNested()
  @Type(() => BilingualTextDto)
  name: BilingualTextDto;

  @IsObject()
  @ValidateNested()
  @Type(() => BilingualTextDto)
  description: BilingualTextDto;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  order?: number;
}
