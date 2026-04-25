import { About } from "@/components/About/About";
import { Breadcrumbs } from "@/shared/Breadcrumbs/Breadcrumbs";
import { analyticsEvent } from "@/utils/analytics";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


const aboutSections = [
  {
    id: 1,
    textColor: "white",
    bgColor: "black",
    source: "/images/about-1.png",
    title: "A Family That Keeps On Growing",
    desc: "We always aim to please the home market, supplying great computers and hardware at great prices to non-corporate customers, through our large Melbourne CBD showroom and our online store. Shop management approach fosters a strong customer service focus in our staff. We prefer to cultivate long-term client relationships rather than achieve quick sales, demonstrated in the measure of our long-term success.",
    reverse: true,
  },
  {
    id: 2,
    textColor: "black",
    bgColor: "white",
    source: "/images/about-2.png",
    title: "shop.com",
    desc: "Shop is a proudly Australian owned, Melbourne based supplier of I.T. goods and services, operating since 1991. Our client base encompasses individuals, small business, corporate and government organisations. We provide complete business IT solutions, centred on high quality hardware and exceptional customer service.",
  },
  {
    id: 3,
    textColor: "white",
    bgColor: "black",
    source: "/images/about-3.png",
    title: "You're In Safe Hands",
    desc: "Experience a 40% boost in computing from last generation. MSI Desktop equips the 10th Gen. Intel® Core™ i7 processor with the upmost computing power to bring you an unparalleled gaming experience.\n\n*Performance compared to i7-9700. Specs varies by model.",
    reverse: true,
  },
  {
    id: 4,
    textColor: "black",
    bgColor: "white",
    source: "/images/about-4.png",
    title: "The Highest Quality of Productsau",
    desc: "We guarantee the highest quality of the products we sell. Several decades of successful operation and millions of happy customers let us feel certain about that. Besides, all items we sell pass thorough quality control, so no characteristics mismatch can escape the eye of our professionals."
  },
  {
    id: 5,
    textColor: "white",
    bgColor: "black",
    source: "/images/about-5.png",
    title: "Delivery to All Regions",
    desc: "We deliver our goods all across Australia. No matter where you live, your order will be shipped in time and delivered right to your door or to any other location you have stated. The packages are handled with utmost care, so the ordered products will be handed to you safe and sound, just like you expect them to be.",
    reverse: true,
  }
];

export const AboutUsPage = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  useEffect(() => {
    analyticsEvent("page_view", {
      page: "About Us"
    })
  }, [])

  return (
    <>
      <div className="max-w-[1200px] px-[15px] mx-auto">
        <Breadcrumbs pathnames={pathnames} />
        <h1 className="font-poppins font-semibold text-[18px]/[27px] mb-[15px]">About Us</h1>
      </div>
      {aboutSections.map((section) => (
        <About
          key={section.id}
          {...section}
        />
      ))}
    </>
  );
}