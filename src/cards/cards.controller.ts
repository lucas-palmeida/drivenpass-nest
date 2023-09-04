import { Controller, Get, Post, Body, Param, Delete, UseGuards, ParseEnumPipe, ParseIntPipe } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { AuthGuard } from '../guards/auth.guard';
import { UserDecor } from '../decorators/user.decorator';
import { CardType, User } from '@prisma/client';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("cards")
@UseGuards(AuthGuard)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) { }

  @ApiOperation({
    summary: "create a new card"
  })
  @ApiBody({
    type: CreateCardDto
  })
  @Post()
  async createCard(@Body() createCardDto: CreateCardDto, @UserDecor() user: User) {
    return await this.cardsService.createCard(user, createCardDto);
  }

  @Get()
  async findAll(@UserDecor() user: User) {
    return await this.cardsService.findAll(user);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number, @UserDecor() user: User) {
    return await this.cardsService.findById(user, id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @UserDecor() user: User) {
    return await this.cardsService.remove(user, id);
  }
}
