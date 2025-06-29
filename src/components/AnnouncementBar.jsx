import styles from '../styles/AnnouncementBar.module.css';

export default function AnnouncementBar() {
  return (
    <div className={styles.announcement}>
      <strong>Important:</strong> Registration is now open for the new academic year!
    </div>
  );
}
