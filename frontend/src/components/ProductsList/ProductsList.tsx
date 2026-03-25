import { NavLink } from 'react-router-dom';
import styles from './ProductsList.module.scss';
import type { Product } from '@/types/Product';
import { ProductCard } from '../ProductCard/ProductCard';

type ProductsListProps = {
  products: Product[];
  title: string;
  bgBanner: string;
  toProducts: string;
}

export const ProductsList: React.FC<ProductsListProps> = ({ products, title, bgBanner, toProducts }) => {
  return (
    <div className={styles.productsList}>
        <div className={styles.productsList__inner}>
          <div style={{ backgroundImage: bgBanner }} className={styles.productsList__banner}>
            <h1 className={styles.productsList__title}>{title}
            </h1>
            <NavLink className={styles.productsList__link} to={toProducts}>
              See All Products
            </NavLink>
          </div>

          <ul className={styles.productsList__list}>
            {products.map(product => (
              <li key={product.id} className={styles.productsList__item}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </div>
      </div>
  );
}