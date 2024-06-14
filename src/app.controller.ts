import { Controller, Get, Request } from '@nestjs/common';
import { Public } from './auth/decorators/public.decorator';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  authenticated(@Request() req): string {
    return req.user.uid;
  }

  @Public()
  @Get('/public')
  publicRoute(): string {
    return 'Hello, friend';
  }
}
