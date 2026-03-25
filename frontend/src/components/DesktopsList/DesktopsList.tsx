import type { Product } from '@/types/Product';
import styles from './DesktopsList.module.scss';
import { ProductsList } from '../ProductsList/ProductsList';
import { useState } from 'react';
import classNames from 'classnames';
import type { Filter } from '@/types/Filter';
import { listByFilter } from '@/utils/listByFilter';

type DesktopsListProps = {
  products: Product[];
  errorMessage: string;
}

export const DesktopsList: React.FC<DesktopsListProps> = ({ products, errorMessage }) => {
  const [selectedFilter, setSelectedFilter] = useState<Filter>('all');


  const isActive = (field: Filter) => {
    return classNames(styles.desktopsList__btn, { [styles.activeBtn]: selectedFilter === field })
  }

  const filteredList = listByFilter(products, selectedFilter);

  const btns: { button: string, field: Filter }[] = [
    { button: 'All products', field: 'all' },
    { button: 'In stock', field: 'inStock' },
    { button: 'On Sale', field: 'sale' },
    { button: 'Top Rated', field: 'rated' },
    { button: 'Premium Picks', field: 'premium' },
  ]

  const message = errorMessage || (!errorMessage && products.length === 0 ? 'There are no products' : null);

  return (
    <section className={styles.desktopsList}>
      <div className={styles.container}>
        {products.length > 0 && (
          <>
            <ul className={styles.desktopsList__btns}>
              {btns.map((btn, index) => (
                <li key={index} className={styles.desktopsList__item}>
                  <button onClick={() => setSelectedFilter(btn.field)} className={isActive(btn.field)}>{btn.button}</button>
                </li>
              ))}
            </ul>

            {filteredList.length > 0 ? (
              <ProductsList products={filteredList} title='Desktops' bgBanner='url(images/msi-desktops-bg.png)' toProducts='15' />
            ) : (
              <p className={styles.desktopsList__errorMessage}>No products found for this filter</p>
            )}
          </>
        )}

        {message && (
          <div className={styles.desktopsList__error}>
            <h1 className={styles.desktopsList__title}>Desktops</h1>
            <p className={styles.desktopsList__errorMessage}>{message}</p>
          </div>
        )}
      </div>
    </section>
  );
}