// File: src/components/NotFound/NotFound.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/NotFound.module.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.illustration}>
          <div className={styles.greenDecor}>
            <div className={styles.greenDots}>
              <div className={styles.dot1}></div>
              <div className={styles.dot2}></div>
              <div className={styles.dot3}></div>
            </div>
          </div>

          <div className={styles.text404}>
            <span className={styles.four}>4</span>
            <div className={styles.ghostWrapper}>
              <div className={styles.ghost}>
                <div className={styles.eyes}>
                  <div className={styles.eye}></div>
                  <div className={styles.eye}></div>
                </div>
                <div className={styles.mouth}></div>
              </div>
              <div className={styles.character}>
                <div className={styles.characterBody}>
                  <div className={styles.head}></div>
                  <div className={styles.hair}></div>
                  <div className={styles.torso}></div>
                  <div className={styles.armLeft}></div>
                  <div className={styles.armRight}></div>
                  <div className={styles.legLeft}></div>
                  <div className={styles.legRight}></div>
                </div>
              </div>
            </div>
            <span className={styles.four}>4</span>
          </div>
        </div>

        <div className={styles.textContent}>
          <h1 className={styles.title}>Page not found</h1>
          <p className={styles.description}>The page you want to go is not currently available</p>
        </div>

        <div className={styles.buttons}>
          <button onClick={() => navigate('/')} className={styles.primaryButton}>Home Page</button>
          <button onClick={() => navigate(-1)} className={styles.outlineButton}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
