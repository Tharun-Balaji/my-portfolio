import skills from "../../data/skills.json";
import styles from "./Skills.module.css";

export default function Skills() {
  return (
		<section className={styles.container} id="experience">
			<h2 className={styles.title}>Skills</h2>
			<div className={styles.content}>
				<div className={styles.skills}>
					{skills.map((skill, id) => {
						return (
							<div key={id} className={styles.skill}>
								<div className={styles.skillImageContainer}>
									<img
										src={skill.imageSrc}
										alt={skill.title}
									/>
								</div>
								<p>{skill.title}</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
  );
}
