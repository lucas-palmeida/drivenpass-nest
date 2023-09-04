import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import Cryptr = require('cryptr');

@Injectable()
export class CardsRepository {
  private readonly cryptr = new Cryptr(process.env.SECRET_KEY);

  constructor(private readonly prisma: PrismaService) { }

  createCard(user: User, createCardDto: CreateCardDto) {
    return this.prisma.card.create({
      data: {
        ...createCardDto,
        cvv: this.cryptr.encrypt(createCardDto.cvv),
        password: this.cryptr.encrypt(createCardDto.password),
        user: {
          connect: {
            id: user.id
          }
        }
      }
    });
  }

  findByUserAndTitle(user: User, title: string) {
    return this.prisma.card.findFirst({
      where: {
        title,
        userId: user.id
      }
    });
  }

  findAll(user: User) {
    return this.prisma.card.findMany({
      where: {
        userId: user.id
      }
    });
  }

  findById(user: User, id: number) {
    return this.prisma.card.findFirst({
      where: {
        id,
        userId: user.id
      }
    });
  }

  remove(user: User, id: number) {
    return this.prisma.card.delete({
      where: {
        id,
        userId: user.id
      }
    });
  }
}
