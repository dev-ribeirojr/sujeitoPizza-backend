import prismaClient from "../prisma";
import { Request, Response, NextFunction } from "express";

export async function isAdm(req: Request, res: Response, next: NextFunction) {
  const user_id = req.user_id as string;

  const user = await prismaClient.user.findFirst({
    where: {
      id: user_id,
    },
    select: {
      id: true,
      name: true,
      role: true,
    },
  });

  if (user?.role != "administrator") {
    return res.status(401).end();
  }

  return next();
}
