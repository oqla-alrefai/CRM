// src/components/StudentList.jsx
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  selectStudent,
  deleteStudent,
} from "../redux/slices/studentsSlice";
import Cookies from "js-cookie";
import styles from "../styles/StudentList.module.css";
import cardStyles from "../styles/StudentCard.module.css";
import StudentPopup from "./StudentPopup";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createPortal } from "react-dom";

export default function StudentList() {
  const dispatch = useDispatch();
  const { students: rawStudents, loading, error } = useSelector(
    (state) => state.students
  );
  const { user } = useSelector((state) => state.auth);
  
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      dispatch(fetchStudents());
    }
  }, [dispatch]);

  const students = useMemo(() => {
    if (!Array.isArray(rawStudents)) return [];
    if (rawStudents.length === 1 && Array.isArray(rawStudents[0])) {
      return rawStudents[0];
    }
    return rawStudents.flat();
  }, [rawStudents]);

  const handleDelete = (studentId) => {
    dispatch(deleteStudent(studentId)).then((action) => {
      if (deleteStudent.fulfilled.match(action)) {
        toast.success("Student deleted successfully");
      } else {
        toast.error("Failed to delete student");
      }
    });
    setConfirmDeleteId(null);
  };

  if (loading) return <div>Loading students...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!students.length) return <div>No students found.</div>;

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


  return (
    <div className={styles.listContainer}>
      <div className={styles.list}>
        {students.map((student) => {
          
          const canDelete =
            user?.is_superuser || user?.username === student?.created_by;
          
          
          return (
            <div
              className={cardStyles.card}
              key={student.id}
              onClick={() => setSelectedStudent(student)}
            >
              <div className={cardStyles.avatar}>
                {getInitials(student.caller_name, student.last_name)}
              </div>

              <div className={cardStyles.details}>
                <div className={styles.details}>
                  <h3>{student.student_name || `${student.caller_name} `}</h3>
                  <p><strong>Caller:</strong> {student.caller_name || '—'}</p>
                  <p><strong>Mobile:</strong> {student.contact_phone_number || '—'}</p>
                  <p><strong>Action Taken:</strong> {student.action_taken || '—'}</p>
                </div>
                {canDelete && (
                  <button
                    className={styles.deleteButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmDeleteId(student.id);
                      dispatch(deleteStudent(student.id));
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
        {selectedStudent && (
          <StudentPopup
            student={selectedStudent}
            onClose={() => setSelectedStudent(null)}
          />
        )}
      </div>

      {confirmDeleteId &&
        createPortal(
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <p>Are you sure you want to delete this student?</p>
              <div className={styles.modalActions}>
                <button
                  className={styles.cancelButton}
                  onClick={() => setConfirmDeleteId(null)}
                >
                  Cancel
                </button>
                <button
                  className={styles.confirmButton}
                  onClick={() => handleDelete(confirmDeleteId)}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

function getInitials(first = "", last = "") {
  const f = first?.[0]?.toUpperCase() || "";
  const l = last?.[0]?.toUpperCase() || "";
  return f + l || "?";
}
