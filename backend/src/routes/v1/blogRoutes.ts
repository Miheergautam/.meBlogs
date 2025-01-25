import { Hono } from "hono";

const blogRoutes = new Hono();

blogRoutes.post("/", (c) => {
  return c.json({ message: "Create" });
});

blogRoutes.put("/:id", (c) => {
  return c.json({ message: "Update" });
});

blogRoutes.get("/", (c) => {
  return c.json({ message: "Read" });
});

blogRoutes.get("/:id", (c) => {
  return c.json({ message: "Read by ID" });
});

blogRoutes.post("/bulk", (c) => {
  return c.json({ message: "Bulk Create" });
});

blogRoutes.delete("/:id", (c) => {
  return c.json({ message: "Delete" });
});

export default blogRoutes;
