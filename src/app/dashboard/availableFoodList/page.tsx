import AdminLayout from "@/Layouts/AdminLayout";
import AvailableFoodListTable from "./_components/AvailableFoodListTable";

const page = () => {
  return (
    <AdminLayout>
      <h2 className="text-2xl font-semibold mt-2 mb-4">Avaliable Food List</h2>
      <AvailableFoodListTable />
    </AdminLayout>
  );
};

export default page;
