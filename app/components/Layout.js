import Image from 'next/image';
import styles from './Layout.module.css';
import logo from '../../public/logo-left.png';

export default function Layout({ heading, copyText, children, rightContent }) {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Image src={logo} alt="Logo" className={styles.logo} />
      </header>

      <div className={styles.content}>
        {/* Left Section */}
        <div className={styles.leftSection}>
          <h1 className={styles.heading}>{heading}</h1>
          {copyText && <p className={styles.copyText}>{copyText}</p>}
          <div className={styles.buttonContainer}>{children}</div>
        </div>

        {/* Right Section */}
        <div className={styles.rightSection}>{rightContent}</div>
      </div>
    </div>
  );
}
