import { register } from "../controllers/user/register-controller";
import { login } from "../controllers/user/login-controller";
import { AUTH_PATHS } from "../enums/route.enum";
import express from "express";
import allowCors from "../services/allow-cors";

const router = express.Router();

console.log("trigger");

router.post(AUTH_PATHS.REGISTER, allowCors(register));
router.post(AUTH_PATHS.LOGIN, allowCors(login));

export default router;
