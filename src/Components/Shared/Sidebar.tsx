"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  isSidebarOpen: boolean;
}

interface User {
  id: string;
  role: "admin" | "volunteer" | "other"; // Add other roles as needed
}

const Sidebar = ({ isSidebarOpen }: Props) => {
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/checkUser");
      const data = await res.json();
      if (data.user) {
        setUser(data.user);
      }
    };

    fetchUser();
  }, []);

  return (
    <div
      className={`fixed inset-y-0 top-[71px] z-30 min-w-[260px] transform bg-slate-900 text-white transition-transform delay-200 duration-200 md:relative md:top-0 md:translate-x-0 h-screen ${
        isSidebarOpen ? "md:translate-x-0" : "-translate-x-full"
      }`}
    >
      <div>
        {user && user.role === "admin" && (
          <ul>
            <li>
              <Link
                href="/dashboard"
                className={`px-4 py-2 cursor-pointer w-full inline-block text-nowrap hover:bg-slate-500 ${
                  isActive("/dashboard") ? "bg-slate-700" : ""
                }`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/addVounteer"
                className={`px-4 py-2 cursor-pointer w-full inline-block text-nowrap hover:bg-slate-500 ${
                  isActive("/dashboard/addVounteer") ? "bg-slate-700" : ""
                }`}
              >
                Add Volunteer
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/removeVounteer"
                className={`px-4 py-2 cursor-pointer w-full inline-block text-nowrap hover:bg-slate-500 ${
                  isActive("/dashboard/removeVounteer") ? "bg-slate-700" : ""
                }`}
              >
                Remove Volunteer
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/removeUser"
                className={`px-4 py-2 cursor-pointer w-full inline-block text-nowrap hover:bg-slate-500 ${
                  isActive("/dashboard/removeUser") ? "bg-slate-700" : ""
                }`}
              >
                Remove User
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/donationList"
                className={`px-4 py-2 cursor-pointer w-full inline-block text-nowrap hover:bg-slate-500 ${
                  isActive("/dashboard/donationList") ? "bg-slate-700" : ""
                }`}
              >
                Donation List
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/availableFoodList"
                className={`px-4 py-2 cursor-pointer w-full inline-block text-nowrap hover:bg-slate-500 ${
                  isActive("/dashboard/availableFoodList") ? "bg-slate-700" : ""
                }`}
              >
                Available Food list
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/recquestAccept"
                className={`px-4 py-2 cursor-pointer w-full inline-block text-nowrap hover:bg-slate-500 ${
                  isActive("/dashboard/recquestAccept") ? "bg-slate-700" : ""
                }`}
              >
                Recquest Accept
              </Link>
            </li>
          </ul>
        )}
        {user && user.role === "volunteer" && (
          <ul>
            <li>
              <Link
                href="/dashboard"
                className={`px-4 py-2 cursor-pointer w-full inline-block text-nowrap hover:bg-slate-500 ${
                  isActive("/dashboard") ? "bg-slate-700" : ""
                }`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/donationList"
                className={`px-4 py-2 cursor-pointer w-full inline-block text-nowrap hover:bg-slate-500 ${
                  isActive("/dashboard/donationList") ? "bg-slate-700" : ""
                }`}
              >
                Donation List
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/availableFoodList"
                className={`px-4 py-2 cursor-pointer w-full inline-block text-nowrap hover:bg-slate-500 ${
                  isActive("/dashboard/availableFoodList") ? "bg-slate-700" : ""
                }`}
              >
                Available Food list
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
