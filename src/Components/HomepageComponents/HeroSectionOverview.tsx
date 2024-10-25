import cover from "@/app/assets/images/homePage/banner-img.jpg";
import Image from "next/image";
import Link from "next/link";

const HeroSectionOverview = () => {
  return (
    <section className="container mx-auto px-4 mt-5">
      <div className="py-4 rounded-lg p-4 md:p-12 min-h-[450px] w-full relative overflow-hidden grid place-items-center grid-cols-12">
        <div className="col-span-12 md:col-span-6">
          <Image
            fill
            src={cover}
            priority={true}
            alt="cover image"
            className="object-cover"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <div className="max-w-full sm:max-w-2xl">
              <h1 className="font-bold text-2xl md:text-5xl text-white text-center">
                Sharing Food, Supporting Lives.
              </h1>
              <p className="text-white my-4 text-center">
                Helping reduce food waste by bridging the gap between food
                donors and those who need it most.
              </p>
              <div className="flex justify-center items-center">
                <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center space-x-0 sm:space-y-0 space-y-4 sm:space-x-4">
                  <Link
                    href="/donateFood"
                    className="bg-[#FFB606] px-4 py-3 text-white font-semibold text-lg rounded"
                  >
                    Donate Food
                  </Link>
                  <Link
                    href="about-us"
                    className="border border-[#FFB606] px-4 py-3 text-white font-semibold text-lg rounded"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionOverview;
