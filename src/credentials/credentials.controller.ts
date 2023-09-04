import { Controller, Get, Post, Body, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { AuthGuard } from '../guards/auth.guard';
import { UserDecor } from '../decorators/user.decorator';
import { User } from '@prisma/client';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("credentials")
@UseGuards(AuthGuard)
@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) { }

  @ApiOperation({
    summary: "create a new credential"
  })
  @ApiBody({
    type: CreateCredentialDto
  })
  @Post()
  async createCredential(@Body() createCredentialDto: CreateCredentialDto, @UserDecor() user: User) {
    return await this.credentialsService.createCredential(user, createCredentialDto);
  }

  @ApiOperation({
    summary: "return all credentials for user"
  })
  @Get()
  async findAll(@UserDecor() user: User) {
    return await this.credentialsService.findAll(user);
  }

  @ApiOperation({
    summary: "return specified credential of params id (if existst)"
  })
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number, @UserDecor() user: User) {
    return await this.credentialsService.findById(user, id);
  }

  @ApiOperation({
    summary: "delete specified credential of params id (if exixsts)"
  })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @UserDecor() user: User) {
    return await this.credentialsService.remove(user, id);
  }
}
