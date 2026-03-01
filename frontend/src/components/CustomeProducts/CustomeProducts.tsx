import type { Product } from '@/types/Product';
import { ProductsList } from '../ProductsList/ProductsList';
import styles from './CurstomeProducts.module.scss';
import type React from 'react';

type Props = {
  products: Product[];
  errorMessage: string;
}

export const CurstomeProducts: React.FC<Props> = ({ products, errorMessage }) => {

  return (
    <section className={styles.customeProducts}>
      <div className={styles.container}>

        {products.length > 0 && (
          <ProductsList products={products} title='Custome
Builds'  bgBanner='url(images/custome-builds-bg.png)' toProducts='12' />
        )}

        {!errorMessage && products.length === 0 && (
          <div className={styles.customeProducts__error}>
            <h1 className={styles.customeProducts__title}>Custome products</h1>
            <p className={styles.customeProducts__errorMessage}>There are no products</p>
          </div>
        )}

        {errorMessage && (
          <div className={styles.customeProducts__error}>
            <h1 className={styles.customeProducts__title}>Custome products</h1>
            <p className={styles.customeProducts__errorMessage}>{errorMessage}</p>
          </div>
        )}
      </div>
    </section>
  );
}