import { Router } from 'express';
import { get } from '../controller/healthcheck.controller';
import * as config from '../config';

const healthcheckRouter = Router();

healthcheckRouter.get(config.HEALTHCHECK_URL, get);

export default healthcheckRouter;
