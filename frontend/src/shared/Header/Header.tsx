import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__top}>
        <div className={styles.container}>
          <div className={styles.header__topInner}>
            <div className={styles.header__topOpeningHours}>
              <span>Mon-Thu:</span> 9:00 AM - 5:30 PM
            </div>
            <address className={styles.header__topAddress}>Visit our showroom in 1234 Street Adress City Address, 1234</address>
            <div className={styles.header__topInfo}>
              <a className={styles.header__topPhone} href="tel:0012345678">Call Us: (00) 1234 5678</a>
              <a className={styles.header__topFacebook} href="#">
                <img src="icons/facebook-icon.svg" alt="Social link to facebook" />
              </a>
              <a className={styles.header__topInst} href="#">
                <img src="icons/inst-icon.svg" alt="Social link to instagram" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.header__bottom}>
        <div className={styles.container}>
          <nav className={styles.header__nav}>
            <NavLink to="/" className={styles.header__navLogo}>
              <img src="icons/header-logo.svg" alt="Logotype" />
            </NavLink>
            <ul className={styles.header__navList}>
              <li>
                <NavLink className={styles.header__navListLink} to='catalog'>Laptops</NavLink> </li>
              <li>
                <NavLink className={styles.header__navListLink} to='catalog'>Desktop PCs</NavLink>  </li>
              <li>
                <NavLink className={styles.header__navListLink} to='catalog'>Networking Devices</NavLink> </li>
              <li>
                <NavLink className={styles.header__navListLink} to='catalog'>Printers &  Scanners</NavLink> </li>
              <li>
                <NavLink className={styles.header__navListLink} to='catalog'>PC Parts</NavLink>
              </li>
              <li>
                <NavLink className={styles.header__navListLink} to='catalog'>All Other Products</NavLink></li>
              <li>
                <NavLink className={styles.header__navListLinkLogin} to='SignIn'>Sign in</NavLink></li>
            </ul>

            <div className={styles.header__navButtons}>
              <button className={(styles.header__navButton, styles.header__navButtonSearch)}>
                <img src="icons/search-icon.svg" alt="Search" />
              </button>
              <a href='#' className={(styles.header__navButton, styles.header__navButtonCart)}>
                <img src="icons/cart-icon.svg" alt="Cart" />
                <span className={styles.header__navButtonCartCount}>2</span>
              </a>
              <a href="#" className={(styles.header__navButton, styles.header__navButtonProfile)}>
                <img src="images/profile-picture.jpg" alt="Profile picture" />
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}