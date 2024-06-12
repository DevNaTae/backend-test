import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/hash/hash.service';
import { User } from 'src/user/schema/user.entity';
import { UserService } from 'src/user/user.service';
import { RequestInterface } from './interface/request.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async register(user: User) {
    const userExists = await this.userService.findOneByEmail(user.email);
    if (!userExists) {
      user.password = await this.hashService.hashPassword(user.password);
      return await this.userService.create(user);
    } else {
      throw new ConflictException('User already exists');
    }
  }

  async login({ email, password }: User) {
    const userExists = await this.userService.findOneByEmail(email);
    if (!userExists) {
      throw new UnauthorizedException('Usuario no registrado');
    }
    const isValid = await this.hashService.comparePasswords(
      password,
      userExists.password,
    );
    if (!isValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const payload = { email: userExists.email, role: userExists.role };
    return { access_token: await this.jwtService.sign(payload) };
  }

  async profile({ email, role }: { email: string; role: string }) {
    return await this.userService.findOneByEmail(email);
  }
}
