import AdminLayout from "@/Layouts/AdminLayout";
import DonationListTable from "./_components/DonationListTable";

const page = () => {
  return (
    <AdminLayout>
      <h2 className="text-2xl font-semibold mt-2 mb-4">Donation List</h2>
      <DonationListTable />
    </AdminLayout>
  );
};

export default page;
