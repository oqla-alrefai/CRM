// src/components/StudentList.jsx
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, selectStudent } from "../redux/slices/studentsSlice";
import Cookies from "js-cookie";
import styles from "../styles/StudentList.module.css";
import cardStyles from "../styles/StudentCard.module.css";
import { useState } from "react";
import StudentPopup from "./StudentPopup";



export default function StudentList() {
  const dispatch = useDispatch();
  const { students: rawStudents, loading, error } = useSelector(
    (state) => state.students
  );
  const [selectedStudent, setSelectedStudent] = useState(null);
  /* ─────────────────────────────────────────────────────────────
     1️⃣ Fetch students once on mount
  ──────────────────────────────────────────────────────────────*/
  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      dispatch(fetchStudents());
    }
  }, [dispatch]);

  /* ─────────────────────────────────────────────────────────────
     2️⃣ Normalise to a flat array.
        Some APIs return a nested structure like [[ {...}, ... ]]
  ──────────────────────────────────────────────────────────────*/
  const students = useMemo(() => {
    if (!Array.isArray(rawStudents)) return [];

    // If the first (and only) element is itself an array, unwrap it.
    if (rawStudents.length === 1 && Array.isArray(rawStudents[0])) {
      return rawStudents[0];
    }

    // Handle any accidental deeper nesting
    return rawStudents.flat();
  }, [rawStudents]);

  /* ─────────────────────────────────────────────────────────────
     3️⃣ Loading / error / empty states
  ──────────────────────────────────────────────────────────────*/
  if (loading) return <div>Loading students...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!students.length) return <div>No students found.</div>;

  // API might have returned an error object inside an array
  if (
    students.length === 1 &&
    (students[0]?.detail || students[0]?.code || students[0]?.messages)
  ) {
    return (
      <div style={{ color: "red" }}>
        {students[0].detail || "Unknown error"}
        {students[0].messages && (
          <ul>
            {students[0].messages.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  /* ─────────────────────────────────────────────────────────────
     4️⃣ Main render
  ──────────────────────────────────────────────────────────────*/
  return (
    <div className={styles.list}>
      {students.map((student) => (
        <div
          className={cardStyles.card}
          key={student.id}
          // onClick={() => dispatch(selectStudent(student))}
          onClick={() => setSelectedStudent(student)}

        >
          <div className={cardStyles.avatar}>
            {getInitials(student.full_name_en, student.last_name)}
          </div>

          <div className={cardStyles.details}>
            <h3>
              {student.full_name_en}
            </h3>
            <p>
              <strong>Desired Major:</strong> {student.desired_major}
            </p>
            <p>
              <strong>Interviewer:</strong> {student.interviewer_name}
            </p>
            <p>
              <strong>Guardian Mobile:</strong> {student.guardian_mobile}
            </p>
          </div>
        </div>
      ))}
      {selectedStudent && (
        <StudentPopup student={selectedStudent} onClose={() => setSelectedStudent(null)} />
      )}

    </div>

  );
}

/* ─────────────────────────────────────────────────────────────
   Helper: Convert first/last names to initials
─────────────────────────────────────────────────────────────*/
function getInitials(first = "", last = "") {
  const f = first?.[0]?.toUpperCase() || "";
  const l = last?.[0]?.toUpperCase() || "";
  return f + l || "?";
}
