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
    desc: "TechMarket is a growing team dedicated to bringing you the latest technology at fair prices. We focus on delivering a smooth online shopping experience and excellent customer service, helping every customer find exactly what they need.",
    reverse: true,
  },
  {
    id: 2,
    textColor: "black",
    bgColor: "white",
    source: "/images/about-2.png",
    title: "techmarket-shop.onrender.com",
    desc: "TechMarket is an online store offering a wide range of IT products — from components to complete solutions. We work with individual customers, businesses, and organizations, providing reliable products and professional service.",
  },
  {
    id: 3,
    textColor: "white",
    bgColor: "black",
    source: "/images/about-3.png",
    title: "You're In Safe Hands",
    desc: "We partner with trusted suppliers to ensure every product meets modern standards of performance and reliability. With TechMarket, you can shop confidently knowing you're getting quality you can trust.",
    reverse: true,
  },
  {
    id: 4,
    textColor: "black",
    bgColor: "white",
    source: "/images/about-4.png",
    title: "The Highest Quality of Products",
    desc: "We carefully select every product to guarantee quality and accuracy in specifications. Each item goes through thorough checks, so you receive only dependable and verified technology.",
  },
  {
    id: 5,
    textColor: "white",
    bgColor: "black",
    source: "/images/about-5.png",
    title: "Fast and Reliable Delivery",
    desc: "We provide fast and reliable delivery across the country. No matter where you are, your order will arrive on time and in perfect condition.",
    reverse: true,
  }
];

export const AboutUsPage = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  useEffect(() => {
    analyticsEvent("page_view", {
      page_path: "About Us"
    })
  }, [])

  return (
    <>
      <div className="max-w-[1200px] px-[15px] mx-auto">
        <Breadcrumbs pathnames={pathnames} />
        <h1 className="font-poppins font-semibold text-[18px]/[27px] mb-[15px] xl:text-[32px]/[48px]">About Us</h1>
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