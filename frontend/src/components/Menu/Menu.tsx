import classNames from 'classnames';
import styles from './Menu.module.scss';
import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';

type MenuProps = {
  isOpen: boolean;
  closeMenu: () => void;
}

export const Menu: React.FC<MenuProps> = ({ isOpen, closeMenu }) => {
  const body = document.getElementById('body') as HTMLElement;

  if (isOpen) {
    body.classList.add('lock');
  } else {
    body.classList.remove('lock');
  }

  const linkIsActive = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.menu__listLink, { [styles.isActiveLink]: isActive })
  }

  const links = [
    { link: 'Laptops', to: '1' },
    { link: 'Desktop PCs', to: '2' },
    { link: 'Networking Devices', to: '3' },
    { link: 'Printers & Scanners', to: '4' },
    { link: 'PC Parts', to: '5' },
    { link: 'All Other Products', to: '6' },
  ]

  return (
    <aside className={classNames(styles.menu, { [styles.menuOpen]: isOpen })}>
      <nav className={styles.menu__nav}>
        <div className={styles.menu__top}>
          <NavLink onClick={closeMenu} to='home'>
            <img src="/icons/header-logo.svg" alt="Logotype" />
          </NavLink>

          <button onClick={closeMenu} className={styles.menu__topClose}>
            <X color='#000' size={14} />
          </button>
        </div>

        <ul className={styles.menu__list}>
          {links.map((link, index) => (
            <li key={index} className={styles.menu__listItem}>
              <NavLink onClick={closeMenu} className={linkIsActive} to={link.to}>{link.link}</NavLink>
            </li>
          ))}
        </ul>

        <NavLink onClick={closeMenu} className={styles.menu__signIn} to='10'>Sign In</NavLink>
      </nav>
    </aside >
  );
}