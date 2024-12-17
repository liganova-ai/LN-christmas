"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import Button from './components/Button';
import Logo from './components/logo';
import Image from 'next/image';

export default function HomePage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [hasAccess, setHasAccess] = useState(false);
  const [error, setError] = useState("");

 
  const correctPassword = process.env.NEXT_PUBLIC_APP_PASSWORD

  const handlePasswordSubmit = () => {
    if (password === correctPassword) {
      setHasAccess(true);
      setError(""); // Clear any error messages
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  // Render Password Overlay if user hasn't accessed the page yet
  if (!hasAccess) {
    return (
      <div className={styles.passwordOverlay}>
        <div className={styles.passwordModal}>
          <h2 className={styles.modalHeading}>Enter Password</h2>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.passwordInput}
          />
          {error && <p className={styles.errorText}>{error}</p>}
          <Button onClick={handlePasswordSubmit}>Submit</Button>
        </div>
      </div>
    );
  }

  // Main HomePage Content
  return (
    <div className={styles.homePage}>
      <header className={styles.header}>
        <Logo color="yellow" />
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
            Travel back to the 80s and create AI-generated images of yourself. Upload a selfie and choose between four different scenes. The AI will perform the magic.
          </p>
        </div>
        <div className={styles.buttonContainer}>
          <Button onClick={() => router.push('/info')}>Continue</Button>
        </div>
      </div>
    </div>
  );
}
