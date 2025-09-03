import { PresentationChartBarIcon, InboxIcon, UserCircleIcon, PowerIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";

export function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="h-[calc(100vh-2rem)] w-full max-w-[18rem] p-4 shadow-xl rounded-xl bg-white/90 backdrop-blur-md">
      <ul className="space-y-2">
        <li className="mb-4 hover:bg-indigo-100 rounded-lg transition">
          <div className="flex items-center gap-2 p-3">
            <PresentationChartBarIcon className="h-5 w-5 text-indigo-600" />
            <Link to="/dashboard" className="font-medium text-gray-700">
              Dashboard
            </Link>
          </div>
        </li>
        <li className="mb-4 hover:bg-indigo-100 rounded-lg transition">
          <div className="flex items-center gap-2 p-3">
            <InboxIcon className="h-5 w-5 text-indigo-600" />
            <Link to="/history" className="font-medium text-gray-700">
              History
            </Link>
          </div>
        </li>
        <li className="mb-4 hover:bg-indigo-100 rounded-lg transition">
          <div className="flex items-center gap-2 p-3">
            <UserCircleIcon className="h-5 w-5 text-indigo-600" />
            <Link to="/profile" className="font-medium text-gray-700">
              Profile
            </Link>
          </div>
        </li>
        <li
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/signin");
          }}
          className="mb-4 hover:bg-red-100 rounded-lg transition cursor-pointer"
        >
          <div className="flex items-center gap-2 p-3">
            <PowerIcon className="h-5 w-5 text-red-600" />
            <span className="font-medium text-red-600">Log Out</span>
          </div>
        </li>
      </ul>
    </div>
  );
}
