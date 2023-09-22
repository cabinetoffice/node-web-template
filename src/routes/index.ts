import { Router } from "express";

const router = Router();

router.get("/", function (req, res) {
    res.send("get request test");
});

router.post("/", function (req, res) {
    res.send("post request test");
});

export default router;
