import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventsRepository from '@modules/events/repositories/IEventsRepository';
import Event from '../infra/typeorm/entities/Event';

@injectable()
export default class ListEventsService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}
  public async execute(): Promise<Event[]> {
    const events = await this.eventsRepository.findAll();

    return events;
  }
}
