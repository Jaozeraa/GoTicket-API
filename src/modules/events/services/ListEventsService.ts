import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventsRepository from '@modules/events/repositories/IEventsRepository';
import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';

@injectable()
export default class ListEventsService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
    @inject('TicketsRepository')
    private ticketsRepository: ITicketsRepository,
  ) {}
  public async execute(): Promise<any> {
    const events = await this.eventsRepository.findAll();

    const formattedEvents = await Promise.all(
      events.map(async event => {
        const tickets = await this.ticketsRepository.findAllByEventId(event.id);

        return {
          ...event,
          tickets,
        };
      }),
    );

    return formattedEvents;
  }
}
