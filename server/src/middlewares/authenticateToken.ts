import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default function verifyToken(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            jwt.verify(authHeader, "secret", (err) => {
                if (err) {
                    return res.sendStatus(403);
                }
                next();
            });
        } else {
            res.sendStatus(401);
        }
    }
  