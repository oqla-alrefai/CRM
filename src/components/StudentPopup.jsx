import styles from "../styles/StudentPopup.module.css";

export default function StudentPopup({ student, onClose }) {
  if (!student) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>
        <h2>{student.student_name || "Student Details"}</h2>
        <ul>
          <li><strong>Caller Name:</strong> {student.caller_name}</li>
          <li><strong>Contact Type:</strong> {student.contact_type}</li>
          <li><strong>Contact Officer:</strong> {student.contact_officer}</li>
          <li><strong>Class Level:</strong> {student.student_class_level}</li>
          <li><strong>Residence Area:</strong> {student.residence_area}</li>
          <li><strong>Previous School:</strong> {student.previous_school}</li>
          <li><strong>Interview Date:</strong> {student.interview_date}</li>
          <li><strong>Interview Time:</strong> {student.interview_time}</li>
          <li><strong>Interview Location:</strong> {student.interview_location}</li>
          <li><strong>Action Taken:</strong> {student.action_taken}</li>
          <li><strong>Phone Number:</strong> {student.contact_phone_number}</li>
          <li><strong>Notes:</strong> {student.notes}</li>
        </ul>
      </div>
    </div>
  );
}
