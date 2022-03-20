// const router = require("express").Router();
import * as express from "express";
import { Request, Response } from "express";
import { guest, logout, signup, checkAndMail, login} from "../controllers/user";
const router = express.Router();
const googleController = require("../controllers/google")
const kakaoController = require("../controllers/kakao")
const naverController = require("../controllers/naver")

router.get("/guest", guest);
router.get("/logout", logout);
router.post("/signup", signup);
router.post("/checkAndMail", checkAndMail);
router.post("/login", login);
router.post("/kakao", kakaoController.login);
router.post("/google", googleController.login);
router.post("/naver", naverController.login);
router.get("/", (req: Request, res: Response) => {
    res.send("user get")
})

export default router;