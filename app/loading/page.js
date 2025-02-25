'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../components/Layout';
import styles from './loading.module.css';
import Logo from '../components/logo';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function LoadingPage() {
  const router = useRouter();
  const [error, setError] = useState(false);

  useEffect(() => {
    const predictionId = localStorage.getItem('predictionId');

    if (!predictionId) {
      alert('Prediction ID not found. Please restart.');
      router.push('/');
      return;
    }

    const fetchPrediction = async () => {
      try {
        let response = await fetch(`/api/predictions/${predictionId}`);
        let prediction = await response.json();

        while (prediction.status !== 'succeeded' && prediction.status !== 'failed') {
          await sleep(1000);
          response = await fetch(`/api/predictions/${predictionId}`);
          prediction = await response.json();
        }

        if (prediction.status === 'succeeded') {
          localStorage.setItem('predictionResult', JSON.stringify(prediction));
          router.push('/result'); // Go to the results page
        } else {
          alert('Image generation failed. Please try again.');
          router.push('/');
        }
      } catch (err) {
        console.error('Error fetching prediction:', err);
        setError(true);
        alert('An error occurred. Please restart.');
        router.push('/');
      }
    };

    fetchPrediction();
  }, [router]);

  return (
    <div className={styles.loadingPage}>
      <header className={styles.header}>
        <Logo color="yellow"/> 
      </header>
    <Layout
      heading="UN MOMENTO PER FAVORE"
      headingColor='#DE75A5'
      copyText="Traveling back to the 80s..."
      copyTextColor='#DE75A5'
      middleContent={
        <div className={styles.loaderWrapper}>
          <div className={styles.loader}></div>
        </div>
      }
    />
    </div>
  );
}
