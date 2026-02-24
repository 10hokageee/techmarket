import styles from './MonitorList.module.scss';
import type { Product } from '@/types/Product';
import { ProductsList } from '../ProductsList/ProductsList';

type Props = {
  products: Product[];
}


export const MonitorList: React.FC<Props> = ({ products }) => {
  return (
    <section className={styles.monitorList}>
      <div className={styles.container}>
        <ProductsList products={products} title='Gaming
Monitors' bgBanner='url(images/msi-monitors-bg.png)' toProducts='16' />
      </div>
    </section>
  );

}

