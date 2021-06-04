import { Router } from 'express';

import UserTicketsController from '../controllers/UserTicketsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const userTicketsRouter = Router();
const userTicketsController = new UserTicketsController();

userTicketsRouter.post(
  '/:ticket_id',
  ensureAuthenticated,
  userTicketsController.create,
);

userTicketsRouter.get('/', ensureAuthenticated, userTicketsController.index);

export default userTicketsRouter;
