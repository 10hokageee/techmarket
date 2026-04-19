import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Menu } from '@/components/Menu/Menu';
import { CircleUserRound, Instagram, MenuIcon, Search, Star, X } from 'lucide-react';
import { useAppSelector } from '@/hooks/hook';
import { getProducts } from '@/services/getProdcutsService';
import type { Product } from '@/types/Product';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(true);
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const cartProducts = useAppSelector((state) => state.cart.products);
  const totalCount = cartProducts.reduce((sum, p) => sum + p.quanity, 0);

  useEffect(() => {
    getProducts().then(productsFormServer => setProducts(productsFormServer))
  }, []);

  useEffect(() => {

    const handleClick = (event: MouseEvent) => {
      if (!searchRef.current) {
        return;
      }

      if (!searchRef.current.contains(event.target as Node)) {
        setQuery('');
      }
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  const searchedProducts = useMemo(() => {
    return products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
  }, [query, products]);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const toggleSearch = () => {
    setOpenSearch(prev => !prev);
  }

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActiveLink = ({ isActive }: { isActive: boolean }) => {
    return classNames("text-[14px] leading-[21px] text-black flex items-center font-poppins font-semibold transition-opacity duration-300 hover:opacity-50", {
      "bg-[#0156ff] rounded-[100px] text-white px-4 py-1": isActive,
    });
  }

  const days = [
    { day: 'Mon-Thu:', time: '9:00 AM - 5:30 PM' },
    { day: 'Fr:', time: '9:00 AM - 6:00 PM' },
    { day: 'Sat:', time: '11:00 AM - 5:00 PM' },
    { day: 'Sun:', time: '11:00 AM - 7:00 PM' },
  ];

  const links = [
    { text: "Laptops", to: "laptop" },
    { text: "Desktop PCs", to: "pc" },
    { text: "Networking Devices", to: "network_device" },
    { text: "Printers & Scanners", to: "printer_scanner" },
    { text: "PC Parts", to: "pc_part" },
    { text: "All Other Products", to: "other" },
  ];

  const closeSearch = () => {
    setQuery('');
  }

  return (
    <header className="w-full relative border-b border-[#cacdd8] md:border-b-transparent">
      <Menu isOpen={isOpen} closeMenu={closeMenu} />
      <div className="bg-[#020202]">
        <div className="max-w-[1370px] mx-auto px-[15px] md:px-5">
          <div className="flex justify-between items-center h-10 xl:h-[44px]">
            <div className="relative cursor-pointer group ml-[84px] md:ml-20 xl:ml-0">
              <div className="relative pr-5 font-poppins font-semibold text-[11px] md:text-xs leading-4.5 text-white after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-4 after:h-4 after:bg-[url('/icons/dropdown-arrow.svg')]">
                <span className="text-[#a2a6b0]">Mon - Fr:</span> 9:00 AM - 5:30 PM
              </div>
              <div className="absolute top-[30px] left-0 z-[100] w-[262px] bg-white border border-[#cacdd8] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 after:content-[''] after:absolute after:-top-2 after:left-[19px] after:w-3.5 after:h-3.5 after:bg-white after:border-l after:border-t after:border-[#cacdd8] after:rotate-45 after:-z-10">
                <div className="relative border-b border-[#cacdd8] py-2.5 pr-6 pl-[50px] after:content-[''] after:absolute after:left-[13px] after:top-2.5 after:w-[25px] after:h-[25px] after:bg-[url('/icons/time-icon.svg')] after:bg-contain after:bg-no-repeat">
                  <span className="font-poppins font-normal text-xs leading-[140%] text-black">
                    We are open:
                  </span>
                  <ul>
                    {days.map((day, index) => (
                      <li key={index} className="text-black font-poppins font-semibold text-[13px] leading-5">
                        <span className="text-[#a2a6b0]">{day.day}</span> {day.time}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative border-b border-[#cacdd8] py-2.5 pr-6 pl-[50px] after:content-[''] after:absolute after:left-[13px] after:top-2.5 after:w-[25px] after:h-[25px] after:bg-[url('/icons/address-icon.svg')] after:bg-contain after:bg-no-repeat">
                  <address className="not-italic font-poppins font-normal text-[13px] leading-[140%] text-black">
                    Address: 1540 Market Street, San Francisco, CA 94102
                  </address>
                </div>
                <div className="py-[11px] pb-[17px] pl-[21px]">
                  <span className="block font-poppins font-normal text-[13px] leading-[140%] text-black">
                    Phones: <a className="text-[#0156ff]" href="tel:0012345678">(00) 1234 5678</a>
                  </span>
                  <span className="block font-poppins font-normal text-[13px] leading-[140%] text-black">
                    E-mail: <a className="text-[#0156ff]" href="mailto:shop@email.com">shop@email.com</a>
                  </span>
                </div>
              </div>
            </div>

            <address className="hidden md:hidden xl:block not-italic font-poppins font-semibold text-xs leading-[18px] text-[#acacac]">Address: 1540 Market Street, San Francisco, CA 94102</address>
            <div className="hidden md:hidden xl:flex items-center">
              <a className="font-poppins font-semibold text-xs leading-[18px] text-white mr-3.5 transition-opacity duration-300 hover:opacity-50" href="tel:0012345678">Call Us: (00) 1234 5678</a>
              <a className="mr-2 p-[2px] transition-opacity duration-300 hover:opacity-50">
                <img src="/icons/facebook-icon.svg" alt="Social link to facebook" />
              </a>
              <a className="p-[2px] transition-opacity duration-300 hover:opacity-50">
                <Instagram width={'20px'} height={'20px'} fill='#fff' />
              </a>
            </div>
            <a href="tel:0012345678" className="block xl:hidden font-poppins font-semibold text-[11px] leading-4 text-white relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:border after:border-white">Contact Us</a>
          </div>
        </div>
      </div>
      <div className="bg-[#0156ff] xl:bg-transparent">
        <div className="max-w-[1370px] mx-auto px-[15px] md:px-5">
          <nav className="flex items-center py-[13px] xl:py-[11px] xl:pb-3">

            <div className="flex xl:hidden items-center justify-between w-full">
              <NavLink to="/" className="block absolute top-[11px] bg-[#0156ff] rounded-[30px] px-2.25 pt-[3px] pb-1.5">
                <img src="/icons/mobile-logo.svg" alt="Logotype" />
              </NavLink>
              <div className="mr-[11px] md:mr-[53px]">
                <button onClick={toggleMenu} className="flex items-center justify-center">
                  <MenuIcon color='#fff' width={'26px'} height={'20px'} />
                </button>
              </div>

              <div ref={searchRef} className="flex w-[100%] mr-[15px] md:mr-[30px] relative rounded-[20px]">
                <label className="w-full bg-white rounded-[25px] py-[11px] relative after:content-[''] after:absolute after:left-[15px] after:top-1/2 after:-translate-y-1/2 after:w-3.5 after:h-3.5 after:bg-[url('/icons/search-icon-mobile.svg')] after:bg-center after:bg-no-repeat" htmlFor="search">
                  <input value={query} onChange={event => setQuery(event.target.value)} className="pl-[38px] pr-[15px] font-poppins font-normal text-[11px] leading-4 text-[#cacdd8] flex bg-transparent outline-none" name="search" id="search" type='text' placeholder='Search here' />
                </label>

                {query && (
                  <ul className="flex flex-col absolute z-30 bg-[#F5F7FF] top-9 gap-5 md:p-[15px] shadow-lg w-[100%] p-[5px]">
                    {searchedProducts.length > 0 ? (
                      searchedProducts.map(p => (
                        <NavLink key={p.id} to={`/${p.category}/${p.id}`} onClick={closeSearch}>
                          <li className="flex justify-between hover:bg-white md:p-[10px] p-[5px] transition duration-300 ease-in-out">
                            <span className="hidden md:block text-[13px]/[20px] font-poppins font-normal">{p.status ? "In stock" : "Check availability"}</span>
                            <p className="text-[13px]/[20px] font-poppins font-normal md:max-w-[260px] w-[100%] md:text-left text-center">{p.name}</p>
                            <span className='hidden md:block text-[11px]/[20px] font-poppins font-semibold max-w-[80px] w-[100%] text-left'>${p.sale_price || p.original_price}</span>
                            <span className='hidden md:block relative pr-5 text-[13px]/[20px] font-poppins font-normal'>
                              {p.rating_avg}
                              <Star size={'16px'} className='absolute top-[1px] right-0' />
                            </span>
                          </li>
                        </NavLink>
                      ))
                    ) : (
                      <li className="text-center text-[13px] font-poppins p-[10px] text-gray-500">
                        Product not found
                      </li>
                    )}

                  </ul>
                )}
              </div>

              <div className="flex items-center">
                <NavLink to='/Cart' className="relative block mr-[18px] md:mr-[30px]">
                  <img src="/icons/cart-icon-mobile.svg" alt="Cart" />
                  {totalCount > 0 && (
                    <span className="flex absolute w-[18px] h-[18px] bg-white text-[#0156ff] items-center justify-center rounded-full font-poppins font-bold text-[10px] leading-[15px] -top-[15px] left-[11px]">{totalCount}</span>
                  )}
                </NavLink>
                <NavLink to="/Login">
                  <img src="/icons/profile-icon-mobile.svg" alt="Profile picture" />
                </NavLink>
              </div>
            </div>

            <NavLink to="/" className="hidden xl:block px-6.5 py-3.5 mr-[30px] transition-opacity duration-300 hover:opacity-50">
              <img src="/icons/header-logo.svg" alt="Logotype" />
            </NavLink>

            {openSearch !== true && (
              <div ref={searchRef} className="hidden xl:flex w-full mr-[30px] relative">
                <label className="w-full bg-[#f5f7ff] rounded-[31px] py-[18px] mr-[25px] relative after:content-[''] after:absolute after:right-[26px] after:top-1/2 after:-translate-y-1/2 after:w-4 after:h-4 after:bg-[url('/icons/search-icon-mobile.svg')] after:bg-center after:bg-no-repeat" htmlFor="searchDesk">
                  <input value={query} onChange={event => setQuery(event.target.value)} className="px-[15px] w-full text-sm leading-[21px] text-[#a2a6b0] font-poppins font-normal bg-transparent outline-none" name="searchDesk" id="searchDesk" type='text' placeholder='Search here' />
                </label>
                <button className="cursor-pointer" type='button' onClick={() => setOpenSearch(true)}>
                  <X color='#0156ff' width={'18px'} height={'18px'} />
                </button>

                {query && (
                  <ul className="flex flex-col absolute z-30 bg-[#F5F7FF] top-[60px] gap-5 md:p-[15px] shadow-lg w-[96%] p-[5px]">
                    {searchedProducts.length > 0 ? (
                      searchedProducts.map(p => (
                        <NavLink key={p.id} to={`/${p.category}/${p.id}`} onClick={closeSearch}>
                          <li className="flex justify-between hover:bg-white md:p-[10px] p-[5px] transition duration-300 ease-in-out">
                            <span className="hidden md:block text-[13px]/[20px] font-poppins font-normal">{p.status ? "In stock" : "Check availability"}</span>
                            <p className="text-[13px]/[20px] font-poppins font-normal md:max-w-[260px] w-[100%] md:text-left text-center">{p.name}</p>
                            <span className='hidden md:block text-[11px]/[20px] font-poppins font-semibold max-w-[80px] w-[100%] text-left'>${p.sale_price || p.original_price}</span>
                            <span className='hidden md:block relative pr-5 text-[13px]/[20px] font-poppins font-normal'>
                              {p.rating_avg}
                              <Star size={'16px'} className='absolute top-[1px] right-0' />
                            </span>
                          </li>
                        </NavLink>
                      ))
                    ) : (
                      <li className="text-center text-[13px] font-poppins p-[10px] text-gray-500">
                        Product not found
                      </li>
                    )}

                  </ul>
                )}
              </div>
            )}

            {openSearch && (
              <ul className="hidden xl:flex items-center mr-auto">
                {links.map((link, index) => (
                  <li key={index} className="mr-6 last:mr-0">
                    <NavLink className={isActiveLink} to={link.to}>{link.text}</NavLink></li>
                ))}
              </ul>
            )}

            <div className="hidden xl:flex items-center">
              {openSearch && (
                <button onClick={toggleSearch} className="mr-6 p-[3px] cursor-pointer">
                  <Search width={'18px'} height={'18px'} color='#000' />
                </button>
              )}
              <NavLink to="Cart" className="mr-7 relative cursor-pointer">
                <img src="/icons/cart-icon.svg" alt="Cart" />

                {totalCount > 0 && (
                  <span className="flex items-center justify-center absolute w-4 h-4 text-white rounded-full bg-[#0156ff] text-[10px] leading-[15px] font-poppins font-bold -top-2 -right-2.75">{totalCount}</span>
                )}

              </NavLink>
              <NavLink to="/Login" className="cursor-pointer">
                <CircleUserRound color='black' className='w-[20px] h-[20px]' />
              </NavLink>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
