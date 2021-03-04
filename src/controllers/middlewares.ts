import { NextFunction, Request, Response } from "express";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session?.loggedIn) {
    next();
    return;
  }
  res.status(403).send("not permitted");
}