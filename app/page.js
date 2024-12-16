"use client";

import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import Button from './components/Button';
import Logo from './components/logo';
import Image from 'next/image';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className={styles.homePage}>
      <header className={styles.header}>
        <Logo color="yellow"/> 
      </header>
      <div className={styles.content}>
        <div className={styles.textContainer}>
            <div className={styles.headingContainer}>
          <div className={styles.imageWrapper}>
            <Image 
              src="/Title_Graphic.svg" 
              alt="Title Graphic" 
              className={styles.headingImage} 
              fill 
              priority 
            />
          </div>
        </div>
        <p className={styles.copyText}>
          Dive into the world of AI-generated visuals with our very italian 80s image generator.
        </p>
        </div> 
        <div className={styles.buttonContainer}>
        <Button onClick={() => router.push('/info')}>Photo e basta</Button>
        
        </div>
        </div>
      </div>
  );
}
