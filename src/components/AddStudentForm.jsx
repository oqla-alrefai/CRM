import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStudent, clearAddSuccess } from "../redux/slices/studentsSlice";
import styles from "../styles/AddStudentForm.module.css";

// Helper to get current datetime-local formatted string
const getNowAsDatetimeLocal = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
};

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
    program: "IT", // default
    visit_location: "",
    visit_date: getNowAsDatetimeLocal(), // default
    student_grade: "",
    previous_school: "",
    interviewer: "",
    action_taken: ""
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
    const [datePart, timePart] = form.visit_date?.split("T") || [];
    const payload = {
      contact_officer: form.interviewer,
      contact_type: form.call_type || "",
      caller_name: form.caller_name,
      student_name: form.first_name || "",
      student_class_level: form.which_class || "",
      residence_area: form.location || "",
      previous_school: form.previous_school || "",
      interview_date: datePart || "",
      interview_time: timePart || "",
      interview_location: form.visit_location || "",
      action_taken: form.action_taken || "",
      contact_phone_number: form.mobile || "",
      notes: form.notes || "",
    };
    dispatch(addStudent(payload)).then((action) => {
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
          program: "IT",
          visit_location: "",
          visit_date: getNowAsDatetimeLocal(),
          student_grade: "",
          previous_school: "",
          interviewer: "",
          action_taken: ""
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
            <input name="first_name" placeholder="Student Name" value={form.first_name} onChange={handleChange} />
            <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
            <input name="gender" placeholder="Gender" value={form.gender} onChange={handleChange} />
          </div>
        )}

        {slide === 2 && (
          <div className={styles.slide}>
            <input name="which_class" placeholder="Which Class" value={form.which_class} onChange={handleChange} />
            <input name="interests" placeholder="Interests" value={form.interests} onChange={handleChange} />
            <input name="how_you_heard" placeholder="How did you hear about us?" value={form.how_you_heard} onChange={handleChange} />
            <textarea name="notes" placeholder="Interviewer Notes" value={form.notes} onChange={handleChange} />
            <input name="interviewer" placeholder="Interviewer Name" value={form.interviewer} onChange={handleChange} />
            <input name="action_taken" placeholder="Action Taken" value={form.action_taken} onChange={handleChange} />
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
