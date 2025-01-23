import { Hono } from "hono";
import authRoutes from "./authRoutes";
import blogRoutes from "./blogRoutes";

const mainRoute = new Hono();

mainRoute.route("/auth", authRoutes);
mainRoute.route("/blogs", blogRoutes);

export default mainRoute;
