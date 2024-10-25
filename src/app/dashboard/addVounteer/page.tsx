import AdminLayout from "@/Layouts/AdminLayout";
import AddVoulnteerTable from "./_components/AddVoulnteerTable";

const page = () => {
  return (
    <AdminLayout>
      <h2 className="text-2xl font-semibold mt-2 mb-4">Add Volunteer</h2>
      <AddVoulnteerTable />
    </AdminLayout>
  );
};

export default page;
