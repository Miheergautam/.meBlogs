import zod from "zod";

const contentSchema = zod.array(
  zod.object({
    type: zod.string(),
    children: zod.array(
      zod.object({
        text: zod.string(),
        bold: zod.boolean().optional(),
        italic: zod.boolean().optional(),
        underline: zod.boolean().optional(),
      })
    ),
  })
);

const createBlogInput = zod.object({
  title: zod.string().min(1).max(100),
  content: contentSchema, // ✅ Now directly accepts JSON format
  published: zod.boolean().optional(),
  thumbnail: zod.string().url().optional(),
  category: zod.string().min(1).max(50).optional(),
  createdAt: zod.date().default(() => new Date()), // Defaults to current time
  updatedAt: zod.date().default(() => new Date()), // Defaults to current time
});

const updateBlogInput = zod.object({
  title: zod.string().min(1).max(100).optional(),
  content: contentSchema.optional(), // ✅ Ensures content follows expected format
  published: zod.boolean().optional(),
  thumbnail: zod.string().url().optional(),
  category: zod.string().min(1).max(50).optional(),
  updatedAt: zod.date().default(() => new Date()), // Ensures updated timestamp
});

export { createBlogInput, updateBlogInput };

export type CreateBlogInput = zod.infer<typeof createBlogInput>;
export type UpdateBlogInput = zod.infer<typeof updateBlogInput>;
