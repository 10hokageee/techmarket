import { NavLink } from "react-router-dom";
import type { Product } from "@/types/Product";
import { ProductCard } from "../ProductCard/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "../ui/carousel";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ProductsListProps = {
  products: Product[];
  title: string;
  bgBanner: string;
  toProducts: string;
};

export const ProductsList: React.FC<ProductsListProps> = ({
  products,
  title,
  bgBanner,
  toProducts,
}) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const update = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };

    update();

    carouselApi.on("select", update);
    carouselApi.on("reInit", update);

    return () => {
      carouselApi.off("select", update);
      carouselApi.off("reInit", update);
    };
  }, [carouselApi]);

  return (
    <div className="flex flex-col md:flex-row">

      <div
        style={{ backgroundImage: bgBanner }}
        className="
          relative
          flex flex-col items-center justify-center
          bg-no-repeat bg-cover bg-center
          md:max-w-[227px]
          w-full
          h-[82px] md:h-[346px]
          md:mr-[15px]
          mb-[15px] md:mb-0
          self-center md:self-start
          md:justify-center
          py-[15px] md:py-0
          "
      >
        <h1 className="font-poppins font-bold text-[22px] md:text-[18px] leading-[130%] text-white">
          {title}
        </h1>

        <NavLink
          to={toProducts}
          className="
            block
            font-poppins font-normal
            text-[12px] md:text-[13px]
            leading-[115%]
            underline
            text-white
            static md:absolute
            md:bottom-[32px]
            "
        >
          See All Products
        </NavLink>
      </div>

      <Carousel
        setApi={setCarouselApi}
        className="w-full overflow-hidden relative"
        opts={{ align: "start", loop: true }}
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id} className="basis-auto">
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {canScrollPrev && (
          <button
            onClick={() => carouselApi?.scrollPrev()}
            className="
              hidden md:flex
              absolute
              top-1/2 -translate-y-1/2
              left-0
              w-[36px] h-[48px]
              bg-[#666]
              opacity-[0.2]
              items-center justify-center
              cursor-pointer
              rounded-r-[30px]
              z-[100]
              "
          >
            <ChevronLeft color="#fff" width="16px" height="16px" />
          </button>
        )}

        {canScrollNext && (
          <button
            onClick={() => carouselApi?.scrollNext()}
            className="
              hidden md:flex
              absolute
              top-1/2 -translate-y-1/2
              right-0
              w-[36px] h-[48px]
              bg-[#666]
              opacity-[0.2]
              items-center justify-center
              cursor-pointer
              rounded-l-[30px]
              z-[100]
              "
          >
            <ChevronRight color="#fff" width="16px" height="16px" />
          </button>
        )}
      </Carousel>

    </div>
  );
};