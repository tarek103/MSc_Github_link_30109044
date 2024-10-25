import HomeLayout from "@/Layouts/HomeLayout";
import DonateForm from "./_components/DonateForm";
import HowToDonate from "./_components/HowToDonate";

const DonateFoodPage = () => {
  return (
    <HomeLayout>
      <div className="container mx-auto px-4 mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="how-to-donate">
            <HowToDonate />
          </div>
          <div className="donate-forms">
            <DonateForm />
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default DonateFoodPage;
