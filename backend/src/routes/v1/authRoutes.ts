import { Hono } from "hono";

import { User } from "@prisma/client";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import authFunctions from "../../controllers/authController";

const authRoutes = new Hono();

authRoutes.post("/login", authFunctions.userLogin);
authRoutes.post("/register", authFunctions.userRegister);

export default authRoutes;
