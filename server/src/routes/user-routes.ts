import express from "express";
import { getUsers } from "../controllers/user/users-controller";
import { USER_PATHS } from "../enums/route.enum";
import allowCors from "../services/allow-cors";

const router = express.Router();

router.get(USER_PATHS.GET_USERS, allowCors(getUsers));

export default router;
