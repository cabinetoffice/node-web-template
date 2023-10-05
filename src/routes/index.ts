import { Router } from "express";

import { logger } from "../middleware/logger.middleware";
import healthcheckRouter from "./healthcheck";
import infoRouter from "./info";

const router = Router();

router.use(logger);
router.use(healthcheckRouter);
router.use(infoRouter);

export default router;
