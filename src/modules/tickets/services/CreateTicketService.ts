import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';
import IEventsRepository from '@modules/events/repositories/IEventsRepository';
import Ticket from '../infra/typeorm/entities/Ticket';
import AppError from '@shared/errors/AppError';

interface IRequest {
  event_id: string;
  user_id: string;
  tickets: Ticket[];
}

@injectable()
export default class CreateTicketService {
  constructor(
    @inject('TicketsRepository')
    private ticketsRepository: ITicketsRepository,
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}
  public async execute({
    tickets,
    user_id,
    event_id,
  }: IRequest): Promise<Ticket[]> {
    const event = await this.eventsRepository.findById(event_id);

    if (!event) {
      throw new AppError('Event not founded.');
    }

    if (event.owner_id !== user_id) {
      throw new AppError('Tickets can only be created by owners.', 401);
    }

    const eventTickets = Promise.all(
      tickets.map(async ticket => {
        const { info, price } = ticket;

        const eventTicket = await this.ticketsRepository.create({
          info,
          price,
          event_id,
        });

        return eventTicket;
      }),
    );

    return eventTickets;
  }
}
