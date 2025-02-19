import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isAdmin = false;

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className={styles.navbar} ref={navbarRef}>
      <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`} onClick={toggleDrawer}></div>

      <div className={styles.navContent}>
        <div className={`${styles.hamburger} ${isOpen ? styles.open : ''}`} onClick={toggleDrawer}>
           <span className={styles.bar}></span>
           <span className={styles.bar}></span>
           <span className={styles.bar}></span>
        </div>

        <div className={styles.title}>
          <Link href="/" className={styles.titleLink} onClick={handleLinkClick}>
            CDL Job Search
          </Link>
        </div>
      </div>

      <div className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
        <ul className={styles.drawerList}>
          {isAdmin && (
            <li>
              <Link href="/admin" className={styles.drawerItem} onClick={handleLinkClick}>
                Admin
              </Link>
            </li>
          )}
          <li>
            <Link href="/" className={styles.drawerItem} onClick={handleLinkClick}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/jobsearch" className={styles.drawerItem} onClick={handleLinkClick}>
              Job Search
            </Link>
          </li>
          <li>
            <Link href="/training" className={styles.drawerItem} onClick={handleLinkClick}>
              Training
            </Link>
          </li>
          <li>
            <Link href="/mission" className={styles.drawerItem} onClick={handleLinkClick}>
              Mission
            </Link>
          </li>
          <li>
            <Link href="/mysearches" className={styles.drawerItem} onClick={handleLinkClick}>
              My Searches
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
