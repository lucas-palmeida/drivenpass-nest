import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Controller("users")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("/sign-up")
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @Post("/sign-in")
  @HttpCode(HttpStatus.OK)
  signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }
}
