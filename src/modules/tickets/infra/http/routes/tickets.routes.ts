import { Router } from 'express';

import TicketsController from '../controllers/TicketsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const ticketsRouter = Router();
const ticketsController = new TicketsController();

ticketsRouter.post('/:event_id', ensureAuthenticated, ticketsController.create);

export default ticketsRouter;
