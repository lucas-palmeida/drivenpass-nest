import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
  private SALT = 10;
  constructor(private readonly prisma: PrismaService) { }

  getUserByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: { email }
    });
  }

  create(createUserData: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        ...createUserData,
        password: bcrypt.hashSync(createUserData.password, this.SALT)
      }
    });
  }

  getByUserId(id: number) {
    return this.prisma.user.findFirst({
      where: { id }
    });
  }
}
