import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStudent, clearAddSuccess } from "../redux/slices/studentsSlice";
import styles from "../styles/AddStudentForm.module.css";

export default function AddStudentForm() {
  const dispatch = useDispatch();
  const { loading, error, addSuccess } = useSelector((state) => state.students);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    mobile: "",
    phone: "",
    occupation: "",
    city: "",
    region: "",
    street: "",
    address: "",
    how_you_heard: "",
    isRegisterd: "",      // dropdown field
    interviewer: "",
    notes: "",
  });

  // Clear success message after a while
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addStudent(form)).then((action) => {
      if (addStudent.fulfilled.match(action)) {
        setForm({
          first_name: "",
          last_name: "",
          mobile: "",
          phone: "",
          occupation: "",
          city: "",
          region: "",
          street: "",
          address: "",
          how_you_heard: "",
          isRegisterd: "",
          interviewer: "",
          notes: "",
        });
      }
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} required />
      <input name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} required />
      <input name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} required />
      <input name="phone" placeholder="Parents' Number" value={form.phone} onChange={handleChange} />
      <input name="occupation" placeholder="Occupation" value={form.occupation} onChange={handleChange} />
      <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
      <input name="region" placeholder="Region" value={form.region} onChange={handleChange} />
      <input name="street" placeholder="Street" value={form.street} onChange={handleChange} />
      <input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
      <input name="how_you_heard" placeholder="How did you hear about us?" value={form.how_you_heard} onChange={handleChange} />

      <select name="isRegisterd" value={form.isRegisterd} onChange={handleChange} required>
        <option value="">Is Registered?</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>

      <input name="interviewer" placeholder="Interviewer" value={form.interviewer} onChange={handleChange} />
      <input name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} />

      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Student"}
      </button>

      {addSuccess && <div className={styles.success}>Student added successfully!</div>}
      {error && <div className={styles.error}>{error}</div>}
    </form>
  );
}
