import { Router } from 'express';
import multer from 'multer';

import EventsController from '../controllers/EventsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';

const eventsRouter = Router();
const eventsController = new EventsController();

const upload = multer(uploadConfig.multer);

eventsRouter.post(
  '/',
  ensureAuthenticated,
  upload.single('promo_image'),
  eventsController.create,
);

eventsRouter.get('/', ensureAuthenticated, eventsController.index);

eventsRouter.get(
  '/details/:event_id',
  ensureAuthenticated,
  eventsController.show,
);

eventsRouter.delete(
  '/:event_id',
  ensureAuthenticated,
  eventsController.destroy,
);

export default eventsRouter;
