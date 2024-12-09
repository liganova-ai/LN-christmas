'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Image from 'next/image';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function ResultPage() {
  const router = useRouter();
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
        }
      } catch (err) {
        console.error('Error fetching prediction:', err);
        setError('An error occurred while fetching the prediction.');
        setLoading(false);
      }
    };

    fetchPrediction();
  }, [router]);

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
        <div className="image-wrapper"
>
          <Image
            src={prediction.output[prediction.output.length - 1]}
            alt="Generated image"
            width={378}
            height={486}
          />
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
