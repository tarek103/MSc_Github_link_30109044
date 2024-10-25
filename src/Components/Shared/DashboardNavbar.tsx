"use client";
import Link from "next/link";
interface Props {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const DashboardNavbar = ({ setIsSidebarOpen, isSidebarOpen }: Props) => {
  const toggleMenu = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex justify-between items-center bg-slate-900 text-white py-4">
      <div className="flex">
        <div className="block md:hidden ml-4 md:ml-0">
          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {isSidebarOpen ? (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
        <Link
          href="/"
          className="text-xl font-semibold px-4 md:inline-block hidden"
        >
          FoodFinder
        </Link>
      </div>
      <div className="px-4">
        <div className="user h-10 w-10 flex items-center justify-center rounded-full bg-slate-500">
          <p>0</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
