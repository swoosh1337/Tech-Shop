import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser, UserModel } from "../models/user";
import { UserErrors } from "../common/errors";

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (user) {
      return res.status(400).json({ type: UserErrors.USERNAME_ALREADY_EXISTS });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ type: err });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

try {
    const user: IUser = await UserModel.findOne({ username })!;

    if (!user) {
        return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ type: UserErrors.WRONG_CREDENTIALS });
    }
    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userID: user._id });
} catch (err) {
    res.status(500).json({ type: err });
}
};