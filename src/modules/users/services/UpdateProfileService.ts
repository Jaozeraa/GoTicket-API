import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, name, email }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not founded.');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('E-mail already in use.');
    }

    user.email = email;
    user.name = name;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
