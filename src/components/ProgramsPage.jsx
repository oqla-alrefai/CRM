import { useSelector } from "react-redux";
import styles from "../styles/ProgramsPage.module.css";

export default function ProgramsPage() {
  const programs = useSelector((state) => state.programs.programs);

  return (
    <div className={styles.programs}>
      <h2>Academic Programs</h2>
      <ul>
        {programs.map((p) => (
          <li key={p.id} className={styles.programItem}>
            <h3>{p.name}</h3>
            <p>{p.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
