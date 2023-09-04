import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { CredentialsRepository } from './credentials.repository';
import { User } from '@prisma/client';
import Cryptr = require('cryptr');

@Injectable()
export class CredentialsService {
  private readonly cryptr = new Cryptr(process.env.SECRET_KEY);

  constructor(private readonly credentialsRepository: CredentialsRepository) { }

  async createCredential(user: User, createCredentialDto: CreateCredentialDto) {
    const alreadyExists = await this.credentialsRepository.findByUserAndTitle(user, createCredentialDto.title);
    
    if (alreadyExists) throw new ConflictException('Credential already exists');

    return await this.credentialsRepository.createCredential(user, createCredentialDto);
  }

  async findAll(user: User) {
    const userCredentials = await this.credentialsRepository.findAll(user);

    userCredentials.map(credential => {
      credential.password = this.cryptr.decrypt(credential.password);
    });

    return userCredentials;
  }

  async findById(user: User, id: number) {
    const credential = await this.credentialsRepository.findById(user, id);
    if(!credential) throw new NotFoundException();

    const decryptedPassword = this.cryptr.decrypt(credential.password);

    return { ...credential, password: decryptedPassword };
  }

  async remove(user: User, id: number) {
    const credential = await this.credentialsRepository.findById(user, id);
    if(!credential) throw new NotFoundException();

    return await this.credentialsRepository.remove(user, id);
  }
}
