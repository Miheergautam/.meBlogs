import { FaBlogger } from "react-icons/fa";
import { IoHelpCircle } from "react-icons/io5";
import { CgMenuGridO } from "react-icons/cg";

export default function NavBar() {
  return (
    <div className="flex justify-between items-center p-2 border border-b-neutral-700  bg-neutral-800">
      <FaBlogger className="text-red-400 text-5xl" />
      <div className="flex justify-center items-center space-x-6">
        <div className="hover:bg-red-400 duration-200 hover:rounded-full p-1">
          <IoHelpCircle className="text-3xl text-white" />
        </div>
        <div className=" hover:bg-red-400 duration-200 hover:rounded-full p-1">
          <CgMenuGridO className="text-3xl text-white" />
        </div>
        <img
          src=""
          alt="M"
          className="bg-white rounded-full w-8 h-8 border-neutral-500"
        />
      </div>
    </div>
  );
}
