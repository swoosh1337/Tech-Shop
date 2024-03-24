import { Request, Response } from 'express';
import { IUser, UserModel } from "../models/user";
import { UserErrors } from "../common/errors";

export const getAvailableMoney = async (req: Request, res: Response) => {
    const { userID } = req.params;
  
    try {
      const user = await UserModel.findById(userID);
      if (!user) {
        return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
      }
  
      res.json({ availableMoney: user.availableMoney });
    } catch (err) {
      res.status(500).json({ type: err });
    }
};