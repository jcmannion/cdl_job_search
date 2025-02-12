import React from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar'; 
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      
      <div className={styles.container}>
        <img
          src="https://i.pinimg.com/originals/f2/c6/cf/f2c6cf708e8168c6e0a1ed757f96cbd0.png"
          alt="Logo"
          className={styles.image}
        />
        <h1 className={styles.title}>Looking for a Career!</h1>
        <p className={styles.introText}>
          Welcome to our app! Find the best job opportunities and start your career today. Explore jobs, training, and more.
        </p>
        <Link href="/jobsearch" className={styles.buttonText}>
          Start Job Search
        </Link>
      </div>
    </div>
  );
};

export default Home;
