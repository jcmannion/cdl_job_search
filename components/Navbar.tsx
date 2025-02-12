import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';  

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen); 
  };

  const isAdmin = false; 

  return (
    <nav className={styles.navbar}>
        <div className={styles.title}>
        <Link href="/" className={styles.titleLink}>
          CDL Job Search
        </Link>
      </div>
      <div className={styles.hamburger} onClick={toggleDrawer}>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>

      <div className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
        <ul className={styles.drawerList}>
          {isAdmin && (
            <li>
              <Link href="/admin" className={styles.drawerItem}>
                Admin
              </Link>
            </li>
          )}
          <li>
            <Link href="/" className={styles.drawerItem}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/jobsearch" className={styles.drawerItem}>
              Job Search
            </Link>
          </li>
          <li>
            <Link href="/training" className={styles.drawerItem}>
              Training
            </Link>
          </li>
          <li>
            <Link href="/mission" className={styles.drawerItem}>
              Mission
            </Link>
          </li>
          <li>
            <Link href="/mysearches" className={styles.drawerItem}>
              My Searches
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
