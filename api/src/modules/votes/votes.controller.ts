import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async vote(
    @Body() dto: CreateVoteDto,
    @CurrentUser() user: any,
  ) {
    return this.votesService.vote({
      ...dto,
      userKey: user.userId,
    });
  }

  @Get('user/:userKey')
  async getUserVotes(@Param('userKey') userKey: string) {
    return this.votesService.getUserVotes(userKey);
  }

  @Get(':contentId')
  async getTally(@Param('contentId') contentId: string) {
    return this.votesService.getTally(contentId);
  }
}