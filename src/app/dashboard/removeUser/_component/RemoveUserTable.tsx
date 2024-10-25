"use client";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

// Define User type based on the structure of your API data
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const RemoveUserTable = () => {
  const [users, setUsers] = useState<User[]>([]);

  // Fetch all users when the component loads
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Handle deleting a user
  const handleDeleteUser = async (userId: string) => {
    try {
      await axios.delete(`/api/users/${userId}/delete`);
      // Remove the user from the state after deleting
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                User Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {user.name}
                </th>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <button
                    className="flex items-center space-x-1"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    <Trash2 />
                    <span>Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RemoveUserTable;
