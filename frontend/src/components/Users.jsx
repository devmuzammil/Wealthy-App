import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export const Users = ({ name }) => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setUsers(response.data.users || []);
      });
  }, [filter]);

  const filteredUsers = users.filter((user) => user.firstName !== name);

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-xl text-gray-100">People</h2>
        <div className="relative w-60">
          <input
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>
      </div>
      <div className="space-y-3">
        {filteredUsers.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-900 border border-gray-800 p-4 rounded-xl hover:border-gray-700 transition">
      <div className="flex items-center gap-3 w-full">
        <div className="rounded-full h-12 w-12 bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center font-semibold shadow">
          {user.firstName[0]}
        </div>
        <div>
          <p className="font-medium text-gray-100">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-sm text-gray-400">{user.username}</p>
        </div>
      </div>
      <div className="w-full sm:w-40 mt-3 sm:mt-0">
        <Button
          onClick={() =>
            navigate("/send?id=" + user._id + "&name=" + user.firstName)
          }
          label={"Send Money"}
          size={"sm"}
        />
      </div>
    </div>
  );
}
