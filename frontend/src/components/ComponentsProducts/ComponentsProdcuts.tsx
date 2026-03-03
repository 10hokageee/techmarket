import styles from './ComponentsProdcuts.module.scss';
import type { Product } from '@/types/Product';
import { ProductsList } from '../ProductsList/ProductsList';

type ComponentsProductsProps = {
  products: Product[];
  errorMessage: string;
}

export const ComponentsProducts: React.FC<ComponentsProductsProps> = ({ products, errorMessage }) => {

  const message = errorMessage || (!errorMessage && products.length === 0 ? 'There are no products' : null);

  return (
    <section className={styles.monitorList}>
      <div className={styles.container}>

        {products.length > 0 && (
          <ProductsList products={products} title='PC parts' bgBanner='url(images/msi-monitors-bg.png)' toProducts='16' />
        )}

        {message && (
          <div className={styles.monitorList__error}>
            <h1 className={styles.monitorList__title}>PC parts</h1>
            <p className={styles.monitorList__errorMessage}>{message}</p>
          </div>
        )}
      </div>
    </section>
  );

}

