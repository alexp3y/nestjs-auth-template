import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import admin, { ServiceAccount, auth } from 'firebase-admin';
import { getApps } from 'firebase-admin/app';
import { ExtractJwt, Strategy } from 'passport-firebase-jwt';
import * as serviceAccount from './service-account-key.json';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  'firebase-auth',
) {
  private readonly _logger = new Logger(FirebaseAuthStrategy.name);
  private _firebase;

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
    this._firebase = getApps().length
      ? getApps()[0]
      : admin.initializeApp({
          credential: admin.credential.cert(serviceAccount as ServiceAccount),
        });
  }

  async validate(token: string) {
    const currentUser = await auth()
      .verifyIdToken(token, true)
      .catch((err) => {
        this._logger.error(err);
        throw new UnauthorizedException(err.message);
      });

    if (!currentUser) {
      throw new UnauthorizedException();
    }
    this._logger.debug(JSON.stringify(currentUser));
    return currentUser;
  }
}
