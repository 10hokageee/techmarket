import classNames from 'classnames';
import styles from './Menu.module.scss';
import { NavLink } from 'react-router-dom';

type Props = {
  isOpen: boolean;
  closeMenu: () => void;
}

export const Menu: React.FC<Props> = ({ isOpen, closeMenu }) => {
  const body = document.getElementById('body') as HTMLElement;

  if (isOpen) {
    body.classList.add('lock');
  } else {
    body.classList.remove('lock');
  }

  const linkIsActive = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.menu__listLink, { [styles.isActiveLink]: isActive })
  }

  return (
    <aside className={classNames(styles.menu, { [styles.menuOpen]: isOpen })}>
      <nav className={styles.menu__nav}>
        <div className={styles.menu__top}>
          <NavLink onClick={closeMenu} to='home'>
            <img src="/icons/header-logo.svg" alt="" />
          </NavLink>

          <button onClick={closeMenu} className={styles.menu__topClose}>
            <img src="/icons/close-burger.svg" alt="" />
          </button>
        </div>

        <ul className={styles.menu__list}>
          <li className={styles.menu__listItem}>
            <NavLink onClick={closeMenu} className={linkIsActive} to='1'>Laptops</NavLink>
          </li>
          <li className={styles.menu__listItem}>
            <NavLink onClick={closeMenu} className={linkIsActive} to='2'>
              Desktop PCs</NavLink>
          </li>
          <li className={styles.menu__listItem}>
            <NavLink onClick={closeMenu} className={linkIsActive} to='3'>Networking Devices</NavLink>
          </li>
          <li className={styles.menu__listItem}>
            <NavLink onClick={closeMenu} className={linkIsActive} to='4'>Printers & Scanners</NavLink>
          </li>
          <li className={styles.menu__listItem}>
            <NavLink onClick={closeMenu} className={linkIsActive} to='5'>PC Parts</NavLink>
          </li>
          <li className={styles.menu__listItem}>
            <NavLink onClick={closeMenu} className={linkIsActive} to='6'>All Other Products</NavLink>
          </li>
        </ul>

        <NavLink onClick={closeMenu} className={styles.menu__signIn} to='10'>Sign In</NavLink>
      </nav>
    </aside >
  );
}