import { NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';
import classNames from 'classnames';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Instagram } from 'lucide-react';

export const Footer = () => {

  type FooterLink = {
    label: string;
    to: string;
  };

  type FooterSection = {
    id: string;
    title: string;
    links: FooterLink[];
  };

  const footerNav: FooterSection[] = [
    {
      id: "componentsPc",
      title: "PC Parts",
      links: [
        { label: "Add On Cards", to: "cart" },
        { label: "Cases / Power Supplies / Cooling", to: "cart" },
      ],
    },
    {
      id: "desktops",
      title: "Desktop PCs",
      links: [
        { label: "Custom PCs", to: "cart" },
        { label: "MSI All-In-One PCs", to: "cart" },
        { label: "HP/Compaq PCs", to: "cart" },
        { label: "ASUS PCs", to: "cart" },
        { label: "Tecs PCs", to: "cart" },
      ],
    },
    {
      id: "laptops",
      title: "Laptops",
      links: [
        { label: "MSI Workstation Series", to: "cart" },
        { label: "MSI Prestige Series", to: "cart" },
        { label: "Tablets and Pads", to: "cart" },
        { label: "Netbooks", to: "cart" },
      ],
    },
  ];

  const renderLinks = (links: FooterLink[]) => (
    <ul className={styles.footer__topNavList}>
      {links.map((link, index) => (
        <li key={index} className={styles.footer__topNavListItem}>
          <NavLink className={styles.footer__topNavLink} to={link.to}>
            {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );

  const AddressContent = (
    <ul className={styles.footer__topNavList}>
      <li className={styles.footer__topNavListItem}>
        <NavLink className={styles.footer__topNavLink} to='cart'>
          <address>Address: 1234 Street Adress City Address, 1234</address>
        </NavLink>
      </li>
      <li className={styles.footer__topNavListItem}>
        <span>Phones: </span>
        <a href="tel:0012345678" className={classNames(styles.footer__topNavLink, styles.footer__topNavLinkPhone)}>
          (00) 1234 5678
        </a>
      </li>
      <li className={styles.footer__topNavListItem}>
        <p className={styles.footer__topNavText}>We are open: Monday-Thursday: 9:00 AM - 5:30 PM</p>
      </li>
      <li className={styles.footer__topNavListItem}>
        <p className={styles.footer__topNavText}>Friday: 9:00 AM - 6:00 PM</p>
      </li>
      <li className={styles.footer__topNavListItem}>
        <p className={styles.footer__topNavText}>Saturday: 11:00 AM - 5:00 PM</p>
      </li>
      <li className={styles.footer__topNavListItem}>
        <span>E-mail: </span>
        <a href="mailto:shop@email.com" className={classNames(styles.footer__topNavLink, styles.footer__topNavLinkEmail)}>
          shop@email.com
        </a>
      </li>
    </ul>
  );

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footer__inner}>
          <div className={styles.footer__top}>
            <div className={styles.footer__topTitleBlock}>
              <h1 className={styles.footer__topTitle}>Sign Up To Our Newsletter.</h1>
              <p className={styles.footer__topText}>Be the first to hear about the latest offers.</p>
            </div>

            <nav className={styles.footer__topNav}>
              <div className={styles.footer__topNavDesk}>
                {footerNav.map((section) => (
                  <div key={section.id} className={styles.footer__topListBlock}>
                    <h2 className={styles.footer__topNavTitle}>{section.title}</h2>
                    {renderLinks(section.links)}
                  </div>
                ))}
                <div className={styles.footer__topListBlock}>
                  <h2 className={styles.footer__topNavTitle}>Address</h2>
                  {AddressContent}
                </div>
              </div>

              <Accordion type="single" collapsible defaultValue="shipping" className={styles.footer__topNavAccordion}>
                {footerNav.map((section) => (
                  <AccordionItem key={section.id} className={styles.footer__topNavItemWrapper} value={section.id}>
                    <AccordionTrigger className={styles.footer__topNavTitle}>{section.title}</AccordionTrigger>
                    <AccordionContent>{renderLinks(section.links)}</AccordionContent>
                  </AccordionItem>
                ))}

                <AccordionItem className={styles.footer__topNavItemWrapper} value="address">
                  <AccordionTrigger className={styles.footer__topNavTitle}>Address</AccordionTrigger>
                  <AccordionContent>{AddressContent}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </nav>
          </div>

          <div className={styles.footer__bottom}>
            <div className={styles.footer__bottomSocials}>
              <a className={styles.footer__bottomFacebook} href="#">
                <img src="/icons/facebook-icon.svg" alt="" />
              </a>
              <a className={styles.footer__bottomInst} href="#">
                <Instagram width={'20px'} height={'20px'} fill='#fff' />
              </a>
            </div>

            <ul className={styles.footer__bottomPaymants}>
              <li><img src="/icons/discover.svg" alt="" /></li>
              <li><img src="/icons/visa.svg" alt="" /></li>
              <li><img src="/icons/maestro.svg" alt="" /></li>
              <li><img src="/icons/discover.svg" alt="" /></li>
              <li><img src="/icons/american-express.svg" alt="" /></li>
            </ul>

            <p className={styles.footer__bottomCopyright}>
              Copyright © 2020 Shop Pty. Ltd.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};