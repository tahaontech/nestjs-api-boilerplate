import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

export class AtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
}
