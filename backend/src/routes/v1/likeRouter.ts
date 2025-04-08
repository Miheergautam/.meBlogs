import { Hono } from "hono";
import { verify } from "hono/jwt";
import { JWTPayload } from "hono/utils/jwt/types";
import likeFunctions from "../../controllers/likeController";


// Define a custom JWT payload for the blogRoute middleware
interface CustomJWTPayload extends JWTPayload {
  id: number;
}

const likeRouter = new Hono<{
  Bindings: {
    JWT_SECRET: string;
    DATABASE_URL: string;
  };
  Variables: {
    userId: number;
  };
}>();

likeRouter.use("/*", async (c, next) => {
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

likeRouter.post("/:blogId/like", likeFunctions.createLike);
/* likeRouter.delete("/:blogId/unlike", likeFunctions.createLike);
likeRouter.get("/:blogId/likes", likeFunctions.createLike); */

export default likeRouter;
