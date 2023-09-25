import { Router } from "express";
import { get, post } from "../controllers/index.controller";
import { myLogger } from "../middleware/logger";

const router = Router();

router.get("/", myLogger, get);

router.post("/", myLogger, post);

export default router;

