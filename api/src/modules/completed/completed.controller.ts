import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CompletedService } from './completed.service';
import { CreateCompletedDto } from './dto/create-completed.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('completed')
@UseGuards(JwtAuthGuard)
export class CompletedController {
  constructor(private readonly completedService: CompletedService) {}

  @Post()
  async markComplete(
    @Body() dto: CreateCompletedDto,
    @CurrentUser() user: any,
  ) {
    return this.completedService.markComplete({
      ...dto,
      userKey: user.userId,  // ← use authenticated user ID
    });
  }

  @Get()
  async listByUser(@CurrentUser() user: any) {
    return this.completedService.listByUser(user.userId);  // ← user from JWT
  }

  @Delete(':contentId')
  async remove(
    @Param('contentId') contentId: string,
    @CurrentUser() user: any,
  ) {
    return this.completedService.remove(contentId, user.userId);
  }
}