
import styles from "./About.module.css";

export default function About() {
  return (
    <section className={styles.container} id="about" >
      <h2 className={styles.title}>About</h2>
      <div className= {styles.flx} >
        <img
          src="/assets/about/MyPhoto.png"
          alt="myImage"
          className={styles.aboutImage}
        />
        <div className={styles.aboutItem}>
          <div className={styles.aboutItemText}>
            <p>
              Hi, I'm Tharun from Coimbatore. I graduated with a B.Sc. in
              Mathematics in 2022 and have been immersed in asset management at
              Cognizant Technical Solutions for the past 12 months.I am on a
              transformative journey to become a Full Stack Software Developer.
              I'm actively engaged in upskilling through Scaler, honing my
              abilities to craft innovative and robust solutions. Explore my
              journey and projects here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
