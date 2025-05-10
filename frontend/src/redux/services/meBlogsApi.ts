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
  instagram?: string;
  linkedIn?: string;
  github?: string;
  twitter?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Like {
  id: number;
  blogId: number;
  userid: number;
  createdAt: string;
  blog: Blog;
  user: User;
}

// Define the base URL
const BASE_URL =/* "http://localhost:8787/api/v1" */ "https://backend.miheergautam04.workers.dev/api/v1";
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
  tagTypes: ["User", "Blogs"],
  endpoints: (builder) => ({
    // 📌 Register a new user ----- -Done
    registerUser: builder.mutation<
      { message: string },
      { name: string; email: string; password: string }
    >({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),

    // 📌 Login user ------- Done
    loginUser: builder.mutation<
      { token: string },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;
          const token = response?.data?.token;

          if (token) {
            localStorage.setItem("token", `Bearer ${token}`);
            dispatch(meBlogsApi.util.invalidateTags(["User"]));
          }
        } catch (err) {
          console.error("Login failed", err);
        }
      },
    }),

    // 📌 Logout user
    logoutUser: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch }) {
        localStorage.removeItem("token");
        dispatch(meBlogsApi.util.invalidateTags(["User"]));
      },
    }),

    // 📌 Fetch the authenticated user details
    getUser: builder.query<User, void>({
      query: () => `/auth/get`,
      transformResponse: (response: { user: User }) => response.user,
      providesTags: ["User"],
    }),

    // 📌 Update user profile
    updateUser: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        url: "/auth/update",
        method: "PUT",
        body,
      }),
      transformResponse: (response: { user: User }) => response.user,
      invalidatesTags: ["User"],
    }),

    // 📌 Fetch a single blog
    getBlog: builder.query<Blog, number>({
      query: (id) => `/blogs/${id}`,
      transformResponse: (response: { blog: Blog }) => response.blog,
      providesTags: ["Blogs"],
    }),

    // 📌 Fetch all blogs
    getBlogs: builder.query<Blog[], void>({
      query: () => `/blogs/bulk`,
      transformResponse: (response: { blogs: Blog[] }) => response.blogs,
      providesTags: ["Blogs"],
    }),

    // 📌 Create a new blog
    createBlog: builder.mutation<Blog, Partial<Blog>>({
      query: (newBlog) => ({
        url: "/blogs",
        method: "POST",
        body: newBlog,
      }),
      transformResponse: (response: { blog: Blog }) => response.blog,
      invalidatesTags: ["Blogs"],
    }),

    // 📌 Update an existing blog
    updateBlog: builder.mutation<
      Blog,
      { id: number; updatedBlog: Partial<Blog> }
    >({
      query: ({ id, updatedBlog }) => ({
        url: `/blogs/${id}`,
        method: "PUT",
        body: updatedBlog,
      }),
      transformResponse: (response: { blog: Blog }) => response.blog,
      invalidatesTags: ["Blogs"],
    }),

    // 📌 Delete a blog
    deleteBlog: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blogs"],
    }),

    likeBlog: builder.mutation<Like, { blogId: number; userId: number }>({
      query: ({ blogId, userId }) => ({
        url: `/likes/${blogId}/like`,
        method: "POST",
        body: { userId },
      }),
      invalidatesTags: ["Blogs"],
    }),
    

    unlikeBlog: builder.mutation<{ message: string }, { blogId: number; userId: number }>({
      query: ({ blogId, userId }) => ({
        url: `/likes/${blogId}/unlike`,
        method: "DELETE",
        body: { userId }, // ✅ send userId in body
      }),
      invalidatesTags: ["Blogs"],
    }),
    
    getLikesForBlog: builder.query<Like[], number>({
      query: (blogId) => `/blogs/${blogId}/likes`,
    }),

    getLikeStatus: builder.query<{ liked: boolean }, { blogId: number; userId: number }>({
      query: ({ blogId, userId }) => `/likes/${blogId}/status?userId=${userId}`,
    }),
    
  }),
});

// ✅ Export generated hooks
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useGetBlogQuery,
  useGetBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  useLikeBlogMutation,
  useUnlikeBlogMutation,
  useGetLikesForBlogQuery,
  useGetLikeStatusQuery
} = meBlogsApi;
