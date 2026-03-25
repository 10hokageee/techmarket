import classNames from 'classnames';
import styles from './Menu.module.scss';
import { NavLink } from 'react-router-dom';
import { MenuIcon, X } from 'lucide-react';

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
    { link: 'Laptops', to: 'laptop' },
    { link: 'Desktop PCs', to: 'pc' },
    { link: 'Networking Devices', to: 'network_device' },
    { link: 'Printers & Scanners', to: 'pc_part' },
    { link: 'PC Parts', to: 'pc-parts' },
    { link: 'All Other Products', to: 'other' },
  ];

  return (
    <aside className={classNames(styles.menu, { [styles.menuOpen]: isOpen })}>
      <nav className={styles.menu__nav}>
        <div className={styles.menu__top}>
          <NavLink onClick={closeMenu} to='home'>
            <MenuIcon />
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