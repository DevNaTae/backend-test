import { Request } from 'express';

export interface RequestInterface extends Request {
  user: { email: string; role: string };
}
