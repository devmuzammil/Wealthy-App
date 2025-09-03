import { Link } from "react-router-dom";

export function BottomWarning({ label, buttonText, to }) {
  return (
    <div className="pt-4 text-sm flex justify-center text-gray-600">
      <span>{label}</span>
      <Link
        className="underline pl-1 font-medium text-indigo-600 hover:text-indigo-800 transition"
        to={to}
      >
        {buttonText}
      </Link>
    </div>
  );
}
