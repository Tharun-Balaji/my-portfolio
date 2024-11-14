
import projects from "../../data/projects.json"
import ProjectCard from "./ProjectCard"
import styles from "./Projects.module.css"

export default function Projects() {
  return (
    <section className= {styles.container} id = "projects" >
        <h2 className= {styles.title} >Projects</h2>
        <div className= {styles.projects} >
        {
            projects.map(
                function(project,id){
                    return(
                        <ProjectCard key={id} project = {project} />
                    )
                }
            )
        }
        </div>
    </section>
  )
}
