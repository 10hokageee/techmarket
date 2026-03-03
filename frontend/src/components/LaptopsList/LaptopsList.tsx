import type { Product } from "@/types/Product";
import { ProductsList } from "../ProductsList/ProductsList";
import styles from "./LaptopsList.module.scss";
import { useState } from "react";
import classNames from "classnames";
import { listByFilter } from "@/utils/listByFilter";
import type { Filter } from "@/types/Filter";

type LaptopsListProps = {
  products: Product[];
  errorMessage: string;
}

export const LaptopsList: React.FC<LaptopsListProps> = ({ products, errorMessage }) => {
  const [selectedFilter, setSelectedFilter] = useState<Filter>('all');


  const isActive = (field: string) => {
    return classNames(styles.laptopsList__btn, { [styles.activeBtn]: selectedFilter === field })
  }

  const filterdList = listByFilter(products, selectedFilter);

  const btns: { button: string, field: Filter }[] = [
    { button: 'All products', field: 'all' },
    { button: 'In stock', field: 'inStock' },
    { button: 'On Sale', field: 'sale' },
    { button: 'Top Rated', field: 'rated' },
    { button: 'Premium Picks', field: 'premium' },
  ]

  const message = errorMessage || (!errorMessage && products.length === 0 ? 'There are no products' : null);

  return (
    <section className={styles.laptopsList}>
      <div className={styles.container}>
        {products.length > 0 && (
          <>
            <ul className={styles.laptopsList__btns}>
              {btns.map((btn, index) => (
                <li key={index} className={styles.laptopsList__item}>
                  <button onClick={() => setSelectedFilter(btn.field)} className={isActive(btn.field)}>{btn.button}</button>
                </li>
              ))}
            </ul>

            {filterdList.length > 0 ? (
              <ProductsList products={filterdList} title="Laptops" bgBanner="url(images/msi-laptops-bg.png)" toProducts="14" />
            ) : (
              <p className={styles.laptopsList__errorMessage}>No products found for this filter</p>
            )}
          </>
        )}

        {message && (
          <div className={styles.laptopsList__error}>
            <h1 className={styles.laptopsList__title}>Laptops</h1>
            <p className={styles.laptopsList__errorMessage}>{message}</p>
          </div>
        )}
      </div>
    </section>
  );
}