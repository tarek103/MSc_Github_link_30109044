import { ContainerIcon, MonitorCog, UserPlus, Wheat } from "lucide-react";

const FeatureSectionOverview = () => {
  return (
    <section className="mt-12 md:mt-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-8">
          <div className="section-title max-w-full sm:max-w-md">
            <h2 className="text-center text-2xl sm:text-3xl font-bold">
              Key <span className="text-[#FFB606]">features</span> &{" "}
              <span className="text-[#FFB606]">benefits</span>
            </h2>
            <p className="text-center">
              Your Attention Is Changed The Part Of World.Give a helping hand to
              those who need it!
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="border border-[#FFB606] p-3 flex flex-col items-center rounded">
            <div className="bg-[#FFB606] p-4 rounded inline-block mb-3">
              <Wheat className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-center font-semibold text-2xl mb-2">
              Food Redistribution
            </h3>
            <p className="text-center">
              Seamlessly connect surplus food from individuals, restaurants, and
              organizations to local charities and people in need.
            </p>
          </div>
          <div className="border border-[#FFB606] p-3 flex flex-col items-center rounded">
            <div className="bg-[#FFB606] p-4 rounded inline-block mb-3">
              <MonitorCog className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-center font-semibold text-2xl mb-2">
              Matching System
            </h3>
            <p className="text-center">
              Utilize a real-time platform that quickly matches available food
              donations with nearby recipients, making the process fast and
              efficient.
            </p>
          </div>
          <div className="border border-[#FFB606] p-3 flex flex-col items-center rounded">
            <div className="bg-[#FFB606] p-4 rounded inline-block mb-3">
              <UserPlus className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-center font-semibold text-2xl mb-2">
              Community Support
            </h3>
            <p className="text-center">
              Reduce hunger in local communities by providing easy access to
              fresh and nutritious food, supporting those who need it most.
            </p>
          </div>
          <div className="border border-[#FFB606] p-3 flex flex-col items-center rounded">
            <div className="bg-[#FFB606] p-4 rounded inline-block mb-3">
              <ContainerIcon className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-center font-semibold text-2xl mb-2">
              Environment Sustain
            </h3>
            <p className="text-center">
              Help reduce food waste and its environmental impact by ensuring
              that excess food is used rather than discarded.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSectionOverview;
