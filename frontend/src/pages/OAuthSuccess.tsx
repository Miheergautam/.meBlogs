import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");

    if (token) {
      localStorage.setItem("token", `Bearer ${token}`);
      navigate("/blogs");
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  return <p>Signing you in with Google...</p>;
};

export default OAuthSuccess;
