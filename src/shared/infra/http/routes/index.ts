import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import eventsRouter from '@modules/events/infra/http/routes/events.routes';
import ticketsRouter from '@modules/tickets/infra/http/routes/tickets.routes';
import userTicketsRouter from '@modules/tickets/infra/http/routes/userTickets.routes';

const routes = Router();

routes.use('/users', usersRouter);

routes.use('/sessions', sessionsRouter);

routes.use('/password', passwordRouter);

routes.use('/profile', profileRouter);

routes.use('/events', eventsRouter);

routes.use('/tickets', ticketsRouter);

routes.use('/userTickets', userTicketsRouter);

export default routes;
