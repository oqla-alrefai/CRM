import { Link } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';
import logo from "../assets/logo.png"
export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <img src={logo} className={styles.logo} alt="ISO SCHOOL" />
      <div className={styles.link}>
        <Link to="/">Home</Link>
        <Link to="/students">Students</Link>
        <Link to="/add-student">Add Student</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/achievements">Achievements</Link>
        <Link to="/programs">Programs</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/staff">Staff</Link>
        <Link to="/news">News</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Login</Link>

      </div>
    </nav>
  );
}
