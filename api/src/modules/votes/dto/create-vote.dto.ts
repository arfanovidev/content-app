import { IsString, IsNotEmpty, IsIn, IsInt } from 'class-validator';

export class CreateVoteDto {
  @IsString()
  @IsNotEmpty()
  contentId: string;

  @IsString()
  @IsNotEmpty()
  userKey: string;

  @IsInt()
  @IsIn([1, -1])
  value: 1 | -1;
}
