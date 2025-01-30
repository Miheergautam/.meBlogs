import zod from "zod";

const createBlogInput = zod.object({
  title: zod.string().min(1).max(100),
  content: zod.string().min(1).max(1000),
  published: zod.boolean().optional(),
  thumbnail: zod.string().optional(),
});

const updateBlogInput = zod.object({
  title: zod.string().min(1).max(100).optional(),
  content: zod.string().min(1).max(1000).optional(),
  published: zod.boolean().optional(),
  thumbnail: zod.string().optional(),
});

export { createBlogInput, updateBlogInput };

export type CreateBlogInput = zod.infer<typeof createBlogInput>;
export type UpdateBlogInput = zod.infer<typeof updateBlogInput>;
