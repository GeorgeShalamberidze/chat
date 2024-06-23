import express from "express";
import { MESSAGE_PATHS } from "../enums/route.enum";
import {
  sendMessage,
  getAllMessages,
} from "../controllers/message/message-controller";

const router = express.Router();

router.post(MESSAGE_PATHS.SEND, sendMessage);
router.get(MESSAGE_PATHS.GET_ALL, getAllMessages);

export default router;
