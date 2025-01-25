import { Hono } from "hono";

// Import V1 routes
import authRoutes from "./v1/authRoutes";
import blogRoutes from "./v1/blogRoutes";

const mainRoute = new Hono();

mainRoute.route("/auth", authRoutes);
mainRoute.route("/blogs", blogRoutes);

export default mainRoute;
