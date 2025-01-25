import { Hono } from "hono";

const authRoutes = new Hono();

authRoutes.post("/login", (c) => {
  return c.text("Login");
});

authRoutes.post("/register", (c) => {
  return c.json({ message: "Register" });
});

export default authRoutes;
