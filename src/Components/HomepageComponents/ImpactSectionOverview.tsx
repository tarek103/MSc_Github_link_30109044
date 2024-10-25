import image1 from "@/app/assets/images/gallery/1.jpg";
import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
const ImpactSectionOverview = () => {
  return (
    <section className="container mx-auto px-4 mt-12 md:mt-24">
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
          <div>
            <h2 className="text-3xl font-bold">
              Our Impact On Fighting Hunger, Reducing Waste
            </h2>
            <p className="mt-3">
              Discover the difference we’re making together. Here’s how our
              platform is turning surplus food into life-saving meals while
              reducing waste and supporting the environment.
            </p>
            <ul className="mt-3 ml-3">
              <li className="flex space-x-2 mb-3">
                <Dot />
                <span>
                  Over X tons of food diverted from landfills and redirected to
                  those in need, ensuring that surplus goes where it’s needed
                  most.
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
                  contributing to a healthier, more sustainable environment for
                  future generations.
                </span>
              </li>
              <li className="flex space-x-2 mb-3">
                <Dot />
                <span>
                  Partnered with over A local charities and organizations,
                  building a strong network to redistribute food effectively and
                  efficiently.
                </span>
              </li>
              <li className="flex space-x-2 mb-3">
                <Dot />
                <span>
                  Engaged over B volunteers and donors, empowering communities
                  to come together and make a tangible impact in reducing hunger
                  and waste.
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
              src={image1}
              alt="image"
              className="w-full h-auto rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSectionOverview;
