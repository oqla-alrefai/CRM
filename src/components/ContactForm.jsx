import styles from '../styles/ContactForm.module.css';

export default function ContactForm() {
  return (
    <form className={styles.contactForm}>
      <h2>Contact Us</h2>
      <input placeholder="Your Name" />
      <input placeholder="Email" />
      <textarea placeholder="Message"></textarea>
      <button type="submit">Send</button>
    </form>
  );
}
