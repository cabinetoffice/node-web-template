import { Router } from "express";

import { get, post } from "../controllers/index.controller";
import { logger } from "../middleware/logger.middleware";
import * as config from "../config";

const router = Router();

router.use(logger);

router.get(config.LANDING_URL, get);
router.post(config.LANDING_URL, post);

export default router;

