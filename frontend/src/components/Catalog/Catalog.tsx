import { Breadcrumbs } from "@/shared/Breadcrumbs/Breadcrumbs";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Product } from "@/types/Product";
import { ProductCard } from "../ProductCard/ProductCard";
import { Pagination } from "../Pagination/Pagination";
import { CustomSelect } from "../CustomeSelect/CustomeSelect";
import { Loader } from "../Loader/Loader";
import { PageNotFound } from "@/modules/PageNotFound/PageNotFound";
import { fromSlug } from "@/utils/slug";
import { getItemsPage } from "@/services/getPage";
import { FilterCatalog } from "../FilterCatalog/FilterCatalog";
import classNames from "classnames";
import { ChevronLeft } from "lucide-react";

export const Catalog = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  const { category } = useParams();
  const decodedCategory = category ? fromSlug(category) : '';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [reload, setReload] = useState(new Date());
  const [searchParams, setSearchParams] = useSearchParams();
  const page = +(searchParams.get('page') || '1');
  const perPageParam = searchParams.get('perPage') || '4';
  const perPage = +perPageParam;
  const validCategories = ['Laptops', 'Desktop PCs', 'Networking Devices', 'Printers & Scanners', 'All Other Product'];
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);

    const filters: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      if (key !== 'page' && key !== 'perPage') {
        filters[key] = value;
      }
    });

    const timer = setTimeout(() => {
      if (category) {
        getItemsPage(category, page, perPage, filters)
          .then((productsFromServer) => {
            if (productsFromServer.length === 0 && page > 1) {
              const params = new URLSearchParams(searchParams);
              params.set('page', String(page - 1));
              setSearchParams(params);
            } else {
              setProducts(productsFromServer);
              setErrorMessage('');
            }
          })
          .catch(() => setErrorMessage('Something went wrong'))
          .finally(() => setLoading(false));
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [category, reload, page, perPage, searchParams]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    if (newPage !== 1) {
      params.set('page', String(newPage));
    } else {
      params.delete('page');
    }
    setSearchParams(params);
  };

  const handlePerPage = (newValue: string) => {
    const params = new URLSearchParams(searchParams);
    if (newValue === 'all') {
      params.delete('perPage');
    } else {
      params.set('perPage', newValue);
    }
    params.delete('page');
    setSearchParams(params);
  };

  const reloadPage = () => {
    setReload(new Date());
  };

  if (decodedCategory && !validCategories.includes(decodedCategory)) {
    return <PageNotFound />;
  }

  const toggleFilter = () => {
    setIsOpen(prev => !prev);
  }

  const closeFilter = () => {
    setIsOpen(false);
  }

  const backButton = () => {
    navigate(-1)
  }

  return (
    <section className="pb-10">
      <div className="max-w-[1370px] px-3 mx-auto w-full">

        {loading && <Loader />}

        {!loading && (
          <div>
            <img className="xl:block md:hidden" src="/images/shop-now-catalog.png" alt="" />
            <Breadcrumbs pathnames={pathnames} />
            <h1 className="font-semibold font-poppins text-[18px]/[27px] mb-[13px] xl:text-[32px]/[48px] xl:font-bold xl:mb-[19px]">
              {decodedCategory} ({products.length})
            </h1>

            <div className="flex md:justify-between flex-col md:flex-row">
              <div className="flex items-center mb-[10px]">
                <button onClick={toggleFilter} className="mr-[20px] border-[2px] py-[11px] px-10 text-[11px]/[16px] font-poppins font-semibold border-[#CACDD8] md:hidden">
                  Filter
                </button>

                <button onClick={backButton} className="font-poppins font-semibold text-[14px]/[21px] px-[18px] relative mr-[20px] cursor-pointer py-[10px]">
                  Back
                  <ChevronLeft className="absolute left-0 top-[50%] transform translate-y-[-50%] w-[15px] h-[15px]" />
                </button>

                <CustomSelect
                  value={perPageParam}
                  onChange={handlePerPage}
                  options={[
                    { label: '4', value: '4' },
                    { label: '8', value: '8' },
                    { label: '16', value: '16' },
                  ]}
                />
              </div>

              <span className="block mb-3.75 text-[#A2A6B0] text-[12px]/[210%] font-poppins font-normal">
                Items {products.length}
              </span>
            </div>

            {errorMessage ? (
              <div className="text-center py-10">
                <p className="text-red-400 mb-4">{errorMessage}</p>
                <button onClick={reloadPage} className="underline">Try again</button>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-[#A2A6B0]">There are no products matching your filters.</p>
              </div>
            ) : (

              <div className="flex justify-between md:pb-8">
                <aside className="hidden md:block md:min-w-[234px] md:mr-1.75">
                  <FilterCatalog closeFilter={closeFilter} isOpen={isOpen} />
                  <a href="">
                    <img className="md:w-1/1 md:mt-[5px]" src="/images/catalog-banner.png" alt="" />
                  </a>
                </aside>
                <div className="flex flex-col">
                  <ul className="flex gap-4 flex-wrap justify-center mb-[23px] md:justify-between">
                    {products.map((product) => (
                      <li key={product.id}>
                        <ProductCard product={product} />
                      </li>
                    ))}
                  </ul>
                  <Pagination
                    currentPage={page}
                    perPage={perPage}
                    itemsLength={products.length}
                    onPageChange={handlePageChange}
                  />
                </div>
              </div>
            )}

            <div className="py-[20px] bg-[#F5F7FF] flex items-center justify-center flex-col">
              <span className="block mb-[30px] font-poppins font-bold text-black text-[16px]/[24px]">My Wish List</span>
              <p className="text-black font-normal text-[13px]/[130%]">You have no items in your wish list.</p>
            </div>

            <div className="pt-[30px]">
              <div className={classNames("relative transition-all duration-500 ease-in-out overflow-hidden", { "max-h-[1000px]": isExpanded, "max-h-48": !isExpanded })}>
                <p className="text-[#8C8C8C] text-[12px] leading-relaxed">
                  MSI has unveiled the Prestige Series line of business-class and gaming notebooks. Tuned for color accuracy, the Prestige Series also leverages True Color Technology, which allows users to adjust the display profile to best fit their computing needs.

                  There are six different screen profiles, which are tuned for gaming, reducing eye fatigue, sRGB color accuracy, increasing clarity for words and lines, reducing harmful blue light, and optimizing contrast for watching movies.
                  Given the various display profiles and discrete graphics chip, the Prestige Series notebooks can be used for various design work as well as for office tasks given that the screen can be adjusted for better clarity, color accuracy, or for eye strain reduction. Users working with video or 3D rendering will appreciate the "movie mode" for which contrast is increased.

                  Home users or students can benefit from the "anti-blue" and the "office mode" options, both of which are designed to reduce eye strain. This is helpful when working on the computer for extended periods of time. Additionally, in their down time, students can also use the "gamer mode" to increase the screen brightness.
                </p>
                {!isExpanded && <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />}
              </div>
              <div className="flex justify-center mt-4">
                <button onClick={() => setIsExpanded(!isExpanded)} className="px-8 py-2 border-2 border-[#A2A6B0] rounded-full text-[#A2A6B0] text-[11px] font-semibold">
                  {isExpanded ? 'Less' : 'More'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};