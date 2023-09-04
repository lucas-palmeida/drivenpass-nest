import { Body, Controller, Delete, UseGuards } from '@nestjs/common';
import { EraseService } from './erase.service';
import { CreateEraseDto } from './dto/create-erase.dto';
import { User } from '@prisma/client';
import { UserDecor } from '../decorators/user.decorator';
import { AuthGuard } from '../guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('erase')
export class EraseController {
  constructor(private readonly eraseService: EraseService) { }

  @Delete()
  async remove(@Body() createEraseDto: CreateEraseDto, @UserDecor() user: User) {
    return await this.eraseService.remove(user, createEraseDto);
  }
}
