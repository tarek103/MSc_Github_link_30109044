"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface User {
  id: string;
  role: "admin" | "volunteer" | "donator"; // Add other roles as needed
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    setUser(null); // Clear user state after logout
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 xl:px-10">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center">
              <Link href="/">
                <span className="text-xl font-bold text-gray-900">
                  Food Finder
                </span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex space-x-2 lg:space-x-6">
              <Link href="/">
                <span className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </span>
              </Link>
              <Link href="/about-us">
                <span className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  About
                </span>
              </Link>
              <Link href="/findFood">
                <span className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Find Food
                </span>
              </Link>
              <Link href="/contacts">
                <span className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Contact
                </span>
              </Link>
            </div>
          </div>
          <div className="sm:block hidden">
            <div className="flex items-center space-x-3">
              {user &&
                (user.role === "admin" ||
                  user.role === "volunteer" ||
                  user.role === "donator") && (
                  <Link href="/myOrderStatus">
                    <span className="flex flex-col items-center">
                      <ShoppingBag className="text-[#FFB606]" />
                      <span className="text-[10px]">My Order</span>
                    </span>
                  </Link>
                )}
              {user && (user.role === "admin" || user.role === "volunteer") && (
                <Link href="/dashboard">
                  <span className="px-4 py-2 border border-[#FFB606] text-black text-lg font-semibold rounded-md">
                    Dashboard
                  </span>
                </Link>
              )}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-[#FFB606] text-white text-lg font-semibold rounded-md"
                >
                  Logout
                </button>
              ) : (
                <Link href="/login">
                  <span className="px-4 py-2 bg-[#FFB606] text-white text-lg font-semibold rounded-md">
                    Login
                  </span>
                </Link>
              )}
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  className={!isOpen ? "block" : "hidden"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  className={isOpen ? "block" : "hidden"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? "block" : "hidden"} sm:hidden`}>
        <div className="pt-2 pb-4 space-y-1">
          <Link href="/">
            <span className="text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
              Home
            </span>
          </Link>
          <Link href="/about-us">
            <span className="text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
              About
            </span>
          </Link>
          <Link href="/findFood">
            <span className="text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
              Find Food
            </span>
          </Link>
          <Link href="/contacts">
            <span className="text-gray-900 block px-3 py-2 rounded-md text-base font-medium">
              Contact
            </span>
          </Link>
          {user && (user.role === "admin" || user.role === "volunteer") && (
            <Link href="/dashboard">
              <span className="px-4 py-2 bg-[#FFB606] text-white text-lg font-semibold rounded-md inline-block ml-3">
                Dashboard
              </span>
            </Link>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-[#FFB606] text-white text-lg font-semibold rounded-md inline-block ml-3"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              <span className="px-4 py-2 bg-[#FFB606] text-white text-lg font-semibold rounded-md inline-block ml-3">
                Login
              </span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
