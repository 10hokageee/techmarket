import type { Product } from '@/types/Product';
import { ProductsList } from '../ProductsList/ProductsList';
import styles from './CurstomeProducts.module.scss';
import type React from 'react';

type Props = {
  products: Product[];
}

export const CurstomeProducts: React.FC<Props> = ({ products }) => {

  return (
    <section className={styles.customeProducts}>
      <div className={styles.container}>
        <ProductsList products={products} title='Custome
Builds'  bgBanner='url(images/custome-builds-bg.png)' toProducts='12' />
      </div>
    </section>
  );
}