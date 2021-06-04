import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import EventsRepository from '@modules/events/infra/typeorm/repositories/EventsRepository';
import IEventsRepository from '@modules/events/repositories/IEventsRepository';

import TicketsRepository from '@modules/tickets/infra/typeorm/repositories/TicketsRepository';
import ITicketsRepository from '@modules/tickets/repositories/ITicketsRepository';

import UserTicketsRepository from '@modules/tickets/infra/typeorm/repositories/UserTicketsRepository';
import IUserTicketsRepository from '@modules/tickets/repositories/IUserTicketsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IEventsRepository>(
  'EventsRepository',
  EventsRepository,
);

container.registerSingleton<ITicketsRepository>(
  'TicketsRepository',
  TicketsRepository,
);

container.registerSingleton<IUserTicketsRepository>(
  'UserTicketsRepository',
  UserTicketsRepository,
);
