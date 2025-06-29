import styles from '../styles/Gallery.module.css';

export default function Gallery() {
  return (
    <div className={styles.gallery}>
      <h2>Gallery</h2>
      <div className={styles.images}>
        {/* Example images */}
        <img src="/gallery1.jpg" alt="Event 1" />
        <img src="/gallery2.jpg" alt="Event 2" />
      </div>
    </div>
  );
}
