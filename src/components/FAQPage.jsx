// src/components/FAQPage.jsx
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFAQs, createFAQ, deleteFaq } from "../redux/slices/faqSlice";
import styles from "../styles/FAQPage.module.css";
import { FaTrash } from "react-icons/fa";

export default function FAQPage() {
  const dispatch = useDispatch();
  const { faqs, loading, error } = useSelector((state) => state.faq);
  const { user } = useSelector((state) => state.auth);


  // Local state for the “add new FAQ” form
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  /* Fetch FAQs once on mount */
  useEffect(() => {
    dispatch(fetchFAQs());
  }, [dispatch]);

  /* Submit handler to create a new FAQ */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;
    dispatch(createFAQ({ question, answer }));
    setQuestion("");
    setAnswer("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      dispatch(deleteFaq(id));
    }
  };


  return (
    <div className={styles.faq}>
      <h2>Frequently Asked Questions</h2>

      {loading && <p>Loading FAQs…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && faqs.map((faq) => (
        <div key={faq.id} className={styles.item}>
          <strong>{faq.question}</strong>
          <p>{faq.answer}</p>
          {user?.is_superuser && (
            <button
              onClick={() => handleDelete(faq.id)}
              className={styles.deleteBtn}
            >
              <FaTrash />
            </button>
          )}
        </div>
      ))}

      {/* Optional form to add a new FAQ (requires valid access_token cookie) */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <textarea
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={4}
          required
        />
        <button type="submit">Add FAQ</button>
      </form>
    </div>
  );
}
