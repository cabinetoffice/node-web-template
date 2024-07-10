import { Router } from 'express';

import { logger } from '../middleware/logger.middleware';
import healthcheckRouter from './healthcheck';
import infoRouter from './info';
import validationTestRouter from './validation-test';

const router = Router();

router.use(logger);
router.use(healthcheckRouter);
router.use(infoRouter);
router.use(validationTestRouter);

export default router;
