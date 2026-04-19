import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Signboard } from "@/types/Signboard";
import { getSignboardService } from "@/services/signboardService";

export const Slider = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [sliderImages, setSliderImages] = useState<Signboard[]>([]);

  useEffect(() => {
   getSignboardService().then((signboards) => setSliderImages(signboards))
  }, [])

  return (
    <section className="pt-[12px]">
      <div className="max-w-[1370px] px-[15px] mx-auto my-0 w-[100%]">
        <div className="relative">

          <button
            ref={prevRef}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-[rgba(37,41,49,0.5)] w-[36px] h-[48px] md:w-[27px] md:h-[36px] flex items-center justify-center z-[10] cursor-pointer rounded-r-[30px]"
          >
            <ChevronLeft color="#fff" width={"16px"} height={"16px"} />
          </button>

          <Swiper
            modules={[Navigation, Autoplay]}
            loop
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            onBeforeInit={(swiper) => {
              const nav = swiper.params.navigation;
              if (nav && typeof nav !== "boolean") {
                nav.prevEl = prevRef.current;
                nav.nextEl = nextRef.current;
              }
            }}
            onSwiper={(swiper) => {
              setTimeout(() => {
                if (
                  swiper.params.navigation &&
                  typeof swiper.params.navigation !== "boolean"
                ) {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
              });
            }}
          >
            {sliderImages.map((img) => (
              <SwiperSlide key={img.id}>
                <picture>
                  <img
                    className="w-full"
                    src={img.image}
                    alt={`Slide ${img.id}`}
                  />
                </picture>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            ref={nextRef}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-[rgba(37,41,49,0.5)] w-[36px] h-[48px] md:w-[27px] md:h-[36px] flex items-center justify-center z-[10] cursor-pointer rounded-l-[30px]"
          >
            <ChevronRight color="#fff" width={"16px"} height={"16px"} />
          </button>

        </div>
      </div>
    </section>
  );
};