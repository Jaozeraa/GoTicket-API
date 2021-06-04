import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IUserTicketsRepository from '@modules/tickets/repositories/IUserTicketsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UserTicket from '../infra/typeorm/entities/UserTicket';
import AppError from '@shared/errors/AppError';
import { isAfter } from 'date-fns';
import IEventsRepository from '@modules/events/repositories/IEventsRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

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
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}
  public async execute({ user_id }: IRequest): Promise<UserTicket[]> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not founded.');
    }

    const userTickets = await this.userTicketsRepository.findAllByOwnerId(
      user_id,
    );

    const unavailableTickets = userTickets.filter(
      ticket => !isAfter(new Date(ticket.event.date), new Date()),
    );

    unavailableTickets.forEach(async ticket => {
      if (ticket.event.promo_image) {
        await this.storageProvider.deleteFile(ticket.event.promo_image);
      }

      await this.eventsRepository.deleteByEvent(ticket.event);
    });

    const availableTickets = userTickets.filter(ticket =>
      isAfter(new Date(ticket.event.date), new Date()),
    );

    return availableTickets;
  }
}
