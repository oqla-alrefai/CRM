import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';
import logo from "../assets/logo.png";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.navHeader}>
        <img src={logo} className={styles.logo} alt="ISO SCHOOL" />
        <button className={styles.menuBtn} onClick={toggleMenu}>
          {showMenu ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <div className={`${styles.link} ${showMenu ? styles.show : ''}`}>
        <Link to="/" onClick={() => setShowMenu(false)}>Home</Link>
        <Link to="/students" onClick={() => setShowMenu(false)}>Students</Link>
        <Link to="/add-student" onClick={() => setShowMenu(false)}>Add Student</Link>
        <Link to="/faq" onClick={() => setShowMenu(false)}>FAQ</Link>
        <Link to="/achievements" onClick={() => setShowMenu(false)}>Achievements</Link>
        <Link to="/programs" onClick={() => setShowMenu(false)}>Programs</Link>
        <Link to="/gallery" onClick={() => setShowMenu(false)}>Gallery</Link>
        <Link to="/staff" onClick={() => setShowMenu(false)}>Staff</Link>
        <Link to="/news" onClick={() => setShowMenu(false)}>News</Link>
        <Link to="/contact" onClick={() => setShowMenu(false)}>Contact</Link>
        <Link to="/login" onClick={() => setShowMenu(false)}>Login</Link>
        <Link to="/Dashboard" onClick={() => setShowMenu(false)}>Dashboard</Link>
      </div>
    </nav>
  );
}
