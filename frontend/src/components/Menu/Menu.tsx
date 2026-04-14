import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { MenuIcon, X } from "lucide-react";

type MenuProps = {
  isOpen: boolean;
  closeMenu: () => void;
};

export const Menu: React.FC<MenuProps> = ({ isOpen, closeMenu }) => {
  const body = document.getElementById("body") as HTMLElement;

  if (isOpen) {
    body.classList.add("lock");
  } else {
    body.classList.remove("lock");
  }

  const linkIsActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-[#0156ff]" : "font-poppins font-normal text-[13px] leading-[34px] text-black relative block after:content-[''] after:absolute after:w-[16px] after:h-[16px] after:bg-[url('/icons/link-arrow.svg')] after:bg-center after:bg-no-repeat after:right-0 after:top-1/2 after:-translate-y-1/2";

  const links = [
    { text: "Laptops", to: "laptop" },
    { text: "Desktop PCs", to: "pc" },
    { text: "Networking Devices", to: "network_device" },
    { text: "Printers & Scanners", to: "printer_scanner" },
    { text: "PC Parts", to: "pc_part" },
    { text: "All Other Products", to: "other" },
  ];
  
  return (
    <aside
      className={classNames(
        "fixed top-0 left-0 right-0 h-[100vh] z-[999] flex flex-col justify-between bg-white transition-transform duration-[0.1s] ease-in-out",
        {
          "translate-x-[-300%]": !isOpen,
          "translate-y-0": isOpen,
        }
      )}
    >
      <nav className="h-[100vh] px-[15px]">
        <div className="py-[21px] flex justify-between border-b border-[#cacdd8]">
          <button onClick={closeMenu}>
            <MenuIcon />
          </button>

          <button onClick={closeMenu}>
            <X color="#000" size={14} />
          </button>
        </div>

        <ul className="my-[13px]">
          {links.map((link, index) => (
            <li key={index} className="mb-[16px] last:mb-0">
              <NavLink onClick={closeMenu} className={linkIsActive} to={link.to}>
                {link.text}
              </NavLink>
            </li>
          ))}
        </ul>

        <NavLink
          onClick={closeMenu}
          className="inline-block py-[8px] px-[50px] border-[2px] border-[#0156ff] rounded-[50px] font-poppins font-semibold text-[13px] leading-[20px] text-[#0156ff]"
          to="/login"
        >
          Sign In
        </NavLink>
      </nav>
    </aside>
  );
};