import AdminLayout from "@/Layouts/AdminLayout";
import RemoveVolunteerTable from "./_component/RemoveVolunteerTable";

const page = () => {
  return (
    <AdminLayout>
      <h2 className="text-2xl font-semibold mt-2 mb-4">Remove Volunteer</h2>
      <RemoveVolunteerTable />
    </AdminLayout>
  );
};

export default page;
