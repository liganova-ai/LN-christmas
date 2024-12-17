'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Image from 'next/image';
import styles from './result.module.css';

export default function ResultPage() {
  const router = useRouter();
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    const storedPrediction = localStorage.getItem('predictionResult');

    if (!storedPrediction) {
      alert('No prediction result found. Please restart.');
      router.push('/');
      return;
    }

    setPrediction(JSON.parse(storedPrediction));
  }, [router]);

  const handleRepeat = () => {
    router.push('/');
  };

  return (
    <Layout
      heading="CIAO BELLO/A"
      copyText=""
      middleContent={
        prediction && (
          <div className={styles.imageWrapper}>
            <Image
              src={prediction.output[prediction.output.length - 1]}
              alt="Generated Image"
              width={378}
              height={486}
              objectFit="cover"
            />
          </div>
        )
      }
    >
      <div className={styles.buttonContainer}>
        <Button>Download</Button>
        <Button onClick={handleRepeat}>Repeat</Button>
      </div>
    </Layout>
  );
}
