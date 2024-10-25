"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

// Define the type for Food data
interface Food {
  _id: string;
  foodName: string;
  location: string;
  image: string;
}

export default function FindFoods() {
  // State to store the fetched food list
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch the food data when the component is mounted
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch("/api/foods"); // Adjust this endpoint as needed
        if (!res.ok) {
          throw new Error("Failed to fetch food data");
        }

        const data: Food[] = await res.json();
        setFoods(data);
      } catch (error) {
        setError((error as Error).message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  // Filtered foods based on search term
  const filteredFoods = foods.filter((food) =>
    food.foodName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Loading food data...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section className="container mx-auto px-4 mt-6">
      <div className="section-title flex justify-center">
        <div className="max-w-2xl">
          <h2 className="text-center text-2xl sm:text-3xl font-bold">
            Welcome To <span className="text-[#FFB606]">Food Finder</span>
          </h2>
          <p className="text-center">Here you found all food</p>
        </div>
      </div>
      <div className="mt-4 mb-8 flex justify-center">
        <div className="w-[300px]">
          <input
            type="text"
            placeholder="Search Food"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FFB606] focus:border-[#FFB606]"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredFoods.map((food) => (
          <div
            key={food._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={food.image}
              alt={food.foodName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {food.foodName}
              </h3>
              <p className="text-gray-600">{food.location}</p>
              <Link href={`/getFood/${food._id}`}>
                <span className="mt-4 w-full bg-[#FFB606] text-white py-2 px-4 rounded hover:bg-[#c2952d] inline-flex justify-center">
                  Get Food
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
