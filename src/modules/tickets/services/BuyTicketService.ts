import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';
import IUserTicketsRepository from '@modules/tickets/repositories/IUserTicketsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UserTicket from '../infra/typeorm/entities/UserTicket';
import AppError from '@shared/errors/AppError';
import IEventsRepository from '@modules/events/repositories/IEventsRepository';

interface IRequest {
  user_id: string;
  ticket_id: string;
}

@injectable()
export default class BuyTicketService {
  constructor(
    @inject('TicketsRepository')
    private ticketsRepository: ITicketsRepository,
    @inject('UserTicketsRepository')
    private userTicketsRepository: IUserTicketsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}
  public async execute({ ticket_id, user_id }: IRequest): Promise<UserTicket> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not founded.');
    }

    const ticket = await this.ticketsRepository.findById(ticket_id);

    if (!ticket) {
      throw new AppError('Ticket not founded.');
    }

    const event = await this.eventsRepository.findById(ticket.event_id);

    if (!event) {
      throw new AppError('Event not founded.');
    }

    if (event.available_tickets === 0) {
      throw new AppError('Tickets sold out.');
    }

    event.available_tickets = event.available_tickets - 1;

    await this.eventsRepository.save(event);

    const userTicket = await this.userTicketsRepository.create({
      event_id: ticket.event_id,
      info: ticket.info,
      price: ticket.price,
      owner_id: user.id,
    });

    return userTicket;
  }
}
