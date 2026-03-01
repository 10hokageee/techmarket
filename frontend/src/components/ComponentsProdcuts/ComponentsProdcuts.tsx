import styles from './ComponentsProdcuts.module.scss';
import type { Product } from '@/types/Product';
import { ProductsList } from '../ProductsList/ProductsList';

type Props = {
  products: Product[];
  errorMessage: string;
}


export const ComponentsProdcuts: React.FC<Props> = ({ products, errorMessage }) => {
  return (
    <section className={styles.monitorList}>
      <div className={styles.container}>

        {products.length > 0 && (
          <ProductsList products={products} title='PC parts' bgBanner='url(images/msi-monitors-bg.png)' toProducts='16' />
        )}

        {!errorMessage && products.length === 0 && (
          <div className={styles.monitorList__error}>
            <h1 className={styles.monitorList__title}>PC parts</h1>
            <p className={styles.monitorList__errorMessage}>There are no products</p>
          </div>
        )}

        {errorMessage && (
          <div className={styles.monitorList__error}>
            <h1 className={styles.monitorList__title}>PC parts</h1>
            <p className={styles.monitorList__errorMessage}>{errorMessage}</p>
          </div>
        )}

      </div>
    </section>
  );

}

