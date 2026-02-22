import { NavLink } from "react-router-dom";
import type { Product } from "../../types/Product";
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <NavLink to='10'>
      <article className={styles.productCard}>
        <img className={styles.productCard__img} src="images/test-product-img.png" alt={product.description} />

        <p className={styles.productCard__description}>
          {product.description}
        </p>

        {product.sale_price && (
          <span className={styles.productCard__sale}>
            ${product.sale_price}
          </span>
        )}

        <span className={styles.productCard__price}>
          ${product.original_price}
        </span>
      </article>
    </NavLink>
  );
}