import { UserModel, UserDocument } from "../models/user-model";

export const registerService = async (user: UserDocument) => {
  try {
    await UserModel.create(user);
  } catch (error) {
    throw error;
  }
};
