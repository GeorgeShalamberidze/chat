import { NextFunction, Request, Response } from "express";
import { MessageModel } from "../../models/message-model";

export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message, from, to } = req.body;

    const msg = await MessageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (msg) {
      return res.json({ message: "Message was sent !", result: true });
    }
    return res.json({ message: "Sending message failed !", result: false });
  } catch (error) {
    next(error);
  }
};

export const getAllMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { from, to } = req.query;

    const allMessages = await MessageModel.find({
      users: { $all: [from, to] },
    }).sort({ updatedAt: 1 });

    const selfMessages = allMessages.map((msg) => ({
      isFromSelf: msg?.sender?.toString() === from,
      message: msg.message.text,
    }));

    if (selfMessages && selfMessages.length > 0) {
      return res.json({ messages: selfMessages });
    }
    return res.json({
      message: "No messages !",
      result: false,
    });
  } catch (error) {
    next(error);
  }
};
