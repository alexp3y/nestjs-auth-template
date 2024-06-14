import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { FirebaseAuthGuard } from './auth/guards/firebase-auth.guard';
import { FirebaseAuthStrategy } from './auth/strategies/firebase-auth.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_GUARD, useClass: FirebaseAuthGuard },
    FirebaseAuthStrategy,
  ],
})
export class AppModule {}
