import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';

export default class ProfileController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const user_id = request.user.id;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
    });

    return response.json(classToClass(user));
  }
}
