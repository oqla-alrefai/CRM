import styles from '../styles/Gallery.module.css';

export default function Gallery() {
  return (
    <div className={styles.gallery}>
      <h2>Gallery</h2>
      <div className={styles.images}>
        {/* Example images */}
        <img src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Event 1" />
        <img src="https://images.unsplash.com/photo-1604134967494-8a9ed3adea0d?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNjaG9vbHxlbnwwfHwwfHx8MA%3D%3D" alt="Event 2" />
      </div>
    </div>
  );
}
