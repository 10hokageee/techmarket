import { Outlet } from 'react-router-dom';
import { Header } from './shared/Header/Header';
import { Footer } from './shared/Footer/Footer';
import { Features } from './shared/Features/Features';
import styles from './App.module.scss';

export const App = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className={styles.app}>
      <Header />
      <button onClick={scrollToTop} className={styles.goTop}></button>

      <main className={styles.main}>
        <Outlet />
      </main>

      <Features />
      <Footer />
    </div>
  );
};