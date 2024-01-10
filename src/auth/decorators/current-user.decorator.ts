import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { AuthRequest } from '../models/auth-request';
import { Prisma } from '@prisma/client';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): Prisma.UsuarioCreateInput => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);