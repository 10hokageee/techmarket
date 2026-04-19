import { fromSlug } from "@/utils/slug";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type BreadcrumbsProps = {
  pathnames: string[];
  lastLabel?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ pathnames, lastLabel }) => {
  return (
    <nav className="py-[11px]">
      <ul className="flex items-center"
      >
        <li className="mr-2 relative font-poppins font-normal text-[12px]/[21px]">
          <Link className="pr-[20px]" to='/'>Home</Link>
          <ChevronRight className="absolute right-0 top-1/2 transform translate-y-[-50%]" color="#0156FF" width={'10px'} height={'10px'} />
        </li>

        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`
          const decodedValue = fromSlug(value) || value;
          const label = last && lastLabel ? lastLabel : decodedValue;

          return (
            <li key={to} className="mr-2 relative pr-[24px] font-poppins font-normal text-[12px]/[21px]">
              {!last ? (
                <>
                  <Link to={to}>{decodedValue}</Link>
                  <ChevronRight className="absolute right-0 top-1/2 transform translate-y-[-50%]" color="#0156FF" size={10} />
                </>
              ) : (
                <span className="block text-[#A2A6B0]">{label}</span>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  );
}