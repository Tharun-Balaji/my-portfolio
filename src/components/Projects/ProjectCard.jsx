
import styles from "./ProjectCard.module.css"

export default function ProjectCard({ project }) {
  return (
    <div className= {styles.container} >
      <img src={project.imageSrc} alt={`ImageOf ${project.title}`} className= {styles.image}  />
      <h3 className= {styles.title} >{project.title}</h3>
      <p className= {styles.description} >{project.description}</p>
      <ul className= {styles.skills} >
        {project.skills.map(function (skill, id) {
          return <li key={id} className= {styles.skill} >{skill}</li>;
        })}
      </ul>
      <div  className= {styles.links} >
        <a  target="_blank" rel="noopener noreferrer" className= {styles.link}href={project.demo}>Demo</a>
        <a  target="_blank" rel="noopener noreferrer"  className= {styles.link} href={project.source}>Source</a>
      </div>
    </div>
  );
}
