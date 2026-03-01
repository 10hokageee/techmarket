import { NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';
import classNames from 'classnames';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const Footer = () => {
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
                <div className={styles.footer__topListBlock}>
                  <h2 className={styles.footer__topNavTitle}>PC Parts
                  </h2>
                  <ul className={styles.footer__topNavList}>
                    <li className={styles.footer__topNavListItem}>
                      <NavLink className={styles.footer__topNavLink} to='cart'>
                        Add On Cards
                      </NavLink>
                    </li>
                    <li className={styles.footer__topNavListItem}>
                      <NavLink className={styles.footer__topNavLink} to='cart'>
                        Cases / Power Supplies / Cooling
                      </NavLink>
                    </li>
                  </ul>
                </div>

                <div className={styles.footer__topListBlock}>
                  <h2 className={styles.footer__topNavTitle}>Desktop PCs
                  </h2>
                  <ul className={styles.footer__topNavList}>
                    <li className={styles.footer__topNavListItem}>
                      <NavLink className={styles.footer__topNavLink} to='cart'>
                        Custom PCs
                      </NavLink>
                    </li>
                    <li className={styles.footer__topNavListItem}><NavLink className={styles.footer__topNavLink} to='cart'>
                      MSI All-In-One PCs
                    </NavLink></li>

                    <li className={styles.footer__topNavListItem}><NavLink className={styles.footer__topNavLink} to='cart'>
                      HP/Compaq PCs
                    </NavLink></li>

                    <li className={styles.footer__topNavListItem}><NavLink className={styles.footer__topNavLink} to='cart'>
                      ASUS PCs
                    </NavLink></li>

                    <li className={styles.footer__topNavListItem}><NavLink className={styles.footer__topNavLink} to='cart'>
                      Tecs PCs
                    </NavLink></li>
                  </ul>
                </div>

                <div className={styles.footer__topListBlock}>
                  <h2 className={styles.footer__topNavTitle}>Laptops
                  </h2>
                  <ul className={styles.footer__topNavList}>
                    <li className={styles.footer__topNavListItem}>
                      <NavLink className={styles.footer__topNavLink} to='cart'>
                        MSI Workstation Series
                      </NavLink>
                    </li>
                    <li className={styles.footer__topNavListItem}>                <NavLink className={styles.footer__topNavLink} to='cart'>
                      MSI Prestige Series
                    </NavLink></li>
                    <li className={styles.footer__topNavListItem}>                <NavLink className={styles.footer__topNavLink} to='cart'>
                      Tablets and Pads
                    </NavLink></li>
                    <li className={styles.footer__topNavListItem}>
                      <NavLink className={styles.footer__topNavLink} to='cart'>
                        Netbooks
                      </NavLink></li>
                  </ul>
                </div>

                <div className={styles.footer__topListBlock}>
                  <h2 className={styles.footer__topNavTitle}>Address
                  </h2>
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
                      <p className={styles.footer__topNavText}>
                        We are open: Monday-Thursday: 9:00 AM - 5:30 PM
                      </p>
                    </li>

                    <li className={styles.footer__topNavListItem}>
                      <p className={styles.footer__topNavText}>
                        Friday: 9:00 AM - 6:00 PM
                      </p>
                    </li>

                    <li className={styles.footer__topNavListItem}>
                      <p className={styles.footer__topNavText}>
                        Saturday: 11:00 AM - 5:00 PM
                      </p>
                    </li>

                    <li className={styles.footer__topNavListItem}>
                      <span >E-mail: </span>
                      <a href="mailto:shop@email.com" className={classNames(styles.footer__topNavLink, styles.footer__topNavLinkEmail)}>
                        shop@email.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>


              <Accordion
                type="single"
                collapsible
                defaultValue="shipping"
                className={styles.footer__topNavAccordion}
              >
                <AccordionItem className={styles.footer__topNavItemWrapper} value="componentsPc">
                  <AccordionTrigger className={styles.footer__topNavTitle}>PC Parts</AccordionTrigger>
                  <AccordionContent>
                    <ul className={styles.footer__topNavList}>
                      <li className={styles.footer__topNavListItem}>
                        <NavLink className={styles.footer__topNavLink} to='cart'>
                          Add On Cards
                        </NavLink>
                      </li>
                      <li className={styles.footer__topNavListItem}>
                        <NavLink className={styles.footer__topNavLink} to='cart'>
                          Cases / Power Supplies / Cooling
                        </NavLink>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem className={styles.footer__topNavItemWrapper} value="desktops">
                  <AccordionTrigger className={styles.footer__topNavTitle}>Desktop PCs</AccordionTrigger>
                  <AccordionContent>
                    <ul className={styles.footer__topNavList}>
                      <li className={styles.footer__topNavListItem}>
                        <NavLink className={styles.footer__topNavLink} to='cart'>
                          Custom PCs
                        </NavLink>
                      </li>
                      <li className={styles.footer__topNavListItem}>
                        <NavLink className={styles.footer__topNavLink} to='cart'>
                          MSI All-In-One PCs
                        </NavLink>
                      </li>

                      <li className={styles.footer__topNavListItem}>
                        <NavLink className={styles.footer__topNavLink} to='cart'>
                          HP/Compaq PCs
                        </NavLink>
                      </li>

                      <li className={styles.footer__topNavListItem}>
                        <NavLink className={styles.footer__topNavLink} to='cart'>
                          ASUS PCs
                        </NavLink>
                      </li>

                      <li className={styles.footer__topNavListItem}>
                        <NavLink className={styles.footer__topNavLink} to='cart'>
                          Tecs PCs
                        </NavLink>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem className={styles.footer__topNavItemWrapper} value="laptops">
                  <AccordionTrigger className={styles.footer__topNavTitle}>Laptops</AccordionTrigger>
                  <AccordionContent>
                    <ul className={styles.footer__topNavList}>
                      <li className={styles.footer__topNavListItem}>
                        <NavLink className={styles.footer__topNavLink} to='cart'>
                          MSI Workstation Series
                        </NavLink>
                      </li>
                      <li className={styles.footer__topNavListItem}>
                        <NavLink className={styles.footer__topNavLink} to='cart'>
                          MSI Prestige Series
                        </NavLink>
                      </li>
                      <li className={styles.footer__topNavListItem}>
                        <NavLink className={styles.footer__topNavLink} to='cart'>
                          Tablets and Pads
                        </NavLink>
                      </li>
                      <li className={styles.footer__topNavListItem}>
                        <NavLink className={styles.footer__topNavLink} to='cart'>
                          Netbooks
                        </NavLink>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem className={styles.footer__topNavItemWrapper} value="address">
                  <AccordionTrigger className={styles.footer__topNavTitle}>Address</AccordionTrigger>
                  <AccordionContent>
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
                        <p className={styles.footer__topNavText}>
                          We are open: Monday-Thursday: 9:00 AM - 5:30 PM
                        </p>
                      </li>

                      <li className={styles.footer__topNavListItem}>
                        <p className={styles.footer__topNavText}>
                          Friday: 9:00 AM - 6:00 PM
                        </p>
                      </li>

                      <li className={styles.footer__topNavListItem}>
                        <p className={styles.footer__topNavText}>
                          Saturday: 11:00 AM - 5:00 PM
                        </p>
                      </li>

                      <li className={styles.footer__topNavListItem}>
                        <span>E-mail: </span>
                        <a href="mailto:shop@email.com" className={classNames(styles.footer__topNavLink, styles.footer__topNavLinkEmail)}>
                          shop@email.com
                        </a>
                      </li>
                    </ul>
                  </AccordionContent>
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
                <img src="icons/inst-icon.svg" alt="" />
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