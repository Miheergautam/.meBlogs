import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context } from "hono";

type AppBindings = {
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    userId: number;
  };
};

const createLike = async (c: Context<AppBindings>) => {
  try {
    const blogId = Number(c.req.param("blogId"));
    const userId = c.get("userId");
    console.log(userId);
    if (!userId) return c.json({ error: "User ID is required" }, 400);

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const existingLike = await prisma.like.findUnique({
      where: { blogId_userId: { blogId, userId } },
    });

    if (existingLike) {
      return c.json({ message: "You already liked this blog" }, 400);
    }

    // Add like
    await prisma.like.create({
      data: { blogId, userId },
    });

    return c.json({ message: "Blog liked successfully" });
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
};

const likeFunctions = {
  createLike,
};

export default likeFunctions;
