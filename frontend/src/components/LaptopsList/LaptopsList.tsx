import type { Product } from "@/types/Product";
import { ProductsList } from "../ProductsList/ProductsList";
import styles from "./LaptopsList.module.scss";
import { useState } from "react";
import classNames from "classnames";

type Props = {
  products: Product[];
  errorMessage: string;
}

type filter = 'all' | 'inStock' | 'sale' | 'rated' | 'premium';

export const LaptopsList: React.FC<Props> = ({ products, errorMessage }) => {
  const [selectedFilter, setSelectedFilter] = useState<filter>('all');

  const listByFilter = () => {
    switch (selectedFilter) {
      case 'inStock':
        return products.filter(product => product.status)

      case 'sale':
        return products.filter(product => product.sale_price !== null)

      case 'rated':
        return products.filter(product => +product.rating_avg > 4.7)

      case 'premium':
        return products.filter(product => +product.original_price > 1000)

      default:
        return products;
    }
  }

  const isActive = (field: string) => {
    return classNames(styles.laptopsList__btn, { [styles.activeBtn]: selectedFilter === field })
  }

  const filterdList = listByFilter();

  return (
    <section className={styles.laptopsList}>
      <div className={styles.container}>
        {products.length > 0 && (
          <>
            <ul className={styles.laptopsList__btns}>
              <li className={styles.laptopsList__item}>
                <button onClick={() => setSelectedFilter('all')} className={isActive('all')}>All products</button>
              </li>
              <li className={styles.laptopsList__item}>
                <button onClick={() => setSelectedFilter('inStock')} className={isActive('inStock')}>In stock</button>
              </li>
              <li className={styles.laptopsList__item}>
                <button onClick={() => setSelectedFilter('sale')} className={isActive('sale')}>On Sale</button>

              </li>
              <li className={styles.laptopsList__item}>
                <button onClick={() => setSelectedFilter('rated')} className={isActive('rated')}>Top Rated</button>

              </li>
              <li className={styles.laptopsList__item}>
                <button onClick={() => setSelectedFilter('premium')} className={isActive('premium')}>Premium Picks</button>
              </li>
            </ul>


            {filterdList.length > 0 ? (
              <ProductsList products={filterdList} title="Laptops" bgBanner="url(images/msi-laptops-bg.png)" toProducts="14" />
            ) : (
              <p className={styles.laptopsList__errorMessage}>No products found for this filter</p>
            )}
          </>
        )}


        {!errorMessage && products.length === 0 && (
          <div className={styles.laptopsList__error}>
            <h1 className={styles.laptopsList__title}>Laptops</h1>
            <p className={styles.laptopsList__errorMessage}>There are no products</p>
          </div>
        )}

        {errorMessage && (
          <div className={styles.laptopsList__error}>
            <h1 className={styles.laptopsList__title}>Laptops</h1>
            <p className={styles.laptopsList__errorMessage}>{errorMessage}</p>
          </div>
        )}
      </div>
    </section>
  );
}