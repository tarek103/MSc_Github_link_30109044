"use client";
import axios from "axios";
import { useEffect, useState } from "react";

// Define types for food and user data
interface User {
  name: string;
  email: string;
}

interface Food {
  _id: string;
  donator: User;
  foodName: string;
  quantity: number;
  expiryDate: string;
  createdAt: string;
}

const AvailableFoodListTable = () => {
  const [foods, setFoods] = useState<Food[]>([]);

  // Fetch available food data when the component loads
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get("/api/foods");
        setFoods(response.data);
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    };

    fetchFoods();
  }, []);

  // Helper function to check if the food is available (quantity > 0 and not expired)
  const isFoodAvailable = (food: Food) => {
    const currentDate = new Date();
    const expiryDate = new Date(food.expiryDate);
    return food.quantity > 0 && expiryDate > currentDate;
  };

  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Donor Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Food
              </th>
              <th scope="col" className="px-6 py-3">
                Available
              </th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food._id} className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {food.donator.name}
                </th>
                <td className="px-6 py-4">{food.donator.email}</td>
                <td className="px-6 py-4">{food.foodName}</td>
                <td className="px-6 py-4">
                  {isFoodAvailable(food) ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AvailableFoodListTable;
