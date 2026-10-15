import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CompletedService } from './completed.service';
import { CreateCompletedDto } from './dto/create-completed.dto';

@Controller('completed')
export class CompletedController {
  constructor(private readonly completedService: CompletedService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async markComplete(@Body() dto: CreateCompletedDto) {
    return this.completedService.markComplete(dto);
  }

  @Get()
  async listByUser(@Query('userKey') userKey: string) {
    return this.completedService.listByUser(userKey);
  }

  @Delete(':contentId')
  async remove(
    @Param('contentId') contentId: string,
    @Query('userKey') userKey: string,
  ) {
    return this.completedService.remove(contentId, userKey);
  }
}
