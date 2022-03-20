// const router = require("express").Router();
// const controller = require("../controllers/profile");
import * as express from "express";
import { Request, Response } from "express";
const router = express.Router();

// router.get("/", controller.get);
// router.delete("/", controller.delete);
// router.patch("/name", controller.patchName);
// router.patch("/password", controller.patchPassword);
router.get("/", (req: Request, res: Response) => {
    res.send("profile get")
})

export default router;