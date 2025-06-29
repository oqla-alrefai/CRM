import styles from "../styles/StudentPopup.module.css";

export default function StudentPopup({ student, onClose }) {
  if (!student) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>
        <h2>{student.first_name} {student.last_name}</h2>
        <ul>
          <li><strong>Mobile:</strong> {student.mobile}</li>
          <li><strong>Phone:</strong> {student.phone}</li>
          <li><strong>Occupation:</strong> {student.occupation}</li>
          <li><strong>City:</strong> {student.city}</li>
          <li><strong>Region:</strong> {student.region}</li>
          <li><strong>Street:</strong> {student.street}</li>
          <li><strong>Address:</strong> {student.address}</li>
          <li><strong>How You Heard:</strong> {student.how_you_heard}</li>
        </ul>
      </div>
    </div>
  );
}
