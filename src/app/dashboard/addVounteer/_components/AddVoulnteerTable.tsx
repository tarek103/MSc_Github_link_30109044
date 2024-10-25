"use client";
import axios from "axios";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";

// Define User type based on the structure of your API data
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const AddVolunteerTable = () => {
  // Set the type of the state to be an array of User
  const [users, setUsers] = useState<User[]>([]); // Explicitly typed
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // Typing the selected user
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  useEffect(() => {
    // Fetch all users
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data); // Set fetched data
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleAddVolunteer = async (userId: string) => {
    try {
      await axios.patch(`/api/users/${userId}/make-volunteer`);
      // Update the local user list to reflect the change
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: "volunteer" } : user
        )
      );
      setIsModalOpen(false); // Close modal after action
    } catch (error) {
      console.error("Error updating user role:", error);
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
                Role
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
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">
                  <button
                    className="flex items-center space-x-1"
                    onClick={() => {
                      setSelectedUser(user);
                      setIsModalOpen(true);
                    }}
                  >
                    <CirclePlus />
                    <span>Add</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p>
              Are you sure you want to make {selectedUser?.name} a volunteer?
            </p>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAddVolunteer(selectedUser?._id!)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddVolunteerTable;
