import { useDispatch } from 'react-redux';
import { selectStudent } from '../redux/slices/studentsSlice';
import styles from "../styles/StudentCard.module.css";

export default function StudentCard({ student }) {
  const dispatch = useDispatch();

  return (
    <div className={styles.card} onClick={() => dispatch(selectStudent(student))}>
      <img src={student.avatar || '/default-avatar.png'} alt="Student Avatar" className={styles.avatar} />
      <div className={styles.details}>
        <h3>{student.full_name_en || `${student.first_name} ${student.last_name}`}</h3>
        <p><strong>Caller:</strong> {student.caller_name || '—'}</p>
        <p><strong>Mobile:</strong> {student.mobile || '—'}</p>
        <p><strong>Action Taken:</strong> {student.action_taken || '—'}</p>
      </div>
    </div>
  );
}
