import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

export const requestId = (req: Request, res: Response, next: NextFunction) => {
  const id = req.header('X-Request-Id') || randomUUID();
  res.setHeader('X-Request-Id', id);
  (res.locals as any).requestId = id;
  next();
};
