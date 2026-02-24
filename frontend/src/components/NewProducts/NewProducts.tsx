import { useState } from "react";
import type { Product } from "../../types/Product";
import { ProductCard } from "../ProductCard/ProductCard";
import styles from "./NewProducts.module.scss";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

type Props = {
  products: Product[];
};

export const NewProducts: React.FC<Props> = ({ products }) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  return (
    <section className={styles.newProducts}>
      <div className={styles.container}>
        <h1 className={styles.newProducts__title}>New Products</h1>

        <Carousel setApi={setCarouselApi} opts={{ align: "start", loop: true }}>
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="basis-auto"
              >
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <button
            className={`${styles.newProducts__btn} ${styles.newProducts__btnPrev}`}
            onClick={() => carouselApi?.scrollPrev()}
          >
            <img src="icons/slider-arrow.svg" alt="Prev" />
          </button>

          <button
            className={`${styles.newProducts__btn} ${styles.newProducts__btnNext}`}
            onClick={() => carouselApi?.scrollNext()}
          >
            <img src="icons/slider-arrow.svg" alt="Next" />
          </button>
        </Carousel>
      </div>
    </section>
  );
};