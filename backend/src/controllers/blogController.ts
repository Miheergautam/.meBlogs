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

const createBlog = async (c: Context<AppBindings>) => {
  try {
    const body = await c.req.json();
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const newBlog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId,
      },
      select: {
        id: true,
        title: true,
        content: true,
      },
    });

    return c.json({
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (e) {
    console.error("Error in creating blog:", e);
    return c.json({ message: "Failed to create blog" }, 500);
  }
};

const updateBlog = async (c: Context<AppBindings>) => {
  try {
    const body = await c.req.json();
    const id = c.req.param("id");

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const updatedBlog = await prisma.blog.update({
      where: { id: parseInt(id) },
      data: {
        title: body.title,
        content: body.content,
      },
      select: {
        id: true,
        title: true,
        content: true,
      },
    });

    return c.json({
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (e) {
    console.error("Error in updating blog:", e);
    return c.json({ message: "Failed to update blog" }, 500);
  }
};

const readBlogs = async (c: Context<AppBindings>) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.blog.findMany({
      select: {
        id: true,
        title: true,
        content: true,
      },
    });

    return c.json({
      message: "Blogs retrieved successfully",
      blogs: blogs,
    });
  } catch (e) {
    console.error("Error in reading blogs:", e);
    return c.json({ message: "Failed to read blogs" }, 500);
  }
};

const readBlog = async (c: Context<AppBindings>) => {
  try {
    const idParam = c.req.param("id");
    if (!idParam) {
      return c.json({ message: "Blog ID is required" }, 400);
    }

    const id = parseInt(idParam, 10);
    if (isNaN(id)) {
      return c.json({ message: "Invalid Blog ID" }, 400);
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.blog.findUnique({
      where: { id: id },
      select: {
        id: true,
        title: true,
        content: true,
      },
    });

    return c.json({
      message: "Blog retrieved successfully",
      blog: blog,
    });
  } catch (e) {
    console.error("Error in reading blog:", e);
    return c.json({ message: "Failed to read blog" }, 500);
  }
};

const deleteBlog = async (c: Context<AppBindings>) => {
  try {
    const id = c.req.param("id");

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    await prisma.blog.delete({
      where: { id: parseInt(id) },
    });

    return c.json({
      message: "Blog deleted successfully",
    });
  } catch (e) {
    console.error("Error in deleting blog:", e);
    return c.json({ message: "Failed to delete blog" }, 500);
  }
};

const bulkBlogs = async (c: Context<AppBindings>) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.blog.findMany();

    if (!blogs || blogs.length === 0) {
      return c.json({ message: "No blogs found", blogs: [] }, 200);
    }

    return c.json({
      message: "Blogs retrieved successfully",
      blogs: blogs,
    });
  } catch (e) {
    console.error("Error in reading blogs:", e);
    return c.json({ message: "Failed to read blogs" }, 500);
  }
};

const blogFunctions = {
  createBlog,
  updateBlog,
  readBlogs,
  readBlog,
  deleteBlog,
  bulkBlogs,
};

export default blogFunctions;
