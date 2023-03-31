import { UseGuards, applyDecorators } from '@nestjs/common';
import { AtGuard } from '../guards';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export function Auth() {
  return applyDecorators(
    UseGuards(AtGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
