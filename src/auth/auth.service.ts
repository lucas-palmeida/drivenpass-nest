import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private EXPIRATION_TIME = "7d";
  private ISSUER = "lucas-palmeida";
  private AUDIENCE = "users";

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async signUp(signUpData: SignUpDto) {
    return await this.usersService.createUser(signUpData);
  }

  async signIn(signInData: SignInDto) {
    const { email, password } = signInData;

    const user = await this.usersService.getUserByEmail(email);
    if (!user) throw new UnauthorizedException("Verify email or password.");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException("Verify email or password.");

    return this.createToken(user);
  }

  createToken(user: User) {
    const { id, email } = user;
    const token = this.jwtService.sign({ id, email }, {
      expiresIn: this.EXPIRATION_TIME,
      subject: String(id),
      issuer: this.ISSUER,
      audience: this.AUDIENCE
    });

    return { token };
  }

  checkToken(token: string) {
    const data = this.jwtService.verify(token, {
      issuer: this.ISSUER,
      audience: this.AUDIENCE
    });

    return data;
  }
}
