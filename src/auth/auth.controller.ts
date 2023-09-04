import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("auth")
@Controller("users")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("/sign-up")
  @ApiOperation({
    summary: "Register new users."
  })
  @ApiBody({
    type: SignUpDto
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: "Email already exists",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Email and/or password values are invalid.",
  })
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @Post("/sign-in")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Authenticate a user."
  })
  @ApiBody({
    type: SignInDto
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Email or password wrong",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Email and/or password values are invalid.",
  })
  signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }
}
