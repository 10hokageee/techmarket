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
import { ChevronLeft, ChevronRight } from "lucide-react";

type NewProductsProps = {
  products: Product[];
  errorMessage: string;
};

export const NewProducts: React.FC<NewProductsProps> = ({ products, errorMessage }) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  return (
    <section className={styles.newProducts}>
      <div className={styles.container}>
        <h1 className={styles.newProducts__title}>New Products</h1>

        {products.length > 0 && (
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
              <ChevronLeft color='#fff' width={'16px'} height={'16px'} />

            </button>

            <button
              className={`${styles.newProducts__btn} ${styles.newProducts__btnNext}`}
              onClick={() => carouselApi?.scrollNext()}
            >
               <ChevronRight color='#fff' width={'16px'} height={'16px'} />
            </button>
          </Carousel>
        )}

        {!errorMessage && products.length === 0 && (
          <p className={styles.newProducts__errorMessage}>There are no products</p>
        )}

        {errorMessage && (
          <p className={styles.newProducts__errorMessage}>{errorMessage}</p>
        )}
      </div>
    </section>
  );
};