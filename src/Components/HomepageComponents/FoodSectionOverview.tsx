"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

// Define the type for Donation data
interface Donation {
  _id: string;
  foodName: string;
  location: string;
  image: string;
  donator: string;
}

const FoodSectionOverview = () => {
  // State to store the fetched donation list
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Fetch the donation data when the component is mounted
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch("/api/donations"); // Adjust this endpoint as needed
        if (!res.ok) {
          throw new Error("Failed to fetch donations");
        }

        const data: Donation[] = await res.json();
        setDonations(data);
      } catch (error) {
        setError((error as Error).message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  if (loading) {
    return <p>Loading donations...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section className="container mx-auto px-4 mt-12 md:mt-20">
      <div className="section-title flex justify-center">
        <div className="max-w-2xl">
          <h2 className="text-center text-2xl sm:text-3xl font-bold">
            Welcome To <span className="text-[#FFB606]">Food Finder</span>. Join
            With Us, Your Attention can change the world.
          </h2>
          <p className="text-center">
            We are a Charity/ Non-profit/ Fundraising/ NGO organization helping
            people without food.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {donations.map((donation) => (
          <div
            key={donation._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={donation.image}
              alt={donation.foodName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {donation.foodName}
              </h3>
              <p className="text-gray-600">{donation.location}</p>
              <Link href={`/getFood/${donation._id}`}>
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
};

export default FoodSectionOverview;
