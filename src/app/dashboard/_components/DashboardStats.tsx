"use client";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

const DashboardStats = () => {
  const [stats, setStats] = useState({
    volunteerCount: 0,
    donatorCount: 0,
    totalFoodQuantity: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch stats from API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/dashboard/stats");
        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }
        const data = await response.json();
        setStats(data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-5 lg:grid-cols-3 mt-8">
      <div className="h-full rounded-lg bg-[#00BB4B] px-7 py-5">
        <div className="card-box">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-xl font-semibold uppercase text-white lg:text-2xl">
              Total Volunteer
            </h3>
            <div className="action flex items-center">
              <button type="button" className="rounded bg-white">
                <Plus className="text-[#00BB4B]" size={30} />
              </button>
            </div>
          </div>
          <div className="progress-bar mt-3 lg:mt-6">
            <div className="mb-3 flex justify-end">
              <p className="text-xl font-semibold text-white">
                <span>{stats.volunteerCount}</span> Person
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-full rounded-lg bg-[#F1BC00] px-7 py-5">
        <div className="card-box">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-xl font-semibold uppercase text-white lg:text-2xl">
              Food Quantity
            </h3>
            <div className="action flex items-center">
              <button type="button" className="rounded bg-white">
                <Minus className="text-[#F1BC00]" size={30} />
              </button>
            </div>
          </div>
          <div className="progress-bar mt-3 lg:mt-6">
            <div className="mb-3 flex justify-end">
              <p className="text-xl font-semibold text-white">
                <span>{stats.totalFoodQuantity}</span> Food
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-full rounded-lg bg-[#00B3EB] px-7 py-5">
        <div className="card-box">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-xl font-semibold uppercase text-white lg:text-2xl">
              Total Doner
            </h3>
            <div className="action flex items-center">
              <button type="button" className="rounded bg-white">
                <Minus className="text-[#00B3EB]" size={30} />
              </button>
            </div>
          </div>
          <div className="progress-bar mt-3 lg:mt-6">
            <div className="mb-3 flex justify-end">
              <p className="text-xl font-semibold text-white">
                <span>{stats.donatorCount}</span> Person
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
