// const router = require("express").Router();
// const controller = require("../controllers/project");
import * as express from "express";
import { Request, Response } from "express";
const router = express.Router();

// router.get("/", controller.get);
// router.post("/", controller.post);
// router.patch("/", controller.patch);
// router.patch("/accept", controller.accept);
// router.delete("/:id", controller.delete);
// router.post("/member", controller.member);
router.get("/", (req: Request, res: Response) => {
    res.send("project get")
})

export default router;