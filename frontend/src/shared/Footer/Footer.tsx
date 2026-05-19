import { NavLink } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Instagram } from "lucide-react";

export const Footer = () => {
  type FooterLink = {
    label: string;
    to: string;
  };

  type FooterSection = {
    id: string;
    title: string;
    links: FooterLink[];
  };

  const footerNav: FooterSection[] = [
    {
      id: "componentsPc",
      title: "PC Parts",
      links: [
        { label: "Catalog", to: "pc_part" },
        { label: "Cart", to: "Cart" },
        { label: "Our Team", to: "Team" },
      ],
    },
    {
      id: "desktops",
      title: "Desktop PCs",
      links: [
        { label: "Catalog", to: "pc" },
        { label: "Cart", to: "Cart" },
        { label: "Our Team", to: "Team" },
      ],
    },
    {
      id: "laptops",
      title: "Laptops",
      links: [
        { label: "Catalog", to: "laptop" },
        { label: "Cart", to: "Cart" },
        { label: "Our Team", to: "Team" },
      ],
    },
  ];

  const renderLinks = (links: FooterLink[]) => (
    <ul>
      {links.map((link, index) => (
        <li key={index} className="mb-[10px] last:mb-0">
          <NavLink
            className="font-poppins font-normal text-[13px] md:text-[12px] leading-[140%] md:leading-[170%] text-white transition-opacity hover:opacity-50"
            to={link.to}
          >
            {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );

  const AddressContent = (
    <ul>
      <li className="mb-[10px] last:mb-0">
        <p className="font-poppins font-normal text-[13px] md:text-[12px] leading-[140%] md:leading-[170%] text-white transition-opacity">
          Address: 1540 Market Street, San Francisco, CA 94102
        </p>
      </li>

      <li className="mb-[10px] last:mb-0">
        <span className="font-poppins font-normal text-[13px] md:text-[12px] leading-[140%] md:leading-[170%] text-white">Phones: </span>
        <a
          href="tel:0012345678"
          className="text-[#01a4ff] transition-opacity hover:opacity-50 font-poppins font-normal text-[13px] md:text-[12px] leading-[140%] md:leading-[170%]"
        >
          (00) 1234 5678
        </a>
      </li>

      <li className="mb-[10px] last:mb-0">
        <p className="font-poppins font-normal text-[13px] md:text-[12px] leading-[140%] md:leading-[170%] text-white">
          We are open: Monday - Friday 9:00 AM - 9:00 PM
        </p>
      </li>

      <li className="mb-[10px] last:mb-0">
        <p className="font-poppins font-normal text-[13px] md:text-[12px] leading-[140%] md:leading-[170%] text-white">
          Saturday 9:00 AM - 8:00 PM
        </p>
      </li>

      <li className="mb-[10px] last:mb-0">
        <p className="font-poppins font-normal text-[13px] md:text-[12px] leading-[140%] md:leading-[170%] text-white">
          Sunday 11:00 AM - 7:00 PM
        </p>
      </li>

      <li>
        <span className="font-poppins font-normal text-[13px] md:text-[12px] leading-[140%] md:leading-[170%] text-white">E-mail: </span>
        <a
          href="mailto:shop@email.com"
          className="text-[#01a4ff] transition-opacity hover:opacity-50 font-poppins font-normal text-[13px] md:text-[12px] leading-[140%] md:leading-[170%]"
        >
          shop@email.com
        </a>
      </li>
    </ul>
  );

  const payments = [
    { source: "/icons/visa.svg", alt: "" },
    { source: "/icons/maestro.svg", alt: "" },
    { source: "/icons/discover.svg", alt: "" },
    { source: "/icons/american-express.svg", alt: "" },
  ];

  return (
    <footer className="bg-[#020203]">
      <div className="max-w-[1370px] px-[15px] mx-auto my-0 w-[100%]">
        <div className="max-w-[329px] md:max-w-[639px] lg:max-w-full mx-auto">
          <div className="pt-[47px] pb-[36px]">
            <div className="mb-[15px] text-center lg:text-left lg:mb-[45px]">
              <h1 className="font-poppins font-medium text-[18px] lg:text-[38px] leading-[132.5%] text-white mb-[5px] lg:mb-[9px]">
                TechMarket
              </h1>

              <p className="font-poppins font-light text-[12px] lg:text-[16px] leading-[132.5%] lg:leading-[21px] text-white">
                Be the first to hear about us.
              </p>
            </div>

            <nav>
              <div className="hidden lg:flex justify-between w-full">
                {footerNav.map((section) => (
                  <div key={section.id}>
                    <h2 className="font-poppins font-bold text-[14px] leading-[100%] text-white/50 mb-[30px]">
                      {section.title}
                    </h2>
                    {renderLinks(section.links)}
                  </div>
                ))}

                <div>
                  <h2 className="font-poppins font-bold text-[14px] leading-[100%] text-white/50 mb-[30px]">
                    Address
                  </h2>
                  {AddressContent}
                </div>
              </div>

              <Accordion type="single" collapsible className="lg:hidden w-full">
                {footerNav.map((section) => (
                  <AccordionItem
                    key={section.id}
                    value={section.id}
                    className="border-b border-[#a2a6b0]"
                  >
                    <AccordionTrigger className="font-poppins font-bold text-[11px] text-[#e5ecf1] py-[11px]">
                      {section.title}
                    </AccordionTrigger>

                    <AccordionContent>
                      {renderLinks(section.links)}
                    </AccordionContent>
                  </AccordionItem>
                ))}

                <AccordionItem value="address" className="border-b border-[#a2a6b0]">
                  <AccordionTrigger className="font-poppins font-bold text-[11px] text-[#e5ecf1] py-[11px]">
                    Address
                  </AccordionTrigger>

                  <AccordionContent>{AddressContent}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </nav>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-[15px] lg:gap-0 py-[15px] lg:py-[17px] lg:border-t lg:border-white/20">
            <div className="flex items-center">
              <a
                className="mr-[11px] opacity-[0.2] p-[2px] transition-opacity hover:opacity-50"
              >
                <img src="/icons/facebook-icon.svg" alt="" />
              </a>

              <a
                className="opacity-[0.2] p-[2px] transition-opacity hover:opacity-50"
              >
                <Instagram width="20px" height="20px" fill="#fff" />
              </a>
            </div>

            <ul className="flex items-center">
              {payments.map((pay) => (
                <li key={pay.source} className="mr-[10px] last:mr-0">
                  <img src={pay.source} alt={pay.alt} />
                </li>
              ))}
            </ul>

            <p className="font-poppins font-medium text-[12px] leading-[132.5%] text-white opacity-[0.6]">
              Copyright © 2020 Shop Pty. Ltd.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};