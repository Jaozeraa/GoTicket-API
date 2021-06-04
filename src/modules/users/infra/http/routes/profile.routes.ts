import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.put('/', ensureAuthenticated, profileController.update);

export default profileRouter;
