
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <footer id = "contact" className={styles.container} >
        <div className={styles.text} >
            <h2>Contact</h2>
            <p>Feel free to reach out!</p>
        </div>
        <ul className={styles.links}  >
            <li className={styles.link} >
                <img src="/assets/contact/emailIcon.png" alt="Email Icon"  />
                <a href="mailto:tharunbalaji110@gmail.com">tharunbalaji110@gmail.com</a>
            </li>
            <li className={styles.link} >
                <img src="/assets/contact/linkedinIcon.png" alt="LinkedIn Icon"  />
                <a  target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/tharun-balaji-j-a65402260/">linkedin.com/tharun-balaji</a>
            </li>
            <li className={styles.link} >
                <img src="/assets/contact/githubIcon.png" alt="GitHub Icon"  />
                <a href="https://github.com/Tharun-Balaji">github.com/Tharun-Balaji</a>
            </li>
        </ul>
    </footer>
  )
}
