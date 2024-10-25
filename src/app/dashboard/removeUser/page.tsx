import AdminLayout from "@/Layouts/AdminLayout";
import RemoveUserTable from "./_component/RemoveUserTable";

const page = () => {
  return (
    <AdminLayout>
      <h2 className="text-2xl font-semibold mt-2 mb-4">Remove User</h2>
      <RemoveUserTable />
    </AdminLayout>
  );
};

export default page;
