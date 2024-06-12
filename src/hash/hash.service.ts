import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async comparePasswords(
    password: string,
    password2: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, password2);
  }
}
