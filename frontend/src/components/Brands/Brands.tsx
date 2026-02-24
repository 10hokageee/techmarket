import styles from './Brands.module.scss';

export const Brands = () => {

  return (
    <section className={styles.brands}>
      <div className={styles.container}>
        <ul className={styles.brands__list}>
          <li className={styles.brands__listItem}>
            <img src="images/roccat.png" alt="roccat brand" />
          </li>
          <li className={styles.brands__listItem}>
            <img src="images/msi.png" alt="msi brand" />
          </li>
          <li className={styles.brands__listItem}>
            <img src="images/razer.png" alt="razer brand" />
          </li>
          <li className={styles.brands__listItem}>
            <img src="images/thermaltake.png" alt="thermaltake brand" />
          </li>
          <li className={styles.brands__listItem}>
            <img src="images/adata.png" alt="adata brand" />
          </li>
          <li className={styles.brands__listItem}>
            <img src="images/hp.png" alt="hp brand" />
          </li>
          <li className={styles.brands__listItem}>
            <img src="images/gigabyte.png" alt="gigabyte brand" />
          </li>
        </ul>
      </div>
    </section>
  );
};