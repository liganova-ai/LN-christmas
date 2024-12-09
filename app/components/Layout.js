// components/Layout.js
import Image from 'next/image';
import styles from './Layout.module.css';
import logo from '../../public/logo-left.png'; // Ensure this is the path to your uploaded logo

export default function Layout({ heading, copyText, children, isFirstPage }) {
  return (
    <div className={`${styles.layout} ${isFirstPage ? styles.firstPage : ''}`}>
      {/* Logo */}
      <header className={styles.header}>
        <Image src={logo} alt="Logo" className={styles.logo} />
      </header>

      {/* Main Content */}
      <div className={styles.content}>
        {/* Left Section */}
        <div className={styles.leftSection}>
          <h1 className={styles.heading}>{heading}</h1>
          <p className={styles.copyText}>{copyText}</p>
        </div>

        {/* Right Section */}
        <div className={styles.rightSection}>{children}</div>
      </div>
    </div>
  );
}
