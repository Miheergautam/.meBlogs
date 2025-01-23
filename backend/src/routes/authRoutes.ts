import { Hono } from "hono";

const authRoutes = new Hono();

authRoutes.post("/user/login", (c) => {
  return c.text("Login");
});

authRoutes.post("/user/register", (c) => {
  return c.json({ message: "Register" });
});

export default authRoutes;
