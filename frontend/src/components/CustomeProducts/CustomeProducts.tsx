import type { Product } from '@/types/Product';
import { ProductsList } from '../ProductsList/ProductsList';
import styles from './CurstomeProducts.module.scss';
import type React from 'react';

type CurstomeProductsProps = {
  products: Product[];
  errorMessage: string;
}

export const CurstomeProducts: React.FC<CurstomeProductsProps> = ({ products, errorMessage }) => {
  const message = errorMessage || (!errorMessage && products.length === 0 ? 'There are no products' : null);

  return (
    <section className={styles.customeProducts}>
      <div className={styles.container}>

        {products.length > 0 && (
          <ProductsList products={products} title='Custome
Builds'  bgBanner='url(images/custome-builds-bg.png)' toProducts='12' />
        )}

        {message && (
          <div className={styles.customeProducts__error}>
            <h1 className={styles.customeProducts__title}>Custome products</h1>
            <p className={styles.customeProducts__errorMessage}>{message}</p>
          </div>
        )}
      </div>
    </section>
  );
}