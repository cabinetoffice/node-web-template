import { Router } from 'express';

import { get, post } from '../controller/info.controller';
import * as config from '../config';
import { authentication } from '../middleware/authentication.middleware';

const infoRouter = Router();

infoRouter.get(config.INFO_URL, authentication, get);
infoRouter.post(config.INFO_URL, post);

export default infoRouter;
