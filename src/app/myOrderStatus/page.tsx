import HomeLayout from "@/Layouts/HomeLayout";
import MyOrderStatus from "./_component/MyOrderStatus";

const page = () => {
  return (
    <HomeLayout>
      <div className="container mx-auto px-4 xl:px-10">
        <MyOrderStatus />
      </div>
    </HomeLayout>
  );
};

export default page;
