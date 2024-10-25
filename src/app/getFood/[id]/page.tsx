import HomeLayout from "@/Layouts/HomeLayout";
import { NextPage } from "next";
import GetForm from "../_components/GetForm";
import HowToGetFood from "../_components/HowToGetFood";

interface GetFoodPageProps {
  params: {
    id: string; // Explicitly define the type of id as string
  };
}
const GetFoodPage: NextPage<GetFoodPageProps> = ({ params: { id } }) => {
  return (
    <div>
      <HomeLayout>
        <div className="container mx-auto px-4 xl:px-10 mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="how-to-donate">
              <HowToGetFood />
            </div>
            <div className="donate-forms">
              <GetForm id={id} />
            </div>
          </div>
        </div>
      </HomeLayout>
    </div>
  );
};

export default GetFoodPage;
