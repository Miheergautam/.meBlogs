import { HiOutlineUser, HiOutlineCog, HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function ProfilePopup({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();

  return (
    <div className="absolute right-0 mt-2 w-48 bg-neutral-800 text-white shadow-lg rounded-lg py-2 transition-all duration-200 opacity-100 scale-100">
      {/* Profile Option */}
      <button
        className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-700 w-full text-left"
        onClick={() => {
          navigate("/dashboard/profile");
          onClose();
        }}
      >
        <HiOutlineUser size={20} />
        <span>Profile</span>
      </button>

      {/* Settings Option */}
      <button
        className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-700 w-full text-left"
        onClick={() => {
          navigate("/settings");
          onClose();
        }}
      >
        <HiOutlineCog size={20} />
        <span>Settings</span>
      </button>

      {/* Logout Option */}
      <button
        className="flex items-center gap-3 px-4 py-3 hover:bg-red-500 w-full text-left"
        onClick={() => {
          localStorage.removeItem("token"); 
          navigate("/");
          onClose();
        }}
      >
        <HiOutlineLogout size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
}
