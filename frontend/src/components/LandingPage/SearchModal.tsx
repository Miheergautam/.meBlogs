import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

type Props = {
  onClose: () => void;
};

export default function SearchModal({ onClose }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-opacity-40 backdrop-blur-xl z-50 flex justify-center items-start pt-40 px-4">
      <div className="flex max-w-7xl w-full justify-center p-4 rounded-xl min-h-4xl">
        <div className="relative w-full max-w-2xl animate-scale-in">
          <input
            ref={inputRef}
            type="text"
            placeholder=".meSearch..."
            className="w-full text-lg px-5 py-3 bg-neutral-900 border border-neutral-700 text-white rounded-xl focus:outline-none placeholder-white"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-2 text-gray-400 hover:text-white transition"
            aria-label="Close search"
          >
            <IoClose size={20} />
          </button>

          {/* Default suggestions / helper text */}
          <div className="mt-1 space-y-2 p-4 rounded-xl text-white">
            <p className="text-xl">Try searching for:</p>
            <ul className="text-lg list-disc list-inside space-y-1">
              <li>Recent documents or files</li>
              <li>Commands like “Open Settings”</li>
              <li>People or projects</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
