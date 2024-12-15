"use client";

import { useRouter } from 'next/navigation';
import Layout from '../components/Layout';
import Button from '../components/Button';
import styles from './info.module.css';
import Logo from '../components/logo';

export default function InfoPage() {
  const router = useRouter();

  const proceedToUpload = () => {
    router.push('/upload');
  };

  return (
    <>
    <div className={styles.infoPage}> 
    <header className={styles.header}>
        <Logo color="red" />
      </header>
    <Layout
      heading="INFO"
      headingColor="#C1363C" // Red heading
      middleContent={
        <div>
          <div className={styles.text}> LIGANOVA is providing you an experimental AI service. It is important to see it as such and make sure that the link to this experience is not shared outside of the company. There is also no terms and conditions agreement needed as we are not saving the images within any database. Lucky for you. Enjoy your evening and have a pleasant XMAS time. </div>
        </div>
      }
    >
      <Button onClick={proceedToUpload}>Continue</Button>
    </Layout>
    </div>
    </>
  );
}
