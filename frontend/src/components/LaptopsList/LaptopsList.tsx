import type { Product } from "@/types/Product";
import { ProductsList } from "../ProductsList/ProductsList";
import styles from "./LaptopsList.module.scss";
import { useState } from "react";
import classNames from "classnames";

type Props = {
  products: Product[];
}

type filter = 'all' | 'inStock' | 'sale' | 'rated' | 'premium';

export const LaptopsList: React.FC<Props> = ({ products }) => {
  const [selectedFilter, setSelectedFilter] = useState<filter>('all');

  const filterdList = () => {
    switch (selectedFilter) {
      case 'inStock':
        return products.filter(product => product.stock_quantity > 0)

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

  return (
    <section className={styles.laptopsList}>
      <div className={styles.container}>
        <ul className={styles.laptopsList__btns}>
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
        <ProductsList products={filterdList()} title="MSI
Laptops" bgBanner="url(images/msi-laptops-bg.png)" toProducts="14" />
      </div>
    </section>
  );
}