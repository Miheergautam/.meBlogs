import { useEffect, useState } from "react";
import axios from "axios";

export interface Blog {
  content: string;
  title: string;
  id: number;
  author: {
    id:number;
    name: string;
    bio: string;
    email: string;
    profileImage:string;
  };
  createdAt: string;
  category: string | "";
  thumbnail: string | "";
  published:boolean;
}

export interface User {
  id:number;
  name:string;
  bio:string;
  email:string;
  profileImage:string;
}

export const useBlog = ({ id }: { id: number }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `https://backend.miheergautam04.workers.dev/api/v1/blogs/${id}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setBlog(response.data.blog);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return { loading, blog };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "https://backend.miheergautam04.workers.dev/api/v1/blogs/bulk",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return { loading, blogs };
};

export const useUser = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://backend.miheergautam04.workers.dev/api/v1/auth/get",
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { loading, user };
};
