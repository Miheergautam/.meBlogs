import { User } from "@prisma/client";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context } from "hono";

import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@miheer_gautam4/.meblogs-common";

type AppBindings = {
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
};

const userRegister = async (c: Context<AppBindings>) => {
  try {
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) return c.json({ message: "Invalid input" }, 400);

    // Validate input
    if (!body.email) return c.json({ message: "Email is required" }, 400);
    if (!body.password) return c.json({ message: "Password is required" }, 400);
    if (!body.name) return c.json({ message: "Name is required" }, 400);

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    if (await prisma.user.findUnique({ where: { email: body.email } })) {
      return c.json({ message: "Email already exists" }, 400);
    }

    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    const jwt = await sign(
      {
        id: newUser.id,
      },
      c.env.JWT_SECRET
    );

    return c.json({
      message: "User created successfully",
      user: newUser,
      jwt: jwt,
    });
  } catch (e) {
    console.error("Error in user registration:", e);
    return c.json({ message: "Failed to register user" }, 500);
  }
};

const userLogin = async (c: Context<AppBindings>) => {
  try {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) return c.json({ message: "Invalid input" }, 400);

    // Validate input
    if (!body.email) return c.json({ message: "Email is required" }, 400);
    if (!body.password) return c.json({ message: "Password is required" }, 400);

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user) {
      return c.json({ message: "Invalid email or password" }, 401);
    }

    // Verify password
    if (user.password !== body.password) {
      return c.json({ message: "Invalid email or password" }, 401);
    }

    const jwt = await sign(
      {
        id: user.id,
      },
      c.env.JWT_SECRET
    );

    return c.json({
      message: "Login successful",
      user: { id: user.id, email: user.email, name: user.name },
      jwt: jwt,
    });
  } catch (e) {
    console.error("Error in user login:", e);
    return c.json({ message: "Failed to login" }, 500);
  }
};

const authFunctions = { userLogin, userRegister };

export default authFunctions;
