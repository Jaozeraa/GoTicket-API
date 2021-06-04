import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { isBefore } from 'date-fns';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IEventsRepository from '@modules/events/repositories/IEventsRepository';
import Event from '../infra/typeorm/entities/Event';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
  name: string;
  CEP: string;
  date: Date;
  description: string;
  neighborhood: string;
  number: string;
  state_city: string;
  street: string;
  type: 'Show' | 'Festa' | 'Teatro';
  promo_image_filename: string;
  available_tickets: number;
  owner_id: string;
}

@injectable()
export default class CreateEventService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}
  public async execute({
    name,
    CEP,
    date,
    description,
    neighborhood,
    number,
    state_city,
    street,
    type,
    promo_image_filename,
    available_tickets,
    owner_id,
  }: IRequest): Promise<Event> {
    const user = await this.usersRepository.findById(owner_id);

    if (!user) {
      throw new AppError('User not founded.');
    }

    if (isBefore(date, Date.now())) {
      throw new AppError('You cannot create an event for before now.', 400);
    }

    if (available_tickets === 0) {
      throw new AppError(
        'You cannot create an event without available tickets',
      );
    }

    const filename = await this.storageProvider.saveFile(promo_image_filename);

    const event = await this.eventsRepository.create({
      name,
      CEP,
      date,
      description,
      neighborhood,
      number,
      state_city,
      street,
      type,
      promo_image: filename,
      available_tickets,
      owner_id,
    });

    return event;
  }
}
