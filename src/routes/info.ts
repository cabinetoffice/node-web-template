import { Router } from 'express';

import { get, post } from '../controller/info.controller';
import * as config from '../config';

const infoRouter = Router();

infoRouter.get(config.INFO_URL, get);
infoRouter.post(config.INFO_URL, post);

export default infoRouter;
