import { Router } from "express";
import { get, post } from "../controllers/index.controller";
import { logger } from "../middleware/logger.middleware";

const router = Router();

router.get("/", logger, get);

router.post("/", logger, post);

export default router;

