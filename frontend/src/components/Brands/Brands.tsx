import styles from './Brands.module.scss';

export const Brands = () => {

  const brands = [
    { imgUrl: 'images/roccat.png', alt: 'roccat brand' },
    { imgUrl: 'images/msi.png', alt: 'msi brand' },
    { imgUrl: 'images/razer.png', alt: 'razer brand' },
    { imgUrl: 'images/thermaltake.png', alt: 'thermaltake brand' },
    { imgUrl: 'images/adata.png', alt: 'adata brand"' },
    { imgUrl: 'images/hp.png', alt: 'hp brand' },
    { imgUrl: 'images/gigabyte.png', alt: 'gigabyte brand' },
  ]

  return (
    <section className={styles.brands}>
      <div className={styles.container}>
        <ul className={styles.brands__list}>

          {brands.map((img, index) => (
            <li key={index} className={styles.brands__listItem}>
              <img src={img.imgUrl} alt={img.alt} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};