import HomeLayout from "@/Layouts/HomeLayout";
import contact from "@/app/assets/images/contact/contact.jpg";
import Image from "next/image";
import ContactForm from "./_components/ContactForm";

const page = () => {
  return (
    <HomeLayout>
      <div className="container mx-auto px-4 xl:px-10 mt-8">
        <div className="grid grid-cols-2 gap-5 items-center">
          <div>
            <Image
              src={contact}
              alt="gallery image"
              className="w-full h-auto rounded-md"
            />
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default page;
