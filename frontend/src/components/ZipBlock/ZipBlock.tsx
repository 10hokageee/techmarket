import styles from './ZipBlock.module.scss';

export const ZipBlock = () => {
  return (
    <section className={styles.zipBlock}>
      <div className={styles.container}>
        <div className={styles.zipBlock__inner}>
          <img src="/icons/zip-logo.svg" alt="" className={styles.zipBlock__logo} />
          
          <p className={styles.zipBlock__text}>
            <span>own</span> it now, up to 6 months interest free <a href="#" className={styles.zipBlock__link}>learn more</a> 
          </p>
        </div>
      </div>
    </section>
  );
}