// src/components/AddStudentForm.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStudent, clearAddSuccess } from "../redux/slices/studentsSlice";
import styles from "../styles/AddStudentForm.module.css";

export default function AddStudentForm() {
  const dispatch = useDispatch();
  const { loading, error, addSuccess } = useSelector((state) => state.students);

  const [slide, setSlide] = useState(1);

  const [form, setForm] = useState({
    caller_name: "",
    call_type: "Outgoing",
    which_class: "",
    gender: "",
    interests: "",
    location: "",
    first_name: "",
    mobile: "",
    how_you_heard: "",
    notes: "",
    program: "",
    visit_location: "",
    student_grade: "",
    previous_school: "",
  });

  useEffect(() => {
    if (addSuccess) {
      const timer = setTimeout(() => {
        dispatch(clearAddSuccess());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [addSuccess, dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const totalSlides = 3;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addStudent(form)).then((action) => {
      if (addStudent.fulfilled.match(action)) {
        setForm({
          caller_name: "",
          call_type: "Outgoing",
          which_class: "",
          gender: "",
          interests: "",
          location: "",
          first_name: "",
          mobile: "",
          how_you_heard: "",
          notes: "",
          program: "",
          visit_location: "",
          student_grade: "",
          previous_school: "",
        });
        setSlide(1);
      }
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>

      <div className={styles.slider}>
        {slide === 1 && (
          <div className={styles.slide}>
            <div className={styles.callTypeToggle}>
              <button
                type="button"
                className={form.call_type === "Outgoing" ? styles.active : ""}
                onClick={() => setForm({ ...form, call_type: "Outgoing" })}
              >
                Outgoing Call
              </button>
              <button
                type="button"
                className={form.call_type === "Incoming" ? styles.active : ""}
                onClick={() => setForm({ ...form, call_type: "Incoming" })}
              >
                Incoming Call
              </button>
            </div>
            <input name="caller_name" placeholder="Caller Name" value={form.caller_name} onChange={handleChange} required />
            <input name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} />
            <input name="first_name" placeholder="Student Name" value={form.first_name} onChange={handleChange} required />
            <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
            <input name="gender" placeholder="Gender" value={form.gender} onChange={handleChange} required />
          </div>
        )}

        {slide === 2 && (
          <div className={styles.slide}>
            <input name="which_class" placeholder="Which Class" value={form.which_class} onChange={handleChange} required />
            <input name="interests" placeholder="Interests" value={form.interests} onChange={handleChange} required />
            <input name="how_you_heard" placeholder="How did you hear about us?" value={form.how_you_heard} onChange={handleChange} />
            <textarea name="notes" placeholder="Interviewer Notes" value={form.notes} onChange={handleChange} />
          </div>
        )}

        {slide === 3 && (
          <div className={styles.slide}>
            <select name="program" value={form.program} onChange={handleChange}>
              <option value="">Select Program</option>
              <option value="IT">IT</option>
              <option value="Engineering">Engineering</option>
              <option value="Business">Business</option>
              <option value="Art and Design">Art and Design</option>
            </select>
            <input name="visit_location" placeholder="Visit Location" value={form.visit_location} onChange={handleChange} />
            <input type="datetime-local" name="visit_date" placeholder="Visit date" value={form.visit_date} onChange={handleChange} />
            <input name="student_grade" placeholder="Student Grade" value={form.student_grade} onChange={handleChange} />
            <input name="previous_school" placeholder="Previous School" value={form.previous_school} onChange={handleChange} />
          </div>
        )}
      </div>

      <div className={styles.navButtons}>
        {slide > 1 && <button type="button" onClick={() => setSlide(slide - 1)}>Back</button>}
        {slide < totalSlides && (
          <button type="button" onClick={() => setSlide(slide + 1)}>
            {slide + 1}
          </button>
        )}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Form"}
      </button>

      {addSuccess && <div className={styles.success}>Student added successfully!</div>}
      {error && <div className={styles.error}>{error}</div>}
    </form>
  );
}
