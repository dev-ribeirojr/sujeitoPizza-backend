import prismaClient from "../prisma";
import { Request, Response, NextFunction } from "express";

export async function orderPermission(
  req: Request,
  res: Response,
  next: NextFunction
) {
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

  if (user?.role === "administrator" || user?.role === "waiter") {
    return next();
  }
  return res.status(401).end();
}
