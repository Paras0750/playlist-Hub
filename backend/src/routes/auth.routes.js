import express from "express";
import {registerHandler} from "../controllers/authControllers/register.controller.js";
import { loginHandler} from "../controllers/authControllers/login.controller.js";
import { refreshHandler} from "../controllers/authControllers/refresh.controller.js";
import { logoutHandler} from "../controllers/authControllers/logout.controller.js";

const router = express.Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.post("/refresh", refreshHandler);
router.post("/logout", logoutHandler);

export default router;
