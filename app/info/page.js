'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../components/Layout';
import Button from '../components/Button';
import styles from './info.module.css';
import Logo from '../components/logo';
import Image from 'next/image';

export default function InfoPage() {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const proceedToUpload = () => {
    if (isChecked) router.push('/upload');
  };

  return (
    <>
      <div className={styles.infoPage}>
        <header className={styles.header}>
          <Logo color="red" />
        </header>
        <Layout
          heading="INFO"
          headingColor="#C1363C"
          middleContent={
            <div className={styles.contentWrapper}>
              <div className={styles.text}>
                This AI-based experience has been fully built by LIGANOVA internally and showcases our AI capabilities.
                The technology is experimental! While guided by rules, please understand that the AI has creative freedom
                within the images. Enjoy the experience and have a pleasant XMAS time.
              </div>
              <Image src="/InfoDontShareIcon.svg" alt="Dont share this App" width={200} height={200} />
              <div className={styles.checkboxWrapper}>
                <input
                  type="checkbox"
                  id="termsCheckbox"
                  onChange={(e) => setIsChecked(e.target.checked)}
                  className={styles.checkbox}
                />
                <label htmlFor="termsCheckbox" className={styles.checkboxLabel}>
                  By clicking the button I agree to the{' '}
                  <span
                    className={styles.termsLink}
                    onClick={() => setShowPopup(true)}
                  >
                    Terms and Conditions & Privacy Policy
                  </span>
                </label>
              </div>
            </div>
          }
        >
          <Button onClick={proceedToUpload} disabled={!isChecked}>
            Continue
          </Button>
        </Layout>
      </div>

      {showPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <div className={styles.popupHeader}>
              <Image
                src="/InfoCloseIcon.svg"
                alt="Close"
                width={24}
                height={24}
                className={styles.closeIcon}
                onClick={() => setShowPopup(false)}
              />
            </div>
            <div className={styles.popupBody}>
                <h2>Terms and Conditions & Privacy Policy</h2>
                <div>
                  <p className={styles.numbered}>1. Introduction</p>
                  <p>
                    These Terms and Conditions govern your use of the AI Time Machine – Ciao Natale App (the `&quot;`App`&quot;`). By using the App, 
                    you agree to be bound by these Terms and Conditions and the accompanying Privacy Policy.
                  </p>

                  <p className={styles.numbered}>2. Image Upload</p>
                  <p>
                    You grant LIGANOVA GmbH (`&quot;`we`&quot;`, `&quot;`us`&quot;`, `&quot;`our`&quot;`) Herdweg 59, 70178 Stuttgart a non-exclusive, worldwide, royalty-free 
                    license to upload, store, process, and display your images (`&quot;`the Images`&quot;`) on our servers for AI image editing. 
                    This editing includes the creation of AI-generated selfies that reinterpret your image.
                  </p>

                  <p className={styles.numbered}>3. Third-Party Services</p>
                  <p>
                    Replicate.com: We use Replicate.com (`&quot;`Replicate`&quot;`), a third-party service, to perform the AI image editing. 
                    By using the App, you agree to Replicates terms of use and privacy policies, which can be found at 
                    <a href="https://replicate.com/terms" target="_blank" rel="noopener noreferrer"> Replicate Terms</a> and 
                    <a href="https://replicate.com/privacy" target="_blank" rel="noopener noreferrer"> Replicate Privacy</a>.
                  </p>
                  <p>
                    Netlify: The App and its associated data are hosted by Netlify. By using the App, you agree to Netlify`&lsquo;`s terms 
                    of use and privacy policies, which can be found at 
                    <a href="https://www.netlify.com/legal/terms-of-use/" target="_blank" rel="noopener noreferrer"> Netlify Terms
                    </a> and 
                    <a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer"> Netlify Privacy
                    </a>.
                  </p>

                  <p className={styles.numbered}>4. Image Storage and Use</p>
                  <p>
                    Your uploaded images and the connected AI creations are stored on Replicates servers for one hour after processing 
                    and then deleted completely.
                  </p>
                  <ul>
                    <li>
                      The uploaded and outputted images are stored within the application itself, hosted on Netlify and within an encrypted 
                      database until app deletion.
                    </li>
                    <li>
                      LIGANOVA stores copies of the image sets indefinitely to improve service quality, accessed only by authorized personnel.
                    </li>
                  </ul>
                  <p>
                    If you want to opt-out of this, please contact us using the information provided below.
                  </p>

                  <p className={styles.numbered}>5. Data Collection</p>
                  <p>
                    We do not collect any personal information, such as IP addresses, device information, or identifying usage data.
                  </p>

                  <p className={styles.numbered}>6. Data Subject Rights</p>
                  <ul>
                    <li>You can request access to the personal data we hold about you.</li>
                    <li>You can request that we correct any inaccurate or incomplete personal data.</li>
                    <li>You can request the deletion of your personal data.</li>
                    <li>You can request a copy of your personal data in a commonly used format.</li>
                    <li>
                      You can object to the processing of your personal data based on legitimate interests or for direct marketing purposes.
                    </li>
                  </ul>

                  <p className={styles.numbered}>7. Data Security</p>
                  <p>
                    We implement appropriate technical and organizational measures to protect your personal data against unauthorized access.
                  </p>

                  <p className={styles.numbered}>8. Intellectual Property Rights</p>
                  <p>
                    You retain all ownership rights to your Images. We do not claim any ownership of your Images.
                  </p>

                  <p className={styles.numbered}>9. Limitation of Liability</p>
                  <p>
                    We are not liable for any loss or damage arising from the use of Replicate or Netlify.
                  </p>

                  <p className={styles.numbered}>10. Indemnification</p>
                  <p>
                    You indemnify us and all third-party providers from any claims, losses, or damages arising from your use of the App.
                  </p>

                  <p className={styles.numbered}>11. Changes to Terms and Conditions</p>
                  <p>
                    We reserve the right to modify these Terms and Conditions at any time.
                  </p>

                  <p className={styles.numbered}>12. Governing Law</p>
                  <p>
                    These Terms and Conditions are governed by the laws of Germany.
                  </p>

                  <p className={styles.numbered}>13. Severability</p>
                  <p>
                    If any provision is held invalid, the remaining provisions remain in full force.
                  </p>

                  <p className={styles.numbered}>14. Contact Information</p>
                  <p>
                    If you have questions, please contact:<br />
                    <strong>LIGANOVA GmbH</strong><br />
                    Herdweg 59<br />
                    70178 Stuttgart<br />
                    Germany<br />
                    Email: jan.maier@liganova.com <br />
                    Attn: Creative AI Strategist <br />
                  </p>
                </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


