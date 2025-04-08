import { Hono } from "hono";

// Import V1 routes
import authRouter from "./v1/authRouter";
import blogRouter from "./v1/blogRouter";
import likeRouter from "./v1/likeRouter";

const mainRoute = new Hono();

mainRoute.route("/auth", authRouter);
mainRoute.route("/blogs", blogRouter);
mainRoute.route("/likes", likeRouter);

export default mainRoute;
