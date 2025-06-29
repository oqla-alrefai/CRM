import styles from '../styles/QuickApply.module.css';

export default function QuickApply() {
  return (
    <form className={styles.quickApply}>
      <h2>Quick Apply</h2>
      <input placeholder="Student Name" />
      <input placeholder="Phone" />
      <button type="submit">Submit</button>
    </form>
  );
}
