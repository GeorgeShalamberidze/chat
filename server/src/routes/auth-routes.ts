import { register } from "../controllers/user/register-controller";
import { login } from "../controllers/user/login-controller";
import { AUTH_PATHS } from "../enums/route.enum";
import express from "express";

const router = express.Router();

router.post(AUTH_PATHS.REGISTER, register);
router.post(AUTH_PATHS.LOGIN, login);

export default router;
