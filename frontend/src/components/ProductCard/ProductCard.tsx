import { NavLink } from "react-router-dom";
import type { Product } from "../../types/Product";
import styles from './ProductCard.module.scss';
import { StarRating } from "../StarRating/StarRating";

type Props = {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <NavLink to='10'>
      <article className={styles.productCard}>
        <div className={styles.productCard__statusBody}>
          {product.status === true ? (
            <>
              <img className={styles.productCard__statusImg} src="icons/stock-icon.svg" alt="" />
              <span className={styles.productCard__status}>
                in stock
              </span></>

          ) : (
            <>
              <img className={styles.productCard__statusImg} src="icons/check-availability-icon.svg" alt="" />
              <span style={{color: "#C94D3F"}} className={styles.productCard__status}>
                check availability
                </span>
              </>
          )}

        </div>

        <img className={styles.productCard__img} src="images/test-product-img.png" alt={product.description} />
        <StarRating rating={Number(product.rating_avg)} />

        <span className={styles.productCard__title}>
          {product.name}
        </span>

        {product.sale_price ? (
          <>
            <span className={styles.productCard__throughPrice}>
              ${product.original_price}
            </span>
            <span className={styles.productCard__salePrice}>
              ${product.sale_price}
            </span>
          </>
        ) : (
          <span className={styles.productCard__originalPrice}>
            ${product.original_price}
          </span>
        )}
      </article>
    </NavLink>
  );
}