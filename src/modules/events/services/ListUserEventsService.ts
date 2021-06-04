import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventsRepository from '@modules/events/repositories/IEventsRepository';
import { isAfter } from 'date-fns';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  user_id: string;
}

@injectable()
export default class ListEventsService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}
  public async execute({ user_id }: IRequest): Promise<any> {
    const events = await this.eventsRepository.findAllByOwnerId(user_id);

    const unavailableEvents = events.filter(
      event => !isAfter(new Date(event.date), new Date()),
    );

    unavailableEvents.forEach(async event => {
      if (event.promo_image) {
        await this.storageProvider.deleteFile(event.promo_image);
      }

      await this.eventsRepository.deleteByEvent(event);
    });

    const availableEvents = events.filter(
      event =>
        isAfter(new Date(event.date), new Date()) &&
        event.available_tickets > 0,
    );

    return availableEvents;
  }
}
