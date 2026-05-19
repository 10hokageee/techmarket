import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import classNames from "classnames";
import { X } from "lucide-react";
import React from "react";

type FilterCatalogProps = {
  isOpen: boolean;
  closeFilter: () => void;
  tempFilters: Record<string, string>;
  setTempFilters: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  applyFilters: () => void;
  clearFilters: () => void;
}

export const FilterCatalog: React.FC<FilterCatalogProps> = ({
  isOpen,
  closeFilter,
  tempFilters,
  setTempFilters,
  applyFilters,
  clearFilters
}) => {
  const body = document.getElementById('body') as HTMLElement;
  if (isOpen) {
    body?.classList.add('lock');
  } else {
    body?.classList.remove('lock');
  }

  const filters = [
    {
      id: "price",
      title: "Price",
      filter: [
        { label: "$0.00 - $1,000.00" },
        { label: "$1,000.00 - $2,000.00" },
        { label: "$2,000.00 - $3,000.00" },
        { label: "$3,000.00 - $4,000.00" },
        { label: "$4,000.00 - $5,000.00" },
        { label: "$5,000.00 - $6,000.00" },
        { label: "$6,000.00 - $7,000.00" },
        { label: "$7,000.00 And Above" },
      ],
    },
    {
      id: "color",
      title: "Color",
      colors: [
        { color: "#000000", name: "BLACK" },
        { color: "#DB0000", name: "RED" },
        { color: "#0000FF", name: "BLUE" },
        { color: "#808080", name: "GRAY" },
        { color: "#008000", name: "GREEN" },
        { color: "#FFFFFF", name: "WHITE" },
      ],
      filter: [],
    },
  ];

  const handleSelectFilter = (key: string, value: string) => {
    setTempFilters(prev => {
      const copy = { ...prev };

      if (copy[key] === value) {
        delete copy[key];
      } else {
        copy[key] = value;
      }

      return copy;
    });
  };

  const handlePriceFilter = (label: string) => {
    const cleanLabel = label.replace(/[$,]/g, '');
    const parts = cleanLabel.split(' - ');

    setTempFilters(prev => {
      const copy = { ...prev };

      delete copy['price_gte'];
      delete copy['price_lte'];

      if (parts.length === 2) {

        copy['price_gte'] = parts[0].trim();
        copy['price_lte'] = parts[1].trim();

      } else if (cleanLabel.includes('Above')) {

        copy['price_gte'] = '7000';
        delete copy['price_lte'];

      }

      return copy;
    });
  };

  const isPriceActive = (label: string) => {
    const cleanLabel = label.replace(/[$,]/g, '');
    const parts = cleanLabel.split(' - ');

    if (parts.length === 2) {

      return (
        tempFilters.price_gte === parts[0].trim() &&
        tempFilters.price_lte === parts[1].trim()
      );

    }

    if (cleanLabel.includes('Above')) {
      return tempFilters.price_gte === '7000';
    }

    return false;
  };

  const handleCustomPrice = (key: 'price_gte' | 'price_lte', value: string) => {
    setTempFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className={classNames(
      "px-5 bg-white fixed left-0 top-0 w-full h-screen z-999 transform transition-transform duration-300 flex flex-col justify-between pb-10 md:static md:h-auto md:bg-[#F5F7FF] md:translate-x-0 md:px-4 md:z-0 md:max-w-58.5",
      { "translate-x-0": isOpen, "-translate-x-full md:translate-x-0": !isOpen }
    )}>
      <div>
        <h1 className="border-b border-[#CACDD8] py-[16px] flex justify-between font-poppins font-semibold text-[18px]/[27px] md:justify-center md:border-0 md:flex-col md:justify-center md:items-center md:mb-[15px] md:text-[16px]/[24px]">
          Filter by
          <button className="cursor-pointer md:hidden" onClick={closeFilter}>
            <X />
          </button>
          <button
            onClick={clearFilters}
            className="hidden md:block font-poppins font-semibold text-[14px]/[21px] text-[#A2A6B0] py-[5px] max-w-[200px] w-[100%] border-2 rounded-[50px] border-[#A2A6B0] mt-[10px] cursor-pointer"
          >
            Clear Filter
          </button>
        </h1>

        <Accordion type="multiple" className="mb-[17px] overflow-y-auto max-h-[70vh]">
          {filters.map(filter => (
            <AccordionItem key={filter.id} value={filter.id}>
              <AccordionTrigger className="font-poppins font-semibold text-[14px]/[21px] cursor-pointer">
                {filter.title}
              </AccordionTrigger>
              <AccordionContent className="text-[13px]/[28px]">
                {filter.id === 'color' ? (
                  <div className="flex gap-2 mt-2">
                    {filter.colors?.map((c, index) => (
                      <button
                        key={index}
                        onClick={() => handleSelectFilter('colors', c.name)}
                        className={classNames(
                          "cursor-pointer w-6 h-6 rounded-full border-2",
                          { "border-[#0156FF] scale-110": tempFilters['colors'] === c.name }
                        )}
                        style={{ backgroundColor: c.color }}
                      />
                    ))}
                  </div>
                ) : (
                  <ul>
                    {filter.filter.map((item, index) => (
                      <li key={index}>
                        <button
                          onClick={() =>
                            filter.id === 'price'
                              ? handlePriceFilter(item.label)
                              : handleSelectFilter(filter.id, item.label)
                          }
                          className={classNames(
                            "cursor-pointer text-left w-full hover:text-[#0156FF]",
                            {
                              "text-blue-600 font-bold":
                                filter.id === 'price'
                                  ? isPriceActive(item.label)
                                  : tempFilters[filter.id] === item.label
                            }
                          )}
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}

                    <li className="flex gap-[15px] mt-[15px]">
                      <input
                        type="number"
                        min="0"
                        step="100"
                        className="bg-white w-[80px] h-[30px] pl-[10px] rounded-[10px]"
                        placeholder="from"
                        value={tempFilters.price_gte || ''}
                        onChange={(e) => {
                          const value = e.target.value;

                          return handleCustomPrice('price_gte', String(value))
                        }
                        }
                      />

                      <input
                        type="number"
                        min="0"
                        className="bg-white w-[80px] h-[30px]  pl-[10px] rounded-[10px]"
                        placeholder="to"
                        step="100"
                        value={tempFilters.price_lte || ''}
                        onChange={(e) => {
                          const value = e.target.value;

                          return handleCustomPrice('price_lte', String(value))
                        }
                        }
                      />
                    </li>
                  </ul>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <button
        onClick={applyFilters}
        className="bg-[#0156FF] text-[#fff] text-[13px]/[20px] mx-auto w-full max-w-[200px] py-[12px] font-poppins font-semibold rounded-[50px] shadow-lg hover:bg-blue-700 transition-colors md:text-[14px]/[21px] md:py-[8px] cursor-pointer"
      >
        Apply Filters ({Object.keys(tempFilters).length})
      </button>
    </div>
  );
};