import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventsRepository from '@modules/events/repositories/IEventsRepository';

interface IRequest {
  user_id: string;
  event_id: string;
}

@injectable()
export default class DeleteEventService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}
  public async execute({ event_id, user_id }: IRequest): Promise<void> {
    const event = await this.eventsRepository.findById(event_id);

    if (!event) {
      throw new AppError('Event not founded.');
    }

    if (event.owner_id !== user_id) {
      throw new AppError('Events can only be delete by owners.', 401);
    }

    await this.eventsRepository.deleteByEvent(event);

    return;
  }
}
