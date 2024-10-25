import imageone from "@/app/assets/images/gallery/1.jpg";
import image1 from "@/app/assets/images/teams/1.jpg";
import image2 from "@/app/assets/images/teams/2.jpg";
import image3 from "@/app/assets/images/teams/3.jpg";
import HomeLayout from "@/Layouts/HomeLayout";
import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <HomeLayout>
      <section className="container mx-auto px-4 xl:px-10 mt-12 md:mt-24">
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div>
              <h2 className="text-3xl font-bold">About Us</h2>
              <p className="mt-3">
                Discover the difference we’re making together. Here’s how our
                platform is turning surplus food into life-saving meals while
                reducing waste and supporting the environment.
              </p>
              <ul className="mt-3 ml-3">
                <li className="flex space-x-2 mb-3">
                  <Dot />
                  <span>
                    Over X tons of food diverted from landfills and redirected
                    to those in need, ensuring that surplus goes where it’s
                    needed most.
                  </span>
                </li>
                <li className="flex space-x-2 mb-3">
                  <Dot />
                  <span>
                    More than Y meals served to hungry individuals and families
                    across local communities, fighting food insecurity one plate
                    at a time.
                  </span>
                </li>
                <li className="flex space-x-2 mb-3">
                  <Dot />
                  <span>
                    Our platform has helped decrease food waste by Z%,
                    contributing to a healthier, more sustainable environment
                    for future generations.
                  </span>
                </li>
                <li className="flex space-x-2 mb-3">
                  <Dot />
                  <span>
                    Partnered with over A local charities and organizations,
                    building a strong network to redistribute food effectively
                    and efficiently.
                  </span>
                </li>
                <li className="flex space-x-2 mb-3">
                  <Dot />
                  <span>
                    Engaged over B volunteers and donors, empowering communities
                    to come together and make a tangible impact in reducing
                    hunger and waste.
                  </span>
                </li>
              </ul>
              <div className="mt-10">
                <Link
                  href="/donateFood"
                  className="bg-[#FFB606] px-4 py-3 text-white font-semibold text-lg rounded"
                >
                  Donate Food
                </Link>
              </div>
            </div>
            <div className="lg:block hidden">
              <Image
                src={imageone}
                alt="image"
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 mt-12 md:mt-24">
        <div className="flex justify-center mb-8">
          <div className="section-title max-w-full sm:max-w-md">
            <h2 className="text-center text-2xl sm:text-3xl font-bold">
              Our <span className="text-[#FFB606]">Teams</span>
            </h2>
            <p className="text-center">
              Your Attention Is Changed The Part Of World.Give a helping hand to
              those who need it!
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5 mt-10">
          <div className="teamCard bg-gray-100 rounded overflow-hidden">
            <Image src={image1} alt="team member" className="w-full h-auto" />
            <div className="py-5 px-4">
              <h3 className="text-xl font-semibold">John Smith</h3>
              <p>- Volunteer</p>
              <p className="mt-2">
                Ipsum dolor sit amet, consectetur adipisicing elit. Explicabo.
              </p>
            </div>
          </div>
          <div className="teamCard bg-gray-100 rounded overflow-hidden">
            <Image src={image2} alt="team member" className="w-full h-auto" />
            <div className="py-5 px-4">
              <h3 className="text-xl font-semibold">Ana Smith</h3>
              <p>- Volunteer</p>
              <p className="mt-2">
                Ipsum dolor sit amet, consectetur adipisicing elit. Explicabo.
              </p>
            </div>
          </div>
          <div className="teamCard bg-gray-100 rounded overflow-hidden">
            <Image src={image3} alt="team member" className="w-full h-auto" />
            <div className="py-5 px-4">
              <h3 className="text-xl font-semibold">Jhon Smith</h3>
              <p>- Volunteer</p>
              <p className="mt-2">
                Ipsum dolor sit amet, consectetur adipisicing elit. Explicabo.
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-10">
          <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center space-x-0 sm:space-y-0 space-y-4 sm:space-x-4">
            <Link
              href="/donateFood"
              className="bg-[#FFB606] px-4 py-3 text-white font-semibold text-lg rounded"
            >
              Donate Food
            </Link>
            <Link
              href="contacts"
              className="border border-[#FFB606] px-4 py-3 text-black font-semibold text-lg rounded"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </HomeLayout>
  );
};

export default page;
