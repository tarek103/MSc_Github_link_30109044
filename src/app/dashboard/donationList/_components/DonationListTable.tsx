"use client"; // This component needs to run client-side
import { useEffect, useState } from "react";

const DonationListTable = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch donations from the API
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch("/api/donations", {
          method: "GET",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch donations");
        }
        const data = await res.json();
        setDonations(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  if (loading) {
    return <p>Loading donations...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  console.log(donations);

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
            </tr>
          </thead>
          <tbody>
            {donations.length > 0 ? (
              donations.map((donation: any) => (
                <tr key={donation._id} className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {donation.donator?.name || "Unknown"}
                  </th>
                  <td className="px-6 py-4">
                    {donation.donator?.email || "No email"}
                  </td>
                  <td className="px-6 py-4">{donation.foodName}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center">
                  No donations available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationListTable;
