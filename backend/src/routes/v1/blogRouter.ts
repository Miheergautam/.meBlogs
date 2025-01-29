import { Hono } from "hono";
import { verify } from "hono/jwt";
import { JWTPayload } from "hono/utils/jwt/types";

// Import blog functions from blogController
import blogFunctions from "../../controllers/blogController";

// Define a custom JWT payload for the blogRoute middleware
interface CustomJWTPayload extends JWTPayload {
  id: number;
}

const blogRouter = new Hono<{
  Bindings: {
    JWT_SECRET: string;
    DATABASE_URL: string;
  };
  Variables: {
    userId: number;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("Authorization") || "";
  if (!authHeader) {
    return c.json({ message: "Authorization header is required" }, 401);
  }
  const token = authHeader.split(" ")[1];
  try {
    const user = (await verify(token, c.env.JWT_SECRET)) as CustomJWTPayload;
    if (user) {
      console.log("User: ", user);
      const userId = user.id;
      c.set("userId", userId);
      await next();
    }
  } catch (err) {
    return c.json({ message: "Invalid token" }, 401);
  }
});

//create a blog
blogRouter.post("/", blogFunctions.createBlog);
//update a blog
blogRouter.put("/:id", blogFunctions.updateBlog);
//bulk create blogs
blogRouter.get("/bulk", blogFunctions.bulkBlogs);
//get all blogs
blogRouter.get("/", blogFunctions.readBlogs);
//get a blog by id
blogRouter.get("/:id", blogFunctions.readBlog);
//delete a blog by id
blogRouter.delete("/:id", blogFunctions.deleteBlog);

export default blogRouter;
