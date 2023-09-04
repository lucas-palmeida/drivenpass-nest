import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) { }

  async createUser(createUserData: CreateUserDto) {
    const { email } = createUserData;

    const user = await this.repository.getUserByEmail(email);
    if (user) throw new ConflictException("Email already in use.");

    return await this.repository.create(createUserData);
  }

  async getUserByEmail(email: string) {
    return await this.repository.getUserByEmail(email);
  }

  async getByUserId(id: number) {
    return await this.repository.getByUserId(id);
  }
}
