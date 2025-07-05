import { useEffect, useState } from "react";
import styles from "../styles/NewsAndEvents.module.css";

const events = [
  {
    id: 1,
    name: "Science Fair 2025",
    datetime: "April 15, 2025 – 10:00 AM",
    image: "https://plus.unsplash.com/premium_photo-1670981099521-f79d73ff73d6?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fFNjaWVuY2UlMjBGYWlyfGVufDB8fDB8fHww",
  },
  {
    id: 2,
    name: "Art Exhibition",
    datetime: "May 5, 2025 – 1:00 PM",
    image: "https://images.unsplash.com/photo-1743119638006-a01d4625745d?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXJ0JTIwZXhoaWJ0aW9ufGVufDB8fDB8fHww",
  },
  {
    id: 3,
    name: "Coding Challenge",
    datetime: "June 1, 2025 – 9:30 AM",
    image: "https://images.unsplash.com/photo-1649451844813-3130d6f42f8a?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fENvZGluZyUyMENoYWxsZW5nZXxlbnwwfHwwfHx8MA%3D%3D",
  },
];

export default function NewsAndEvents() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % events.length);
    }, 4000); // change every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.slider}>
      {events.map((event, i) => (
        <div
          key={event.id}
          className={`${styles.slide} ${i === index ? styles.active : ""}`}
        >
          <img src={event.image} alt={event.name} className={styles.image} />
          <div className={styles.overlay}>
            <h3>{event.name}</h3>
            <p>{event.datetime}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
