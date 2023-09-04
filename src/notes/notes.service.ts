import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { NotesRepository } from './notes.repository';
import { User } from '@prisma/client';

@Injectable()
export class NotesService {
  constructor(private readonly notesRepository: NotesRepository) { }

  async createNote(user: User, createNoteDto: CreateNoteDto) {
    const verifyExistence = await this.notesRepository.findByUserAndTitle(user, createNoteDto.title);
    if(verifyExistence) throw new ConflictException('Note already exists');

    return await this.notesRepository.create(user, createNoteDto);
  }

  async findAll(user: User) {
    return await this.notesRepository.findAll(user);
  }

  async findById(user: User, id: number) {
    const note = await this.notesRepository.findById(user, id);
    if(!note) throw new NotFoundException('Note not found');
    
    return note;
  }

  async remove(user: User, id: number) {
    const note = await this.notesRepository.findById(user, id);
    if(!note) throw new NotFoundException('Note not found');

    return await this.notesRepository.remove(user, id);
  }
}
