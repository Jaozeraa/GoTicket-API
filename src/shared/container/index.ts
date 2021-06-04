import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import EventsRepository from '@modules/events/infra/typeorm/repositories/EventsRepository';
import IEventsRepository from '@modules/events/repositories/IEventsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IEventsRepository>(
  'EventsRepository',
  EventsRepository,
);
