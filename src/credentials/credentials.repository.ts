import { Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import Cryptr = require('cryptr');

@Injectable()
export class CredentialsRepository {
  private readonly cryptr = new Cryptr(process.env.SECRET_KEY);

  constructor(private readonly prisma: PrismaService) { }
  
  createCredential(user: User, createCredentialDto: CreateCredentialDto) {
    return this.prisma.credential.create({
      data: {
        ...createCredentialDto,
        password: this.cryptr.encrypt(createCredentialDto.password),
        user: {
          connect: {
            id: user.id,
          }
        }
      }
    });
  }

  findByUserAndTitle(user: User, title: string) {
    return this.prisma.credential.findFirst({
      where: {
        title,
        userId: user.id,
      }
    });
  }

  findAll(user: User) {
    return this.prisma.credential.findMany({
      where: {
        userId: user.id,
      }
    });
  }

  findById(user: User, id: number) {
    return this.prisma.credential.findFirst({
      where: {
        id,
        userId: user.id,
      }
    });
  }

  remove(user: User, id: number) {
    return this.prisma.credential.delete({
      where: {
        id,
        userId: user.id,
      }
    });
  }
}
