import express from "express";
import { getUsers } from "../controllers/user/users-controller";
import { USER_PATHS } from "../enums/route.enum";

const router = express.Router();

router.get(USER_PATHS.GET_USERS, getUsers);

export default router;
