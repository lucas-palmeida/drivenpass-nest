import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class NotesRepository {
  constructor(private readonly prisma: PrismaService) { }
  
  create(user: User, createNoteDto: CreateNoteDto) {
    return this.prisma.note.create({
      data: {
        ...createNoteDto,
        user: {
          connect: {
            id: user.id,
          }
        }
      }
    });
  }

  findByUserAndTitle(user: User, title: string) {
    return this.prisma.note.findFirst({
      where: {
        title,
        userId: user.id,
      }
    });
  }

  findAll(user: User) {
    return this.prisma.note.findMany({
      where: {
        userId: user.id,
      }
    });
  }

  findById(user: User, id: number) {
    return this.prisma.note.findFirst({
      where: {
        id,
        userId: user.id,
      }
    });
  }

  remove(user: User, id: number) {
    return this.prisma.note.delete({
      where: {
        id,
        userId: user.id,
      }
    });
  }
}
