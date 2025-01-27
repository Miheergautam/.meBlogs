import { Hono } from "hono";

import { User } from "@prisma/client";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import authFunctions from "../../controllers/authController";

const authRouter = new Hono();

authRouter.post("/login", authFunctions.userLogin);
authRouter.post("/register", authFunctions.userRegister);

export default authRouter;
