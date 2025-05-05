import { useNavigate } from "react-router-dom";
import PullToRefresh from "react-pull-to-refresh";

import NavBar from "../components/LandingPage/NavBar";
import FloatingCardSection from "../components/LandingPage/FloatingCardSection";
import Footer from "../components/LandingPage/Footer";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleRefresh = () =>
    new Promise<void>((resolve) => {
      window.location.reload();
      resolve();
    });

  return (
    <PullToRefresh onRefresh={handleRefresh} style={{ minHeight: "100vh" }}>
      <div className="absolute flex flex-col min-h-screen bg-neutral-900 text-white">
        <NavBar />

        {/* Main Section */}
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-5 items-center px-6 lg:px-16 py-12 flex-grow">
          {/* Hero Section */}
          <div className="col-span-3 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              We help you{" "}
              <span className="bg-red-500 text-white px-3 py-1 rounded-md">
                write
              </span>{" "}
              & share your stories.
            </h1>

            <p className="text-lg md:text-xl mt-4 max-w-md md:max-w-lg opacity-90">
              Create, publish, and inspire with the most elegant blogging
              platform.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center">
              <button
                className="bg-white text-red-500 font-semibold px-6 py-3 rounded-full text-lg shadow-lg hover:bg-red-500 hover:text-white transition duration-300 w-full sm:w-auto"
                onClick={() => navigate("/dashboard")}
              >
                Start Writing
              </button>
              <button className="bg-neutral-800 text-white font-semibold px-6 py-3 rounded-full text-lg shadow-lg hover:bg-neutral-700 transition duration-300 w-full sm:w-auto">
                Learn More
              </button>
            </div>
          </div>

          {/* Floating Card Section (Appears on top in mobile view) */}
          <div className="col-span-2 col-start-4 w-full flex justify-center lg:justify-end mb-10 lg:mb-0">
            <FloatingCardSection />
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </PullToRefresh>
  );
}
