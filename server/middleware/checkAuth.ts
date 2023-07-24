import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";

export const checkAuth = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  let token = req.header("authorization");

  if (!token) {
    return res.status(403).json({
      errors: [
        {
          msg: "unauthorized",
        },
      ],
    });
  }

  token = token.split(" ")[1];

  try {
    const user = (await JWT.verify(
      token,
      process.env.JWT_SECRET as string
    )) as { email: string };

    req.user = user.email;
    next();
  } catch (error) {
    return res.status(403).json({
      errors: [
        {
          msg: "unauthorized",
        },
      ],
    });
  }
};

export let activeRequests: any = {};

export const checkActiveRequest = async (req: any, res: any, next: any) => {
  const userId = req.user;
  const currentTime = Date.now();

  if (activeRequests[userId]) {
    const timeElapsed = (currentTime - activeRequests[userId].timestamp) / 1000;
    if (timeElapsed < 60) {
      return res
        .status(429)
        .json({ error: "You can make another request after 1 minute" });
    }
  }

  activeRequests[userId] = { timestamp: currentTime };
  next();
};
