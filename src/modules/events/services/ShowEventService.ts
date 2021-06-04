import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventsRepository from '@modules/events/repositories/IEventsRepository';
import AppError from '@shared/errors/AppError';
import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';

interface IRequest {
  event_id: string;
}

@injectable()
export default class ShowEventService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
    @inject('TicketsRepository')
    private ticketsRepository: ITicketsRepository,
  ) {}
  public async execute({ event_id }: IRequest): Promise<any> {
    const event = await this.eventsRepository.findById(event_id);

    if (!event) {
      throw new AppError('Event not founded.');
    }

    const tickets = await this.ticketsRepository.findAllByEventId(event.id);

    const formattedEvent = {
      ...event,
      tickets,
    };

    return formattedEvent;
  }
}
