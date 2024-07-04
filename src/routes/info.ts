import { Router } from 'express';
import { authentication } from '../middleware/authentication.middleware';
import { get, post } from '../controller/info.controller';
import * as config from '../config';

const infoRouter = Router();

infoRouter.get(config.INFO_URL, authentication, get);
infoRouter.post(config.INFO_URL, post);

export default infoRouter;
