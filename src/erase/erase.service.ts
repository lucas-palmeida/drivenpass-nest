import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateEraseDto } from './dto/create-erase.dto';
import { User } from '@prisma/client';
import { EraseRepository } from './erase.repository';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EraseService {
  constructor(
    private readonly eraseRepository: EraseRepository,
    private readonly usersService: UsersService
  ) { }

  async remove(user: User, createEraseDto: CreateEraseDto) {
    const { password } = createEraseDto;
    const userData = await this.usersService.getByUserId(user.id);
    
    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) throw new UnauthorizedException("Invalid password.");

    return await this.eraseRepository.removeUserData(user.id);
  }
}
