import { sign, verify } from 'jsonwebtoken';
import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface IRequest {
  refreshToken: string;
}

interface IResponse {
  accessToken: string;
  newRefreshToken: string;
}

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

@injectable()
export default class RenewAccessTokenService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute({ refreshToken }: IRequest): Promise<IResponse> {
    try {
      const { secret } = authConfig.jwtRefreshToken;

      const decoded = verify(refreshToken, secret);

      const { sub: user_id } = decoded as ITokenPayload;

      const user = await this.usersRepository.findById(user_id);

      if (!user) {
        throw new AppError('User not founded.');
      }

      const {
        expiresIn: accessTokenExpiresIn,
        secret: accessTokenSecret,
      } = authConfig.jwtAccessToken;

      const {
        expiresIn: refreshTokenExpiresIn,
        secret: refreshTokenSecret,
      } = authConfig.jwtRefreshToken;

      const accessToken = sign({}, accessTokenSecret, {
        expiresIn: accessTokenExpiresIn,
        subject: user.id,
      });

      const newRefreshToken = sign({}, refreshTokenSecret, {
        expiresIn: refreshTokenExpiresIn,
        subject: user.id,
      });

      return {
        accessToken,
        newRefreshToken,
      };
    } catch {
      throw new AppError('invalid JWT refresh token', 401);
    }
  }
}
