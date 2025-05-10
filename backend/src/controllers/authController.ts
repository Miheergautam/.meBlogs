import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context } from "hono";
import bcrypt from "bcryptjs";


import { sign, verify } from "hono/jwt";
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

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        name: body.name,
      },
    });

    return c.json({
      message: "User created successfully",
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

    if (!user || !user.password) {
      return c.json({ message: "Invalid email or password" }, 401);
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      return c.json({ message: "Invalid email or password" }, 401);
    }

    const jwt = await sign(
      { id: user.id, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
      c.env.JWT_SECRET
    );

    return c.json({
      message: "Login successful",
      token: jwt,
    });
  } catch (e) {
    console.error("Error in user login:", e);
    return c.json({ message: "Failed to login" }, 500);
  }
};

const updateUser = async (c: Context<AppBindings>) => {
  try {
    const authHeader = c.req.header("Authorization");
    if (!authHeader) {
      console.error("No Authorization header provided");
      return c.json({ message: "Unauthorized" }, 401);
    }

    const token = authHeader.split(" ")[1];
    const decoded = await verify(token, c.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      console.error("Invalid or missing JWT token");
      return c.json({ message: "Invalid token" }, 401);
    }

    const userId = decoded.id as number;

    const body = await c.req.json();
    const { name, bio, profileImage } = body;

    if (!name && !bio && !profileImage) {
      console.error("No fields provided to update");
      return c.json({ message: "Nothing to update" }, 400);
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, bio, profileImage },
      select: {
        id: true,
        name: true,
        bio: true,
        profileImage: true,
        email: true,
      },
    });

    console.log("User updated successfully:", updatedUser);

    return c.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (e) {
    console.error("Error updating user:", e);
    return c.json(
      {
        message: "Failed to update user",
        error: e instanceof Error ? e.message : "Unknown error",
      },
      500
    );
  }
};

const getUser = async (c: Context<AppBindings>) => {
  try {
    // Get Authorization Header
    const authHeader = c.req.header("Authorization");
    if (!authHeader) {
      console.error("No Authorization header provided");
      return c.json({ message: "Unauthorized" }, 401);
    }

    // Extract and Verify Token
    const token = authHeader.split(" ")[1];
    const decoded = await verify(token, c.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      console.error("Invalid or missing JWT token");
      return c.json({ message: "Invalid token" }, 401);
    }

    const userId = decoded.id as number;

    // Initialize Prisma
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    // Fetch User from Database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        profileImage: true,
      },
    });

    if (!user) {
      console.error("User not found");
      return c.json({ message: "User not found" }, 404);
    }

    console.log("User retrieved:", user);

    return c.json({
      message: "User retrieved successfully",
      user,
    });
  } catch (e) {
    console.error("Error retrieving user:", e);
    return c.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      500
    );
  }
};




const authFunctions = {
  userLogin,
  userRegister,
  updateUser,
  getUser,
};

export default authFunctions;
