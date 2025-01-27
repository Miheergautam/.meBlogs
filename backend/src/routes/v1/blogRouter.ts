import { Hono } from "hono";

const blogRouter = new Hono();

blogRouter.post("/", (c) => {
  return c.json({ message: "Create" });
});

blogRouter.put("/:id", (c) => {
  return c.json({ message: "Update" });
});

blogRouter.get("/", (c) => {
  return c.json({ message: "Read" });
});

blogRouter.get("/:id", (c) => {
  return c.json({ message: "Read by ID" });
});

blogRouter.post("/bulk", (c) => {
  return c.json({ message: "Bulk Create" });
});

blogRouter.delete("/:id", (c) => {
  return c.json({ message: "Delete" });
});

export default blogRouter;
