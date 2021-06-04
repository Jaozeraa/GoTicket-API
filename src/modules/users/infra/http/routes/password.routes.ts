import { Router } from 'express';

import UpdatePasswordController from '../controllers/UpdatePasswordController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const passwordRouter = Router();
const updatePasswordController = new UpdatePasswordController();

passwordRouter.put('/', ensureAuthenticated, updatePasswordController.update);

export default passwordRouter;
