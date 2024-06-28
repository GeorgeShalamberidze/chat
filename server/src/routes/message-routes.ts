import express from "express";
import { MESSAGE_PATHS } from "../enums/route.enum";
import {
  sendMessage,
  getAllMessages,
} from "../controllers/message/message-controller";
import allowCors from "../services/allow-cors";

const router = express.Router();

router.post(MESSAGE_PATHS.SEND, allowCors(sendMessage));
router.get(MESSAGE_PATHS.GET_ALL, allowCors(getAllMessages));

export default router;
