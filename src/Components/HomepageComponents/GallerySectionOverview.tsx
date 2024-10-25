import image1 from "@/app/assets/images/gallery/1.jpg";
import image2 from "@/app/assets/images/gallery/2.jpg";
import image3 from "@/app/assets/images/gallery/3.jpg";
import image4 from "@/app/assets/images/gallery/4.jpg";
import image5 from "@/app/assets/images/gallery/5.jpg";
import image6 from "@/app/assets/images/gallery/6.jpg";
import image7 from "@/app/assets/images/gallery/7.jpg";
import image8 from "@/app/assets/images/gallery/8.jpg";
import Image from "next/image";

const GallerySectionOverview = () => {
  return (
    <section className="container mx-auto px-4 mt-12 md:mt-20">
      <div className="flex justify-center mb-8">
        <div className="section-title max-w-full sm:max-w-md">
          <h2 className="text-center text-2xl sm:text-3xl font-bold">
            Our <span className="text-[#FFB606]">Gallery</span>
          </h2>
          <p className="text-center">
            Your Attention Is Changed The Part Of World.Give a helping hand to
            those who need it!
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
        <div className="photoIamge">
          <Image src={image1} alt="gallery image" className="w-full h-auto" />
        </div>
        <div className="photoIamge">
          <Image src={image2} alt="gallery image" className="w-full h-auto" />
        </div>
        <div className="photoIamge">
          <Image src={image3} alt="gallery image" className="w-full h-auto" />
        </div>
        <div className="photoIamge">
          <Image src={image4} alt="gallery image" className="w-full h-auto" />
        </div>
        <div className="photoIamge">
          <Image src={image5} alt="gallery image" className="w-full h-auto" />
        </div>
        <div className="photoIamge">
          <Image src={image6} alt="gallery image" className="w-full h-auto" />
        </div>
        <div className="photoIamge">
          <Image src={image7} alt="gallery image" className="w-full h-auto" />
        </div>
        <div className="photoIamge">
          <Image src={image8} alt="gallery image" className="w-full h-auto" />
        </div>
      </div>
    </section>
  );
};

export default GallerySectionOverview;
