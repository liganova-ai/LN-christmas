"use client";

import { useRouter } from 'next/navigation';
import styles from './homepage.module.css';
import Button from './components/Button';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className={styles.homePage}>
      <header className={styles.header}>
        <img src="/logo-left.png" alt="Logo" className={styles.logo} /> {/* Adjust the logo path */}
      </header>

      <div className={styles.content}> 
      <div className={styles.leftSection}>
        <h1 className={styles.heading}>Already dreaming about whats next?</h1>
        <p className={styles.copyText}>
          Upload a selfie, choose your next travel destination and let the AI do the magic.
        </p>
        <div className={styles.buttonContainer}>
        <Button onClick={() => router.push('/upload')}>Start experience</Button>
        
        </div>
        </div>
      </div>
    </div>
  );
}
