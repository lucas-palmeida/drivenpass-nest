import { Controller, Get, Post, Body, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { AuthGuard } from '../guards/auth.guard';
import { UserDecor } from '../decorators/user.decorator';
import { User } from '@prisma/client';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags("notes")
@UseGuards(AuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) { }

  @ApiOperation({
    summary: "create a new personal note"
  })
  @ApiBody({
    type: CreateNoteDto
  })
  @Post()
  async create(@Body() createNoteDto: CreateNoteDto, @UserDecor() user: User) {
    return await this.notesService.createNote(user, createNoteDto);
  }

  @Get()
  async findAll(@UserDecor() user: User) {
    return await this.notesService.findAll(user);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number, @UserDecor() user: User) {
    return await this.notesService.findById(user, id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @UserDecor() user: User) {
    return await this.notesService.remove(user, id);
  }
}
