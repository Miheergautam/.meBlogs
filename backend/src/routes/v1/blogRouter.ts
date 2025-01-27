import { Hono } from "hono";

import blogFunctions from "../../controllers/blogController";

const blogRouter = new Hono();

//create a blog
blogRouter.post("/", blogFunctions.createBlog);
//update a blog
blogRouter.put("/:id", blogFunctions.updateBlog);
//get all blogs
blogRouter.get("/", blogFunctions.readBlogs);
//get a blog by id
blogRouter.get("/:id", blogFunctions.readBlog);
//delete a blog by id
blogRouter.delete("/:id", blogFunctions.deleteBlog);
//bulk create blogs
//blogRouter.post("/bulk", blogFunctions.bulkCreateBlog);

export default blogRouter;
