import { useState } from "react";
import styles from "./Navbar.module.css";
import { assetPath } from "../../utils/assets";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const homePath = import.meta.env.BASE_URL || "/";

  return (
    <nav className={styles.navbar}>
      <a className={styles.title} href={homePath}>
        Portfolio
      </a>
      <div className={styles.menu}>
        <img
          className={styles.menuBtn}
          src={assetPath(menuOpen ? "nav/closeIcon.png" : "nav/menuIcon.png")}
          alt="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        <ul
          className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}
          onClick={() => setMenuOpen(false)}
        >
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#experience">Experience</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
