import styles from '../styles/NewsAndEvents.module.css';

export default function NewsAndEvents() {
  return (
    <section className={styles.news}>
      <h2>News & Events</h2>
      <ul>
        <li>Science Fair - April 12</li>
        <li>Business Workshop - May 3</li>
      </ul>
    </section>
  );
}
