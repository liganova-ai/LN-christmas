'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../components/Layout';
import Image from 'next/image';
import styles from './result.module.css';
import Logo from '../components/logo';
import { toPng } from 'html-to-image';

export default function ResultPage() {
  const router = useRouter();
  const [prediction, setPrediction] = useState(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const storedPrediction = localStorage.getItem('predictionResult');
    const uploadedImageId = localStorage.getItem('uploadedImageId'); // Retrieve uploaded image ID
    console.log('uploadedImageId:', uploadedImageId)

    if (!storedPrediction || !uploadedImageId) {
      alert('No prediction result or uploaded image found. Please restart.');
      router.push('/');
      return;
    }

    const predictionData = JSON.parse(storedPrediction);
    setPrediction(predictionData);

    // Save generated image to the database
    const saveGeneratedImage = async () => {
      try {
        const generatedImage = predictionData.output[predictionData.output.length - 1]; // Final generated image
        await fetch(`/.netlify/functions/save_image`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: uploadedImageId, generatedImage }),
        });
      } catch (error) {
        console.error('Error updating generated image:', error);
        alert('Failed to save generated image to the database.');
      }
    };

    saveGeneratedImage();
  }, [router]);

  const handleRepeat = () => {
    router.push('/');
  };

  const handleDownload = async () => {
    if (imageRef.current) {
      try {
        const wrapper = imageRef.current.getBoundingClientRect(); // Get actual dimensions
        const aspectRatio = wrapper.width / wrapper.height;

        const canvasWidth = 896; // Base width for high resolution
        const canvasHeight = canvasWidth / aspectRatio; // Maintain aspect ratio

              // Safari workaround: call toPng three times
        let dataUrl;
        for (let i = 0; i < 3; i++) {
          dataUrl = await toPng(imageRef.current, {
            canvasWidth,
            canvasHeight,
          });
        }
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'xmas24-ai-timemachine.png';
        link.click();
      } catch (error) {
        console.error('Error generating image:', error);
        alert('An error occurred while generating the image.');
      }
    }
  };
  

  return (
    <div className={styles.resultPage}>
      <header className={styles.header}>
        <Logo color="pink" />
      </header>

      <Layout
        heading="CIAO BELLO"
        headingColor="#DE75A5"
        copyText=""
        middleContent={
          prediction && (
            <div className={styles.imageWrapper} ref={imageRef}>
              <Image
                src={prediction.output[prediction.output.length - 1]}
                alt="Generated Image"
                width={896}
                height={1152}
                objectFit="cover"
                className={styles.generatedImage}
              />
              <Image
                src="/Photo_Frame_Overlay.svg"
                alt="Overlay"
                layout="fill"
                objectFit="contain"
                className={styles.overlay}
              />
            </div>
          )
        }
      >
        <div className={styles.buttonContainer}>
          <button className={styles.customButton} onClick={handleDownload}>
            Download
          </button>
          <button className={styles.customButton} onClick={handleRepeat}>
            Repeat
          </button>
        </div>
      </Layout>
    </div>
  );
}
