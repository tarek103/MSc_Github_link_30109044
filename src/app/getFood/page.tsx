import HomeLayout from "@/Layouts/HomeLayout";
import HowToGetFood from "./_components/HowToGetFood";
import GetForm from "./_components/GetForm";

const GetFoodPage = () => {
  return (
    <div>
      <HomeLayout>
        <div className="container mx-auto px-4 mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="how-to-donate">
              <HowToGetFood />
            </div>
            <div className="donate-forms">
              <GetForm id="1" />
            </div>
          </div>
        </div>
      </HomeLayout>
    </div>
  );
};

export default GetFoodPage;
