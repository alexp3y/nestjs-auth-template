import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import admin, { ServiceAccount, app } from 'firebase-admin';
import { ExtractJwt, Strategy } from 'passport-firebase-jwt';
import * as serviceAccount from './service-account-key.json';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  'firebase-auth',
) {
  private readonly _logger = new Logger(FirebaseAuthStrategy.name);
  private _firebase: app.App;

  constructor(private readonly _configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
    this._firebase = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as ServiceAccount),
    });
  }

  async validate(token: string) {
    const currentUser = await this._firebase
      .auth()
      .verifyIdToken(token, true)
      .catch((err) => {
        this._logger.error(err);
        throw new UnauthorizedException(err.message);
      });

    if (!currentUser) {
      throw new UnauthorizedException();
    }

    return currentUser;
  }
}
