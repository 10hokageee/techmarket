import { useState } from "react";
import type { Product } from "../../types/Product";
import { ProductCard } from "../ProductCard/ProductCard";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

type NewProductsProps = {
  products: Product[];
  errorMessage: string;
};

export const NewProducts: React.FC<NewProductsProps> = ({ products, errorMessage }) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  return (
    <section className="py-[19px] md:pt-[37px] md:pb-[18px]">
      <div className="max-w-[1370px] px-[15px] mx-auto my-0 w-[100%]">
        <h1 className="font-poppins font-semibold text-[22px] leading-[33px] text-black mb-[13px]">
          New Products
        </h1>

        {products.length > 0 && (
          <Carousel setApi={setCarouselApi} opts={{ align: "start", loop: true }}>
            <CarouselContent>
              {products.map((product) => (
                <CarouselItem key={product.id} className="basis-auto">
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>

            <button
              className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-0 bg-[#666666] opacity-[0.2] w-[36px] h-[48px] z-[100] items-center justify-center cursor-pointer rounded-r-[30px] transition-opacity duration-300 hover:opacity-50 cursor-pointer"
              onClick={() => carouselApi?.scrollPrev()}
            >
              <ChevronLeft color="#fff" width={"16px"} height={"16px"} />
            </button>

            <button
              className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-0 bg-[#666666] opacity-[0.2] w-[36px] h-[48px] z-[100] items-center justify-center cursor-pointer rounded-l-[30px] transition-opacity duration-300 hover:opacity-50 cursor-pointer"
              onClick={() => carouselApi?.scrollNext()}
            >
              <ChevronRight color="#fff" width={"16px"} height={"16px"} />
            </button>
          </Carousel>
        )}

        {!errorMessage && products.length === 0 && (
          <p className="font-poppins font-normal text-[18px] leading-[120.5%] text-black">
            There are no products
          </p>
        )}

        {errorMessage && (
          <p className="font-poppins font-normal text-[18px] leading-[120.5%] text-black">
            {errorMessage}
          </p>
        )}
      </div>
    </section>
  );
};