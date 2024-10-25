"use client";
import DashboardNavbar from "@/Components/Shared/DashboardNavbar";
import Sidebar from "@/Components/Shared/Sidebar";
import { useState } from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <section>
      <DashboardNavbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen} // Make sure this is passed correctly
      />
      <div className="flex">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <div className="dashboard-main px-4 w-full">{children}</div>
      </div>
    </section>
  );
}
