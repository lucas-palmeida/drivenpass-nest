import { Controller, Get, Post, Body, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserDecor } from 'src/decorators/user.decorator';
import { User } from '@prisma/client';

@UseGuards(AuthGuard)
@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) { }

  @Post()
  async createCredential(@Body() createCredentialDto: CreateCredentialDto, @UserDecor() user: User) {
    return await this.credentialsService.createCredential(user, createCredentialDto);
  }

  @Get()
  async findAll(@UserDecor() user: User) {
    return await this.credentialsService.findAll(user);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @UserDecor() user: User) {
    return await this.credentialsService.findOne(user, id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @UserDecor() user: User) {
    return await this.credentialsService.remove(user, id);
  }
}
