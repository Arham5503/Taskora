import { useEffect } from "react";
import TaskList from "../Components/TasksList";
import Projects from "../Components/Projects";
import TeamMembersDashboard from "../Components/Team";
import CreateProject from "../models/CreateProject";
import CreateTask from "../models/CreateTask";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import Analytics from "../Components/Analytics";
function Dashboard() {
  const { showCreateModel, setShowCreateModel } = useOutletContext();
  const [projects, setProjects] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  console.log(projects);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/project-data`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        const data = await response.json();

        setProjects(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <main>
        {/* Analytics */}
        <Analytics projects={projects} />
        {/* Projects */}
        <Projects projectsData={projects} />
        {/* Tasks */}
        <TaskList onCreateClick={() => setIsOpen(true)} />
        {/* Team Members */}
        <TeamMembersDashboard />
      </main>
      <CreateProject
        open={showCreateModel}
        onClose={() => setShowCreateModel(false)}
      />
      <CreateTask open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
export default Dashboard;
