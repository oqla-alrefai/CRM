// src/components/AddStudentForm.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStudent, clearAddSuccess } from "../redux/slices/studentsSlice";
import styles from "../styles/AddStudentForm.module.css";

export default function AddStudentForm() {
  const dispatch = useDispatch();
  const { loading, error, addSuccess } = useSelector((state) => state.students);

  const [slide, setSlide] = useState(1);

  const now = new Date().toISOString().slice(0, 16); // yyyy-MM-ddThh:mm

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
    program: "IT",
    visit_location: "",
    visit_date: "",
    visit_time: "",
    student_grade: "",
    previous_school: "",
    interviewer: "",
    action_taken: "",
    other_location: ""
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
    const finalVisitLocation = form.visit_location === "أخرى" ? form.other_location : form.visit_location;

    const payload = {
      contact_officer: form.interviewer,
      contact_type: form.call_type || "",
      caller_name: form.caller_name,
      student_name: form.first_name || "",
      gender: form.gender || "",
      interests: form.interests || "",
      how_you_heard: form.how_you_heard || "",
      program: form.program || "",
      student_grade: form.student_grade || "",

      student_class_level: form.which_class || "",
      residence_area: form.location || "",
      previous_school: form.previous_school || "",
      interview_date: form.visit_date || "",
      interview_time: form.visit_time || "",
      interview_location: finalVisitLocation || "",
      action_taken: form.action_taken || "",
      contact_phone_number: form.mobile || "",
      notes: form.notes || "",
    };
    dispatch(addStudent(payload)).then((action) => {
      if (addStudent.fulfilled.match(action)) {
        setForm((prev) => ({
          ...prev,
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
          visit_date: "",
          visit_time: "",
          student_grade: "",
          previous_school: "",
          interviewer: "",
          action_taken: "",
          other_location: ""
        }));
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
            <select name="gender" value={form.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        )}

        {slide === 2 && (
          <div className={styles.slide}>
            <select name="which_class" value={form.which_class} onChange={handleChange} >
              <option value="">Select Class Level</option>
              <option value="تاسع ****">تاسع ****</option>
              <option value="عاشر(يمكن إذا كان من برامج دولية / مراجعة الوزارة واحضار استثناء / إعادة الصف)">(يمكن إذا كان من برامج دولية / مراجعة الوزارة واحضار استثناء / إعادة الصف)عاشر...</option>
              <option value="أول ثانوي (إعادة الصفوف)">أول ثانوي (إعادة الصفوف)</option>
              <option value="روضة - ابتدائي (رقم مس خلود أبوحاكمة 0797465711 )">روضة - ابتدائي (رقم مس خلود أبوحاكمة 0797465711 )</option>
              <option value="أساسي -   MYP  (رقم مس خلود أبوحجلة 0799391567  - أ حسان أبو اصبع 0796845271 )">أساسي - MYP(رقم مس خلود أبوحجلة 0799391567  - أ حسان أبو اصبع 0796845271 )</option>
              <option value="ثانوي أكاديمي (رقم د.سائد 0796880606 )">ثانوي أكاديمي ثانوي أكاديمي (رقم د.سائد 0796880606 )</option>
              <option value="وليّ أمر سابق">وليّ أمر سابق</option>
              <option value="ثامن - للسنة القادمة">ثامن - للسنة القادمة</option>
              <option value="لم يتم الرد">لم يتم الرد</option>
              <option value="استفسار عن ايفنت">استفسار عن ايفنت</option>
              <option value="غير مهتم">غير مهتم</option>
            </select>
            <input name="interests" placeholder="Interests" value={form.interests} onChange={handleChange} />
            <input name="how_you_heard" placeholder="How did you hear about us?" value={form.how_you_heard} onChange={handleChange} />
            <textarea name="notes" placeholder="Interviewer Notes" value={form.notes} onChange={handleChange} />
            <select name="interviewer" value={form.interviewer} onChange={handleChange} required>
              <option value="">Select Interviewer</option>
              <option value="أوس العمري">أوس العمري</option>
              <option value="شهد الصغيّر">شهد الصغيّر</option>
              <option value="أمل الجلّاد">أمل الجلّاد</option>
            </select>
            <select name="action_taken" value={form.action_taken} onChange={handleChange} required>
              <option value="">Select Action Taken</option>
              <option value="إحالته إلى القسم المختص (روضة / ثانوي ..... )">إحالته إلى القسم المختص...</option>
              <option value="تحديد موعد زيارة - متابعة***">تحديد موعد زيارة - متابعة***</option>
              <option value="تسجيل مباشر / حجز مقعد - متابعة***">تسجيل مباشر / حجز مقعد - متابعة***</option>
              <option value="بحاجة لمتابعة (بيانات اضافية) - لسا بفكر - متابعة***">بحاجة لمتابعة...</option>
              <option value="غير مهتم">غير مهتم</option>
              <option value="الاجابة عن الاستفسار وكفى">الاجابة عن الاستفسار وكفى</option>
              <option value="لم يتم الرد">لم يتم الرد</option>
            </select>
          </div>
        )}

        {slide === 3 && (
          <div className={styles.slide}>
            <select name="program" value={form.program} onChange={handleChange}>
              <option value="IT">IT</option>
              <option value="Engineering">Engineering</option>
              <option value="Business">Business</option>
              <option value="Art and Design">Art and Design</option>
            </select>
            <select name="visit_location" value={form.visit_location} onChange={handleChange} >
              <option value="">Select Visit Location</option>
              <option value="ايزو 4">ايزو 4</option>
              <option value="ايزو 5">ايزو 5</option>
              <option value="أخرى">أخرى</option>
            </select>
            {form.visit_location === "أخرى" && (
              <input
                name="other_location"
                placeholder="Enter custom location"
                value={form.other_location}
                onChange={handleChange}
              />
            )}
            <input type="date" name="visit_date" value={form.date} onChange={handleChange} />
            <input type="time" name="visit_time" value={form.time} onChange={handleChange} />
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
