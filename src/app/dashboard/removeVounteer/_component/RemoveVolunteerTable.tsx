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

const RemoveVolunteerTable = () => {
  const [users, setUsers] = useState<User[]>([]);

  // Fetch all volunteers when the component loads
  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await axios.get("/api/users");
        // Filter only volunteers
        setUsers(
          response.data.filter((user: User) => user.role === "volunteer")
        );
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchVolunteers();
  }, []);

  // Handle removing a volunteer (change role back to donator)
  const handleRemoveVolunteer = async (userId: string) => {
    try {
      await axios.patch(`/api/users/${userId}/remove-volunteer`);
      // Remove the user from the state after updating the role
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error removing volunteer:", error);
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
                    onClick={() => handleRemoveVolunteer(user._id)}
                  >
                    <Trash2 />
                    <span>Remove</span>
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

export default RemoveVolunteerTable;
