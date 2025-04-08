import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoArrowBack, IoEye, IoEyeOff } from "react-icons/io5";
import { useLoginUserMutation } from "../redux/services/meBlogsApi";

const SigninPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      await loginUser(formData).unwrap();
      navigate("/blogs");
    } catch (error: any) {
      setErrorMessage(error?.data?.message || "Invalid email or password");
    }
  };

/*   const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8787/api/v1/auth/google';
  }; */

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-900 text-white px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-md sm:max-w-sm md:max-w-md bg-neutral-800 p-6 sm:p-8 rounded-2xl shadow-lg border border-neutral-700 relative">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-3 left-3 sm:top-4 sm:left-4 text-neutral-400 hover:text-red-500 transition"
        >
          <IoArrowBack size={22} />
        </button>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-5 sm:mb-6">Sign In</h2>

        {errorMessage && <p className="text-red-500 text-center mb-3">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-neutral-300 text-sm mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-neutral-700 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="updating@me.com"
              required
            />
          </div>

          {/* Password Input with Toggle */}
          <div className="relative">
            <label className="block text-neutral-300 text-sm mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-neutral-700 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 sm:top-10 text-neutral-400 hover:text-red-500 transition"
            >
              {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
            </button>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className={`w-full py-2.5 sm:py-3 rounded-full font-semibold transition-all ${
              isLoading
                ? "bg-red-500 opacity-75 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Google Sign-In Button */}
        {/* <button
          onClick={handleGoogleLogin}
          className="mt-4 w-full py-2.5 sm:py-3 rounded-full bg-blue-500 hover:bg-blue-600 font-semibold transition-all flex items-center justify-center gap-2"
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button> */}

        <p className="text-center text-neutral-400 mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-red-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SigninPage;
