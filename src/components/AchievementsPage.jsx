import { useSelector } from 'react-redux';
import styles from '../styles/AchievementsPage.module.css';

export default function AchievementsPage() {
  const achievements = useSelector(state => state.achievements.achievements); // Array of objects
  return (
    <div className={styles.achievements}>
      <h2>Student Achievements</h2>
      {["IT", "BUSINESS", "ENGINEERING", "ART & DESIGN"].map(major => (
        <div key={major} className={styles.section}>
          <h3>{major}</h3>
          <ul>
            {achievements
              .filter(a => a.major === major)
              .map((a, idx) => (
                <li key={idx}>{a.title} – {a.studentName}</li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
