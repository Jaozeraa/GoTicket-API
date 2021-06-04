import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IUserTicketsRepository from '@modules/tickets/repositories/IUserTicketsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UserTicket from '../infra/typeorm/entities/UserTicket';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
}

@injectable()
export default class ListUserTicketsService {
  constructor(
    @inject('UserTicketsRepository')
    private userTicketsRepository: IUserTicketsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute({ user_id }: IRequest): Promise<UserTicket[]> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not founded.');
    }

    const userTickets = await this.userTicketsRepository.findAllByOwnerId(
      user_id,
    );

    return userTickets;
  }
}
