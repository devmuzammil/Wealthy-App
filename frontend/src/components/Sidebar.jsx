import { PresentationChartBarIcon, InboxIcon, UserCircleIcon, PowerIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function Sidebar({ inline = true }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen((o) => !o);
    if (typeof window !== 'undefined') {
      window.addEventListener('toggle-mobile-nav', handler);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('toggle-mobile-nav', handler);
      }
    };
  }, []);

  return (
    <div className={inline ? "h-[calc(100vh-2rem)] w-full max-w-[18rem] p-4 shadow-xl rounded-xl bg-gray-900 border border-gray-800" : "md:hidden"}>
      {/* Mobile overlay */}
      <div className={`fixed inset-0 z-40 md:hidden transition-opacity ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
        <div className={`absolute left-0 top-0 h-full w-72 bg-gray-900 border-r border-gray-800 p-4 transform transition-transform ${open ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex justify-between items-center mb-4">
            <div className="text-gray-300 font-semibold">Menu</div>
            <button onClick={() => setOpen(false)} className="h-10 w-10 inline-flex items-center justify-center rounded-lg border border-gray-800 text-gray-300">
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          {NavList({ navigate })}
        </div>
      </div>

      {/* Desktop list */}
      <div className="hidden md:block">
        {NavList({ navigate })}
      </div>
    </div>
  );
}

function NavList({ navigate }) {
  return (
    <ul className="space-y-2">
      <li className="mb-4 hover:bg-indigo-100/5 rounded-lg transition">
        <div className="flex items-center gap-2 p-3">
          <PresentationChartBarIcon className="h-5 w-5 text-indigo-400" />
          <Link to="/dashboard" className="font-medium text-gray-200">
            Dashboard
          </Link>
        </div>
      </li>
      <li className="mb-4 hover:bg-indigo-100/5 rounded-lg transition">
        <div className="flex items-center gap-2 p-3">
          <InboxIcon className="h-5 w-5 text-indigo-400" />
          <Link to="/history" className="font-medium text-gray-200">
            History
          </Link>
        </div>
      </li>
      <li className="mb-4 hover:bg-indigo-100/5 rounded-lg transition">
        <div className="flex items-center gap-2 p-3">
          <UserCircleIcon className="h-5 w-5 text-indigo-400" />
          <Link to="/profile" className="font-medium text-gray-200">
            Profile
          </Link>
        </div>
      </li>
      <li
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/signin");
        }}
        className="mb-4 hover:bg-red-100/5 rounded-lg transition cursor-pointer"
      >
        <div className="flex items-center gap-2 p-3">
          <PowerIcon className="h-5 w-5 text-red-400" />
          <span className="font-medium text-red-400">Log Out</span>
        </div>
      </li>
    </ul>
  );
}
