import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Blog {
  id: number;
  title: string;
  content: string;
  category: string;
  thumbnail: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    name: string;
    email: string;
    bio: string;
    profileImage: string;
  };
}

export interface User {
  id: number;
  name: string;
  bio: string;
  email: string;
  profileImage: string;
}

// Define the base URL
const BASE_URL = "https://backend.miheergautam04.workers.dev/api/v1";

export const meBlogsApi = createApi({
  reducerPath: "meBlogsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Fetch a single blog
    getBlog: builder.query<Blog, number>({
      query: (id) => `/blogs/${id}`,
      transformResponse: (response: { blog: Blog }) => response.blog,
    }),

    // Fetch all blogs
    getBlogs: builder.query<Blog[], void>({
      query: () => `/blogs/bulk`,
      transformResponse: (response: { blogs: Blog[] }) => response.blogs,
    }),

    // Fetch the authenticated user details
    getUser: builder.query<User, void>({
      query: () => `/auth/get`,
      transformResponse: (response: { user: User }) => response.user,
    }),

    // Update user profile
    updateUser: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        url: "/auth/update",
        method: "PUT",
        body,
      }),
      transformResponse: (response: { user: User }) => response.user,
    }),

    // Create a new blog
    createBlog: builder.mutation<Blog, Partial<Blog>>({
      query: (newBlog) => ({
        url: "/blogs",
        method: "POST",
        body: newBlog,
      }),
      transformResponse: (response: { blog: Blog }) => response.blog,
    }),

    // Update an existing blog
    updateBlog: builder.mutation<Blog, { id: number; updatedBlog: Partial<Blog> }>({
      query: ({ id, updatedBlog }) => ({
        url: `/blogs/${id}`,
        method: "PUT",
        body: updatedBlog,
      }),
      transformResponse: (response: { blog: Blog }) => response.blog,
    }),

    // Delete a blog
    deleteBlog: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export generated hooks
export const {
  useGetBlogQuery,
  useGetBlogsQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = meBlogsApi;
