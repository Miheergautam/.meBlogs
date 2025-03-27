import { HiOutlineDocumentText, HiOutlineEye, HiOutlineHeart, HiOutlineChat } from "react-icons/hi";

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mx-auto">
      <StatCard icon={<HiOutlineDocumentText size={36} />} title="Total Blogs" value="24" accent="from-blue-500 to-blue-700" />
      <StatCard icon={<HiOutlineEye size={36} />} title="Published Blogs" value="18" accent="from-green-500 to-green-700" />
      <StatCard icon={<HiOutlineHeart size={36} />} title="Total Likes" value="152" accent="from-red-500 to-red-700" />
      <StatCard icon={<HiOutlineChat size={36} />} title="Total Comments" value="67" accent="from-yellow-500 to-yellow-700" />
    </div>
  );
}

type StatCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
  accent: string;
};

function StatCard({ icon, title, value, accent }: StatCardProps) {
  return (
    <div className="relative flex flex-col items-center justify-center p-6 rounded-xl shadow-lg bg-neutral-800 text-white transition-all transform hover:scale-105 hover:shadow-2xl">
      {/* Background Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-25 rounded-xl blur-lg pointer-events-none`}></div>

      {/* Icon with Gradient Background */}
      <div className={`p-4 rounded-full bg-gradient-to-br ${accent} shadow-md mb-4`}>
        {icon}
      </div>

      {/* Text Content */}
      <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-wider">{title}</h3>
      <p className="text-4xl font-bold text-white">{value}</p>
    </div>
  );
}
