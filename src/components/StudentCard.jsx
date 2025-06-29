import { useDispatch } from 'react-redux';
import { selectStudent } from '../redux/slices/studentsSlice';
import styles from "../styles/StudentCard.module.css"

export default function StudentCard({ student }) {
  const dispatch = useDispatch();
  return (
    <div className={styles.card} onClick={() => dispatch(selectStudent(student))}>
      <img src={student.avatar || '/default-avatar.png'} alt="Student" />
      <div>
        <h3>{student.name}</h3>
        <p>{student.major}</p>
        <p>{student.achievement}</p>
      </div>
    </div>
  );
}
