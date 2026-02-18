import classNames from 'classnames';
import styles from './Features.module.scss';

export const Features = () => {
  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <ul className={styles.features__list}>
          <li className={styles.features__listItem}>
            <span className={classNames(styles.features__img, styles['features__img--headphones'])}></span>
            <span className={styles.features__title}>Product Support</span>
            <p className={styles.features__text}>
              Up to 3 years on-site warranty available for your peace of mind.
            </p>
          </li>
          <li className={styles.features__listItem}>
            <span className={classNames(styles.features__img, styles['features__img--profile'])}></span>
            <span className={styles.features__title}>Personal Account</span>
            <p className={styles.features__text}>
              With big discounts, free delivery and a dedicated support specialist.
            </p>
          </li>
          <li className={styles.features__listItem}>
            <span className={classNames(styles.features__img, styles['features__img--sale'])}></span>
            <span className={styles.features__title}>Amazing Savings</span>
            <p className={styles.features__text}>
              Up to 70% off new Products, you can be sure of the best price.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}