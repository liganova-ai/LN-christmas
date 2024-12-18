"use client";

import { useState, useEffect } from 'react';
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

  const correctPassword = process.env.NEXT_PUBLIC_APP_PASSWORD;

  useEffect(() => {
    // Check if the user has previously entered the password
    const accessFlag = localStorage.getItem("hasAccess");
    if (accessFlag === "true") {
      setHasAccess(true);
    }
  }, []); // Runs only once on page load

  const handlePasswordSubmit = () => {
    if (password === correctPassword) {
      setHasAccess(true);
      localStorage.setItem("hasAccess", "true");
      setError(""); // Clear any error messages
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  if (!hasAccess) {
    return (
      <div className={styles.homePage}>
        <header className={styles.header}>
          <Logo color="yellow" />
        </header>
        <div className={styles.content}>
        <div className={styles.textContainerWrapper}>
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
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.passwordInput}
            />
            <p className={styles.copyText}>
              Please enter the password printed on the posters.
            </p>
            {error && <p className={styles.errorText}>{error}</p>}
          </div>
          </div>
          <div className={styles.buttonContainer}>
              <Button onClick={handlePasswordSubmit}>Submit</Button>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.homePage}>
      <header className={styles.header}>
        <Logo color="yellow" />
      </header>
      <div className={styles.content}>
      <div className={styles.textContainerWrapper}>
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
        </div>
        <div className={styles.buttonContainer}>
          <Button onClick={() => router.push('/info')}>Continue</Button>
        </div>
      </div>
    </div>
  );
}
