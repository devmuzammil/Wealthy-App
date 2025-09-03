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
      <h2 className="font-bold text-xl mb-4 text-gray-800">Users</h2>
      <div className="mb-6">
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          type="text"
          placeholder="Search users..."
          className="w-full px-4 py-2 border rounded-xl border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition"
        />
      </div>
      <div className="space-y-4">
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
    <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <div className="rounded-full h-12 w-12 bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center font-semibold shadow">
          {user.firstName[0]}
        </div>
        <div>
          <p className="font-medium text-gray-800">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-sm text-gray-500">{user.username}</p>
        </div>
      </div>
      <Button
        onClick={() =>
          navigate("/send?id=" + user._id + "&name=" + user.firstName)
        }
        label={"Send Money"}
      />
    </div>
  );
}
