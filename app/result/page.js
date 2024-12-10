'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Image from 'next/image';
import styles from './result.module.css';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function ResultPage() {
  const router = useRouter();
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [textColor, setTextColor] = useState('white'); // Default text color

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

        setPrediction(prediction);
        setLoading(false);

        if (prediction.status === 'failed') {
          setError('Prediction failed. Please try again.');
        } else if (prediction.output) {
          analyzeImageColor(prediction.output[prediction.output.length - 1]);
        }
      } catch (err) {
        console.error('Error fetching prediction:', err);
        setError('An error occurred while fetching the prediction.');
        setLoading(false);
      }
    };

    fetchPrediction();
  }, [router]);

  const analyzeImageColor = async (imageUrl) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const context = canvas.getContext('2d');
      context.drawImage(img, 0, 0, img.width, img.height);

      const imageData = context.getImageData(0, 0, img.width, img.height).data;
      let totalBrightness = 0;

      for (let i = 0; i < imageData.length; i += 4) {
        const brightness = 0.299 * imageData[i] + 0.587 * imageData[i + 1] + 0.114 * imageData[i + 2];
        totalBrightness += brightness;
      }

      const averageBrightness = totalBrightness / (img.width * img.height);
      setTextColor(averageBrightness > 127 ? 'black' : 'white');
    };
  };

  const spinnerStyle = {
    width: '50px',
    height: '50px',
    border: '5px solid rgba(0, 0, 0, 0.1)',
    borderTop: '5px solid #E00019',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };

  const animationKeyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  const loadingContent = (
    <>
      <style>{animationKeyframes}</style>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <div style={spinnerStyle}></div>
      </div>
    </>
  );

  const resultContent = (
    <>
      {prediction && prediction.status === 'succeeded' && prediction.output && (
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <Image
              src={prediction.output[prediction.output.length - 1]}
              alt="Generated image"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className={styles.overlay} style={{ color: textColor }}>
            
            <div className={styles.textContainer}>
              <h1 className={styles.heading}>Welcome to your destination</h1>
              <p className={styles.copyText}>#dreamvacation</p>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <Layout
      heading={loading ? 'Please wait' : 'Your next vacation.'}
      copyText={loading ? 'Your image is currently processing. This may take up to 20 seconds.' : 'Share your image on socials with the hashtag #dreamvacation and link the Heinemann account to receive a 10% discount on all purchases.'}
      rightContent={loading ? loadingContent : resultContent}
    >
      {!loading && (
        <Button onClick={() => router.push('/')}>Restart Experience</Button>
      )}
    </Layout>
  );
}
