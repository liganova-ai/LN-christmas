'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function ResultPage() {
  const router = useRouter();
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

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

        while (
          prediction.status !== 'succeeded' &&
          prediction.status !== 'failed'
        ) {
          await sleep(1000);
          response = await fetch(`/api/predictions/${predictionId}`);
          prediction = await response.json();
        }

        setPrediction(prediction);

        if (prediction.status === 'failed') {
          setError('Prediction failed. Please try again.');
        }
      } catch (err) {
        console.error('Error fetching prediction:', err);
        setError('An error occurred while fetching the prediction.');
      }
    };

    fetchPrediction();
  }, [router]);

  return (
    <div className="result-page">
      <h1>Your AI-Generated Image</h1>

      {error && <div className="error-message">{error}</div>}

      {prediction ? (
        <>
          {prediction.status === 'succeeded' && prediction.output && (
            <div className="image-wrapper">
              <Image
                src={prediction.output[prediction.output.length - 1]}
                alt="Generated image"
                width={500}
                height={500}
              />
            </div>
          )}
          <p className="status-text">Status: {prediction.status}</p>
        </>
      ) : (
        <p>Generating your image... Please wait.</p>
      )}

      <button onClick={() => router.push('/')}>Restart</button>
    </div>
  );
}
