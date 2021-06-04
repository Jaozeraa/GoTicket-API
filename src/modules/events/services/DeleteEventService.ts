import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventsRepository from '@modules/events/repositories/IEventsRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  user_id: string;
  event_id: string;
}

@injectable()
export default class DeleteEventService {
  constructor(
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}
  public async execute({ event_id, user_id }: IRequest): Promise<void> {
    const event = await this.eventsRepository.findById(event_id);

    if (!event) {
      throw new AppError('Event not founded.');
    }

    if (event.owner_id !== user_id) {
      throw new AppError('Events can only be delete by owners.', 401);
    }

    if (event.promo_image) {
      await this.storageProvider.deleteFile(event.promo_image);
    }

    await this.eventsRepository.deleteByEvent(event);

    return;
  }
}
