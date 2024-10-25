import AdminLayout from "@/Layouts/AdminLayout";
import AcceptRecquestTable from "./_components/AcceptRecquestTable";

const page = () => {
  return (
    <AdminLayout>
      <h2 className="text-2xl font-semibold mt-2 mb-4">Recquest Accept</h2>
      <AcceptRecquestTable />
    </AdminLayout>
  );
};

export default page;
