import { useSelector } from "react-redux";
import styles from "../styles/StaffPage.module.css";

export default function StaffPage() {
  const staff = useSelector((state) => state.staff.staff);

  return (
    <div className={styles.staff}>
      <h2>Meet Our Staff</h2>
      <ul>
        {staff.map((s) => (
          <li key={s.id} className={styles.staffItem}>
            <strong>{s.name}</strong> - {s.position}
            <div>{s.bio}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
