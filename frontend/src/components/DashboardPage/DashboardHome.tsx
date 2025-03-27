import DashboardStats from "./DashboardStats";

export default function DashboardHome() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-white tracking-tight">
          Welcome to <span className="text-red-500">MeBlogs</span>
        </h1>
        <p className="text-lg text-neutral-400 mt-4 max-w-2xl">
          Manage your content, track your progress, and gain valuable insights with ease.
        </p>
      </div>

      {/* Statistics Cards */}
      <DashboardStats />

    </div>
  );
}
