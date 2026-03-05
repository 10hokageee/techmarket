import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import classNames from 'classnames';
import { useState } from 'react';
import { Menu } from '@/components/Menu/Menu';
import { Instagram, MenuIcon, Search, X } from 'lucide-react';

export const Header = () => {
  const favCount = 0;
  const [isOpen, setIsOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(true);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const toggleSearch = () => {
    setOpenSearch(prev => !prev);
  }

  const closeMenu = () => {
    setIsOpen(false);
  };


  const isActiveLink = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.header__navListLink, {
      [styles.activeLink]: isActive,
    });
  }

  const days = [
    { day: 'Mon-Thu:', time: '9:00 AM - 5:30 PM' },
    { day: 'Fr:', time: '9:00 AM - 6:00 PM' },
    { day: 'Sat:', time: '11:00 AM - 5:00 PM' },
  ]

  const links = [
    { text: 'Laptops', to: '1' },
    { text: 'Desktop PCs', to: '2' },
    { text: 'Networking Devices', to: '3' },
    { text: 'Printers &  Scanners', to: '4' },
    { text: 'PC Parts', to: '5' },
    { text: 'All Other Products', to: '6' },
    { text: 'Sign in', to: '7' },
  ]

  return (
    <header className={styles.header}>
      <Menu isOpen={isOpen} closeMenu={closeMenu} />
      <div className={styles.header__top}>
        <div className={styles.container}>
          <div className={styles.header__topInner}>
            <div className={styles.header__topDropdown}>
              <div className={styles.header__topOpeningHours}>
                <span>Mon-Thu:</span> 9:00 AM - 5:30 PM
              </div>
              <div className={styles.header__topShowInfo}>
                <div className={classNames(styles.header__topShowInfoItem, styles['header__topShowInfoItem--open'])}>
                  <span className={styles.header__topShowInfoTitle}>
                    We are open:
                  </span>
                  <ul className={styles.header__topShowInfoDays}>
                    {days.map((day, index) => (
                      <li key={index} className={styles.header__topShowInfoDay}>
                        <span>{day.day}</span> {day.time}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={classNames(styles.header__topShowInfoItem, styles['header__topShowInfoItem--address'])}>
                  <address className={styles.header__topShowInfoAddress}>
                    Address: 1234 Street Adress, City Address, 1234
                  </address>
                </div>
                <div className={styles.header__topShowInfoСontact}>
                  <span className={styles.header__topShowInfoСontactLink}>
                    Phones: <a href="tel:0012345678">(00) 1234 5678</a>
                  </span>
                  <span className={styles.header__topShowInfoСontactLink}>
                    E-mail: <a href="mailto:shop@email.com">shop@email.com</a>
                  </span>
                </div>
              </div>
            </div>

            <address className={styles.header__topAddress}>Visit our showroom in 1234 Street Adress City Address, 1234</address>
            <div className={styles.header__topInfo}>
              <a className={styles.header__topPhone} href="tel:0012345678">Call Us: (00) 1234 5678</a>
              <a className={styles.header__topFacebook} href="#">
                <img src="/icons/facebook-icon.svg" alt="Social link to facebook" />
              </a>
              <a className={styles.header__topInst} href="#">
                <Instagram width={'20px'} height={'20px'} fill='#fff' />
              </a>
            </div>
            <a href="tel:0012345678" className={styles.header__topContact}>Contact Us</a>
          </div>
        </div>
      </div>
      <div className={styles.header__bottom}>
        <div className={styles.container}>
          <nav className={styles.header__nav}>

            <div className={styles.header__bottomMobile}>
              <NavLink to="/" className={styles.header__navLogoMobile}>
                <img src="/icons/mobile-logo.svg" alt="Logotype" />
              </NavLink>
              <div className={styles.header__navBurger}>
                <button onClick={toggleMenu} className={styles.header__navMenu}>
                  <MenuIcon color='#fff' width={'26px'} height={'20px'}/>
                </button>
              </div>

              <label className={styles.header__navLabelSearch} htmlFor="search">
                <input className={styles.header__navInputSearch} name="search" id="search" type='text' placeholder='Search here' />
              </label>

              <div className={styles.header__navBtnsMobile}>
                <NavLink to='#' className={(styles.header__navButtonMobile, styles.header__navButtonCartMobile)}>
                  <img src="/icons/cart-icon-mobile.svg" alt="Cart" />
                  <span className={styles.header__navButtonCartCountMobile}>{favCount}</span>
                </NavLink>
                <NavLink to="#" className={(styles.header__navButtonMobile, styles.header__navButtonProfileMobile)}>
                  <img src="/icons/profile-icon-mobile.svg" alt="Profile picture" />
                </NavLink>
              </div>
            </div>

            <NavLink to="/" className={styles.header__navLogo}>
              <img src="/icons/header-logo.svg" alt="Logotype" />
            </NavLink>

            {openSearch !== true && (
              <div className={styles.header__searchBox}>
                <label className={styles.header__searchLabel} htmlFor="searchDesk">
                  <input className={styles.header__search} name="searchDesk" id="searchDesk" type='text' placeholder='Search here' />
                </label>

                <button className={styles.header__searchBtnClose} type='button' onClick={() => setOpenSearch(true)}>
                  <X color='#0156ff' width={'18px'} height={'18px'} />
                </button>
              </div>
            )}

            {openSearch && (
              <ul className={styles.header__navList}>
                {links.map((link, index) => (
                  <li key={index} className={styles.header__navListItem}>
                    <NavLink className={isActiveLink} to={link.to}>{link.text}</NavLink></li>
                ))}
              </ul>
            )}

            <div className={styles.header__navButtons}>
              {openSearch && (
                <button onClick={toggleSearch} className={(styles.header__navButton, styles.header__navButtonSearch)}>
                  <Search width={'18px'} height={'18px'} color='#000' />
                </button>
              )}

              <a href='#' className={(styles.header__navButton, styles.header__navButtonCart)}>
                <img src="/icons/cart-icon.svg" alt="Cart" />
                <span className={styles.header__navButtonCartCount}>{favCount}</span>
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