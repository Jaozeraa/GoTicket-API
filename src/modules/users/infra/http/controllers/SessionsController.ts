import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import RenewAccessTokenService from '@modules/users/services/RenewAccessTokenService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, accessToken, refreshToken } = await authenticateUser.execute({
      email,
      password,
    });

    return response.json({
      user: classToClass(user),
      accessToken,
      refreshToken,
    });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { refreshToken } = request.body;

    const renewAccessToken = container.resolve(RenewAccessTokenService);

    const { accessToken, newRefreshToken } = await renewAccessToken.execute({
      refreshToken,
    });

    return response.json({
      accessToken,
      newRefreshToken,
    });
  }
}
