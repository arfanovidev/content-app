import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateCompletedDto {
  @IsString()
  @IsNotEmpty()
  contentId: string;

  @IsString()
  @IsNotEmpty()
  userKey: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  readDuration?: number;
}
