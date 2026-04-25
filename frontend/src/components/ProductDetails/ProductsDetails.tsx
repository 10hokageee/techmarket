import { addProduct } from "@/features/addToCart";
import { useAppDispatch } from "@/hooks/hook";
import type { Product } from "@/types/Product";
import { analyticsEvent } from "@/utils/analytics";
import classNames from "classnames";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";

type ProductsDetailsProps = {
  product: Product;
};

export const ProductsDetails: React.FC<ProductsDetailsProps> = ({ product }) => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedColor = searchParams.get('color') || product.current_color;
  const dispatch = useAppDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);
  const minSwipeDistance = 50;
  const [localQty, setLocalQty] = useState(1);
  const images = product.images;

  const increment = () => {
    setLocalQty(prev => prev + 1);
  };

  const decrement = () => {
    setLocalQty(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    dispatch(addProduct({ product, quantity: localQty }));

    analyticsEvent("add_to_cart", {
      product_name: product.name,
    });
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) {
      return;
    }

    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < images.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleColorChange = (color: string) => {
    setSearchParams({ color });
  };

  const tabs = [
    { id: 'tab1', label: 'About Product' },
    { id: 'tab2', label: 'Details' },
  ];

  const tabContent: Record<string, React.ReactNode> = {
    tab1: (
      <p className="text-[12px]/[20px] font-poppins font-light mb-[15px] xl:text-[18px]/[30px] xl:mb-[46px]">{product.description}</p>
    ),

    tab2: (
      <ul className="flex flex-col gap-[12px]">
        {Object.values(product.characteristics).filter(Boolean).map((label, i) => (
          <li key={i} className="font-poppins font-light text-[12px]/[20px] pl-[8px] relative after:content-[''] after:absolute after:w-[2px] after:h-[2px] after:left-0 after:top-[50%] after:translate-y-[-50%] after:bg-black after:rounded-full xl:text-[14px]/[24px]">
            {label}
          </li>
        ))}
      </ul>
    ),
  };

  if (!product) {
    return null;
  }

  return (
    <section>
      <div className="md:flex md:flex-row-reverse md:gap-[80px] xl:items-center md:items-center justify-between max-w-[1370px] w-full my-0 mx-auto px-[15px] py-10">
        <div className="flex flex-col items-center relative flex-1">
          <div
            className="relative w-full overflow-hidden mb-6"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((img, idx) => (
                <div key={idx} className="w-full flex-shrink-0 flex justify-center items-center">
                  <img
                    className="xl:h-[469px] object-contain select-none w-full xl:max-w-[469px] max-w-[210px] h-[210px]"
                    src={img}
                    alt={`Product view ${idx}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:flex flex gap-[11px] mb-8 absolute bottom-[-50px]">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={classNames("w-[10px] h-[10px] rounded-full cursor-pointer", {
                  "bg-[#0156FF]": currentIndex === idx,
                  "bg-[#CACDD8]": currentIndex !== idx
                })}
                aria-label={`${idx + 1}`}
              />
            ))}
          </div>

        </div>

        <div className="bg-[#F5F7FF] md:w-[424px] xl:w-[600px] flex-1 p-[20px] rounded-lg">
          <div className="flex gap-[17px] mb-[13px] md:mb-[25px]">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={classNames('font-poppins font-semibold text-[#666666] text-[12px] pb-[5px] relative xl:text-[14px] cursor-pointer', {
                  'text-black after:absolute after:bottom-0 after:w-full after:h-[2px] after:bg-[#0156FF] after:left-0': t.id === activeTab
                })}
              >
                {t.label}
              </button>
            ))}
          </div>

          <h1 className="font-poppins font-medium text-[22px]/[33px] mb-[15px] xl:text-[32px]/[48px]">{product.name}</h1>

          <div className="mb-[25px] min-h-[100px]">
            {tabContent[activeTab]}
          </div>

          <div className="flex gap-[14px] mb-[30px]">
            {product.colors.map((color) => {
              const isSelected = selectedColor === color;
              return (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className={classNames(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer",
                    isSelected ? "ring-2 ring-[#0156FF] ring-offset-2" : "hover:scale-110"
                  )}
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              );
            })}
          </div>

          <div className="flex justify-between mb-[15px]">
            {product.status ? (
              <button onClick={handleAddToCart} className="font-poppins font-semibold text-[13px] text-white bg-[#0156FF] px-10 py-[12px] rounded-[30px] hover:bg-[#0044cc] w-full md:w-auto cursor-pointer hover:bg-[#0044cc] transition-all duration-300 ease-in-out">
                Add to Cart
              </button>
            ) : (
              <p className="text-[12px]/[20px] font-poppins font-light mb-[15px] xl:text-[18px]/[30px] xl:mb-[46px]">
                Сurrently out of stock</p>
            )}
          </div>

          <div className="bg-white/50 text-center py-[11px] rounded-[15px] border border-gray-100 flex items-center justify-between px-[10px]">
            <p className="font-poppins text-[12px]">
              On Sale from <span className="font-semibold">${product.sale_price || product.original_price}</span>
            </p>

            <div className="bg-[#F5F7FF] rounded-[15px] flex w-[56px] justify-between px-[11px] py-[5px] items-center cursor-pointer xl:w-[100px]">
              <span className="text-[11px]/[210%] font-poppins font-semibold text-center block">{localQty}</span>
              <div>
                <ChevronUp onClick={increment} color="#A2A6B0" size={`16px`} className="mb-[10px]" />
                <ChevronDown onClick={decrement} color="#A2A6B0" size={`16px`} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};