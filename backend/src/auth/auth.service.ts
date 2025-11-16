/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(payload: RegisterDto) {
    const existing = await this.usersService.findByEmail(payload.email);

    if (existing) {
      throw new ConflictException('Email is already in use');
    }

    const user = await this.usersService.create({
      email: payload.email,
      password: payload.password,
    });

    const token = await this.signToken(user.id, user.email);

    return {
      user: this.stripUser(user),
      token,
    };
  }

  async login(payload: LoginDto) {
    const user = await this.usersService.findByEmail(payload.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const matches = await bcrypt.compare(payload.password, user.passwordHash);

    if (!matches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.signToken(user.id, user.email);

    return {
      user: this.stripUser(user),
      token,
    };
  }

  private signToken(userId: string, email: string) {
    return this.jwtService.signAsync({ sub: userId, email });
  }

  private stripUser(user: { id: string; email: string; role: string }) {
    const { id, email, role } = user;
    return { id, email, role };
  }
}
