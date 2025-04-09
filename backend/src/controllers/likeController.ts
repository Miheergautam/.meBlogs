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

const getPrisma = (c: Context<AppBindings>) =>
  new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());

const createLike = async (c: Context<AppBindings>) => {
  try {
    const blogId = Number(c.req.param("blogId"));
    const userId = c.get("userId");

    if (!userId) return c.json({ error: "User ID is required" }, 400);

    const prisma = getPrisma(c);

    const existingLike = await prisma.like.findUnique({
      where: { blogId_userId: { blogId, userId } },
    });

    if (existingLike) {
      return c.json({ message: "You already liked this blog" }, 400);
    }

    await prisma.like.create({
      data: { blogId, userId },
    });

    return c.json({ message: "Blog liked successfully" });
  } catch (error) {
    console.error("Error liking blog:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
};

const deleteLike = async (c: Context<AppBindings>) => {
  try {
    const blogId = Number(c.req.param("blogId"));
    const userId = c.get("userId");

    if (!userId) return c.json({ error: "User ID is required" }, 400);

    const prisma = getPrisma(c);

    await prisma.like.deleteMany({
      where: { blogId, userId },
    });

    return c.json({ message: "Blog unliked successfully" });
  } catch (error) {
    console.error("Error unliking blog:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
};

const getLikes = async (c: Context<AppBindings>) => {
  try {
    const blogId = Number(c.req.param("blogId"));

    const prisma = getPrisma(c);

    const totalLikes = await prisma.like.count({
      where: { blogId },
    });

    return c.json({ totalLikes });
  } catch (error) {
    console.error("Error getting likes:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
};

const likeFunctions = {
  createLike,
  deleteLike,
  getLikes,
};

export default likeFunctions;
