import classNames from 'classnames';
import styles from './Slider.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useRef } from 'react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { getSignboardService } from '../../services/signboardService';
// import type { Signboard } from '../../types/Signboard';
// import { getSignboardService } from '../../services/signboardService';

export const Slider = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  // const [slides, setSlides] = useState<Signboard[]>([]);


  useEffect(() => {
    getSignboardService().then(data => console.log(data));
  }, [])

  const sliderImages = [
    {
      desktop: 'images/slide-1.png',
    },
    {
      desktop: 'images/slide-2.png',
    },
    {
      desktop: 'images/slide-3.png',
    },
  ];

  return (
    <section className={styles.slider}>
      <div className={styles.container}>
        <div className={styles.slider__inner}>

          <div className={styles.slider__navigation}>
            <button
              ref={prevRef}
              className={classNames(
                styles.slider__btn,
                styles.slider__btnPrev
              )}
            >
              <img src="icons/slider-arrow.svg" alt="Prev arrow" />
            </button>
          </div>

          <Swiper
            modules={[Navigation, Autoplay]}
            loop
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            className={styles.slider__box}
            onBeforeInit={(swiper) => {
              const nav = swiper.params.navigation;
              if (nav && typeof nav !== 'boolean') {
                nav.prevEl = prevRef.current;
                nav.nextEl = nextRef.current;
              }
            }}
            onSwiper={(swiper) => {
              setTimeout(() => {
                if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
              });
            }}
          >
            {sliderImages.map((img, index) => (
              <SwiperSlide key={index}>
                <picture>
                  <img
                    className={styles.slider__slide}
                    src={img.desktop}
                    alt={`Slide ${index + 1}`}
                  />
                </picture>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className={styles.slider__navigation}>
            <button
              ref={nextRef}
              className={classNames(
                styles.slider__btn,
                styles.slider__btnNext
              )}
            >
              <img src="icons/slider-arrow.svg" alt="Next arrow" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}