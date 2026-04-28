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
import { ChevronLeft, X } from "lucide-react";
import { useAppSelector } from "@/hooks/hook";
import { analyticsEvent } from "@/utils/analytics";

const CATEGORIES = [
  'Laptops',
  'Desktop PC`s',
  'Networking devices',
  'Printers & Scanners',
  'Other products',
  'PC parts'
];

const PAGE = '1';
const PER_PAGE = '8';

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
  const page = +(searchParams.get('page') || PAGE);
  const perPageParam = searchParams.get('perPage') || PER_PAGE;
  const perPage = +perPageParam;
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const wishProducts = useAppSelector(state => state.cart.products);
  const [tempFilters, setTempFilters] = useState<Record<string, string>>({});

  useEffect(() => {
    const currentFilters: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      if (key !== 'page' && key !== 'perPage') {
        currentFilters[key] = value;
      }
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTempFilters(currentFilters);
  }, [searchParams]);

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

              analyticsEvent("view_item", {
                products: productsFromServer,
              })
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

  if (decodedCategory && !CATEGORIES.includes(decodedCategory)) {
    return <PageNotFound />;
  }

  const toggleFilter = () => {
    setIsOpen(prev => !prev);
  }

  const closeFilter = () => {
    setIsOpen(false);
  }

  const applyFilters = () => {
    const newParams = new URLSearchParams();
    const perPage = searchParams.get('perPage');

    if (perPage) {
      newParams.set('perPage', perPage);
    }

    newParams.set('page', '1');

    Object.entries(tempFilters).forEach(([key, value]) => {
      newParams.set(key, value);
    });

    setSearchParams(newParams);
    closeFilter();
  };

  const clearFilters = () => {
    setTempFilters({});
    const newParams = new URLSearchParams();
    const perPage = searchParams.get('perPage');

    if (perPage) {
      newParams.set('perPage', perPage);
    }

    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const removeFilter = (key: string) => {
    setTempFilters(prev => {
      const copy = { ...prev };
      if (key === 'price') {
        delete copy['price_gte'];
        delete copy['price_lte'];
      } else {
        delete copy[key];
      }
      return copy;
    });
  };

  return (
    <section className="pb-10">
      <div className="max-w-[1370px] px-3 mx-auto w-full">

        {loading && <Loader />}

        {!loading && (
          <div>
            <img className="xl:block md:hidden" src="/images/shop-now-catalog.png" alt="" />
            <Breadcrumbs pathnames={pathnames} />
            <h1 className="font-semibold font-poppins text-[18px]/[27px] mb-[13px] xl:text-[32px]/[48px] xl:font-bold xl:mb-[19px]">
              {decodedCategory}
            </h1>

            <div className="flex md:justify-between flex-col md:flex-row">
              <div className="flex items-center mb-[10px]">

                <button onClick={toggleFilter} className="mr-[20px] border-[2px] py-[11px] px-10 text-[11px]/[16px] font-poppins font-semibold border-[#CACDD8] md:hidden">
                  Filter
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

              <button onClick={() => navigate(-1)} className="font-poppins font-semibold text-[14px]/[21px] px-[18px] relative mr-[20px] py-[10px] max-w-[120px] w-full transition-opacity duration-300 hover:opacity-50 cursor-pointer">
                Back
                <ChevronLeft className="absolute left-0 top-[50%] transform translate-y-[-50%] w-[15px] h-[15px]" />
              </button>
            </div>

            {errorMessage ? (
              <div className="font-poppins font-light text-center py-10">
                <p className="text-red-400 mb-4 font-poppins font-light">{errorMessage}</p>
                <button onClick={reloadPage} className="underline font-poppins font-light">Try again</button>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-[#A2A6B0]">There are no products matching your filters.</p>
              </div>
            ) : (

              <div className="flex md:pb-8 gap-[10px]">
                <aside className="md:block md:min-w-[234px] md:mr-1.75">
                  <FilterCatalog
                    closeFilter={closeFilter}
                    isOpen={isOpen}
                    tempFilters={tempFilters}
                    setTempFilters={setTempFilters}
                    applyFilters={applyFilters}
                    clearFilters={clearFilters}
                  />
                  <a className="hidden md:block xl:block" href="#">
                    <img className="md:w-1/1 md:mt-[5px]" src="/images/catalog-banner.png" alt="" />
                  </a>
                </aside>
                <div className="flex flex-col w-full">

                  {tempFilters && (
                    <ul className="flex items-center gap-2 mb-[20px] flex-wrap">
                      {(() => {
                        const items = [];

                        const { price_gte, price_lte, ...rest } = tempFilters;

                        if (price_gte || price_lte) {
                          let label = '';

                          if (price_gte && price_lte) {
                            label = `${price_gte} - ${price_lte}`;
                          } else if (price_gte) {
                            label = `From ${price_gte}`;
                          } else if (price_lte) {
                            label = `Up to ${price_lte}`;
                          }

                          if (label) {
                            items.push(
                              <li key="price" className="font-poppins font-semibold text-[13px]/[20px] pl-[17px] pr-[32px] border-[1px] rounded-[5px] relative py-[5px]">
                                {label.toUpperCase()}
                                <button
                                  onClick={() => removeFilter('price')}
                                  className="bg-[#C94D3F] w-[20px] h-[20px] rounded-[50%] flex items-center justify-center absolute right-[6px] z-10 top-[50%] transform translate-y-[-50%] cursor-pointer"
                                >
                                  <X color="white" className="w-[12px] h-[12px]" />
                                </button>
                              </li>
                            );
                          }
                        }

                        Object.entries(rest).forEach(([key, value]) => {
                          if (!value) return;

                          items.push(
                            <li key={key} className="font-poppins font-semibold text-[13px]/[20px] pl-[17px] pr-[32px] border-[1px] rounded-[5px] relative py-[5px]">
                              {value.toUpperCase()}
                              <button
                                onClick={() => removeFilter(key)}
                                className="bg-[#C94D3F] w-[20px] h-[20px] rounded-[50%] flex items-center justify-center absolute right-[6px] z-10 top-[50%] transform translate-y-[-50%] cursor-pointer"
                              >
                                <X color="white" className="w-[12px] h-[12px]" />
                              </button>
                            </li>
                          );
                        });

                        return items;
                      })()}
                    </ul>
                  )}


                  <ul className="flex gap-4 flex-wrap justify-center mb-[23px]">
                    {products.map((product) => {
                      return (
                        <li key={product.id}>
                          <ProductCard product={product} />
                        </li>
                      );
                    })}
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
              {wishProducts.length > 0 ? (
                <ul className="flex gap-[15px] flex-wrap justify-center">
                  {wishProducts.map(p => (
                    <li key={p.id}>
                      <ProductCard product={p} />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-black font-normal text-[13px]/[130%]">You have no items in your wish list.</p>
              )}
            </div>

            <div className="pt-[30px]">
              <div className={classNames("relative transition-all duration-500 ease-in-out overflow-hidden", { "max-h-[1000px]": isExpanded, "max-h-48": !isExpanded })}>
                <p className="text-[#8C8C8C] text-[12px] leading-relaxed">
                  TechMarket has unveiled its updated catalog of high-performance laptops and hardware for professionals and enthusiasts. Focused on modern user needs, TechMarket offers devices featuring advanced display calibration technologies, allowing users to instantly adjust screen profiles to suit any task. Our selection includes models supporting six intelligent modes: from precise sRGB color accuracy for designers to optimized contrast for the latest cinematic releases.

                  Given the inclusion of discrete graphics and flexible display settings, equipment from TechMarket is perfectly suited for complex 3D rendering as well as standard office duties. Students and remote employees will benefit from specialized eye-care modes, such as "blue light filter" and "office comfort," both designed to minimize eye strain during long sessions. For downtime after a productive day, the dedicated "gamer mode" enhances brightness and detail clarity. TechMarket combines cutting-edge technology with user-centric design, making professional-grade equipment accessible to everyone.
                </p>
                {!isExpanded && <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />}
              </div>
              <div className="flex justify-center mt-4">
                <button onClick={() => setIsExpanded(!isExpanded)} className="px-8 py-2 border-2 border-[#A2A6B0] rounded-full text-[#A2A6B0] text-[11px] font-semibold cursor-pointer">
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