import classNames from 'classnames';
import styles from './Features.module.scss';

export const Features = () => {
  const features = [
    { title: 'Product Support', text: 'Up to 3 years on-site warranty available for your peace of mind.', modifier: 'features__img--headphones' },
    { title: 'Personal Account', text: 'With big discounts, free delivery and a dedicated support specialist.', modifier: 'features__img--profile' },
    { title: 'Amazing Savings', text: 'Up to 70% off new Products, you can be sure of the best price..', modifier: 'features__img--sale' },
  ]

  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <ul className={styles.features__list}>
          {features.map((item, index) => (
            <li key={index} className={styles.features__listItem}>
              <span className={classNames(styles.features__img, styles[item.modifier])}></span>
              <span className={styles.features__title}>{item.title}</span>
              <p className={styles.features__text}>
                {item.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}