import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";

const links = [
  { link: 'About Us', to: '/About' },
  { link: 'FAQ', to: '/FAQ' },
];

export const SupportBlock = () => {
  return (
    <div className="bg-[url('/images/support-block-bg.png')] h-[300px] flex items-center w-[100%] bg-contain bg-right bg-no-repeat">
      <div className="max-w-[1370px] px-[15px] mx-auto my-0 w-[100%]">
        <ul className="flex flex-col gap-[14px] w-full pl-[26px]">
          {links.map(link => (
            <li key={link.link}>
              <Link className="relative max-w-[243px] w-[100%] py-[15px] px-[20px] font-poppins font-medium text-[#313131] text-[12px]/[18px] border-[#CACDD8] border-1 block rounded-[10px] xl:text-[16px]/[24px] xl:max-w-[347px]" to={link.to}>{link.link}
                <MoveRight size="16px" className="absolute right-[11px] top-[50%] transform translate-y-[-50%]" color="#0156FF" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}