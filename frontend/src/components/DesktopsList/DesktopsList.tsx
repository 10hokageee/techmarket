import type { Product } from "@/types/Product";
import { ProductsList } from "../ProductsList/ProductsList";
import { useState } from "react";
import type { Filter } from "@/types/Filter";
import { listByFilter } from "@/utils/listByFilter";

type DesktopsListProps = {
  products: Product[];
  errorMessage: string;
};

export const DesktopsList: React.FC<DesktopsListProps> = ({
  products,
  errorMessage,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<Filter>("all");

  const isActive = (field: Filter) =>
    `cursor-pointer pb-[3px] font-poppins font-semibold text-[16px] md:text-[14px] lg:text-[16px] ${
      selectedFilter === field
        ? "text-black relative after:content-[''] after:absolute after:w-full after:border-[2px] after:border-[#0156ff] after:bottom-0 after:left-0 after:rounded-[10px]"
        : "text-[#838383]"
    }`;

  const filteredList = listByFilter(products, selectedFilter);

  const btns: { button: string; field: Filter }[] = [
    { button: "All products", field: "all" },
    { button: "In stock", field: "inStock" },
    { button: "On Sale", field: "sale" },
    { button: "Top Rated", field: "rated" },
    { button: "Premium Picks", field: "premium" },
  ];

  const message =
    errorMessage ||
    (!errorMessage && products.length === 0
      ? "There are no products"
      : null);

  return (
    <section className="pb-[31px]">
      <div className="max-w-[1370px] px-[15px] mx-auto my-0 w-[100%]">
        {products.length > 0 && (
          <>
            <ul className="flex items-center mb-[20px] flex-wrap gap-[9px] md:gap-0">
              {btns.map((btn, index) => (
                <li
                  key={index}
                  className="font-poppins font-semibold text-[#838383] md:mr-[16px] lg:mr-[25px] last:mr-0"
                >
                  <button
                    onClick={() => setSelectedFilter(btn.field)}
                    className={isActive(btn.field)}
                  >
                    {btn.button}
                  </button>
                </li>
              ))}
            </ul>

            {filteredList.length > 0 ? (
              <ProductsList
                products={filteredList}
                title="Desktops"
                bgBanner="url(images/msi-desktops-bg.png)"
                toProducts="pc"
              />
            ) : (
              <p className="font-poppins font-normal text-[18px] text-black">
                No products found for this filter
              </p>
            )}
          </>
        )}

        {message && (
          <div>
            <h1 className="font-poppins font-semibold text-[22px] text-black mb-[25px]">
              Desktops
            </h1>
            <p className="font-poppins font-normal text-[18px] text-black">
              {message}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};