import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async vote(@Body() dto: CreateVoteDto) {
    return this.votesService.vote(dto);
  }

  @Get('user/:userKey')
  async getUserVotes(@Param('userKey') userKey: string) {
    return this.votesService.getUserVotes(userKey);
  }

  @Get(':contentId')
  async getTally(
    @Param('contentId') contentId: string,
    @Query('userKey') userKey?: string,
  ) {
    const tally = await this.votesService.getTally(contentId);
    if (userKey) {
      const userVote = await this.votesService.getUserVote(contentId, userKey);
      return { ...tally, userVote: userVote.value };
    }
    return tally;
  }
}
