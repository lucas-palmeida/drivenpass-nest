import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { CardsRepository } from './cards.repository';
import { User } from '@prisma/client';
import Cryptr = require('cryptr');

@Injectable()
export class CardsService {
  private readonly cryptr = new Cryptr(process.env.SECRET_KEY);

  constructor(private readonly cardsRepository: CardsRepository) { }

  async createCard(user: User, createCardDto: CreateCardDto) {
    const card = await this.cardsRepository.findByUserAndTitle(user, createCardDto.title);
    if(card) throw new ConflictException('Card with this title already exists');

    return await this.cardsRepository.createCard(user, createCardDto);
  }

  async findAll(user: User) {
    const userCards = await this.cardsRepository.findAll(user);

    if(!userCards.length) return userCards;

    userCards.map(card => {
      card.cvv = this.cryptr.decrypt(card.cvv);
      card.password = this.cryptr.decrypt(card.password);
    })

    return userCards;
  }

  async findById(user: User, id: number) {
    const card = await this.cardsRepository.findById(user, id);
    if(!card) throw new NotFoundException('Card not found');

    const cvvDecrypted = this.cryptr.decrypt(card.cvv);
    const passwordDecrypted = this.cryptr.decrypt(card.password);

    return { ...card, cvv: cvvDecrypted, password: passwordDecrypted };
  }

  async remove(user: User, id: number) {
    const card = this.cardsRepository.findById(user, id);
    if(!card) throw new NotFoundException('Card not found');

    return await this.cardsRepository.remove(user, id);
  }
}
