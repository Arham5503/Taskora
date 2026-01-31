import { useEffect, useState } from "react";
import TaskList from "../Components/TasksList";
import Projects from "../Components/Projects";
import TeamMembersDashboard from "../Components/Team";
import CreateProject from "../models/CreateProject";
import CreateTask from "../models/CreateTask";
import { useOutletContext } from "react-router-dom";
import Analytics from "../Components/Analytics";
import { getProjects, getMyTasks } from "../api/ApiBuilder";

function Dashboard() {
  const { showCreateModel, setShowCreateModel } = useOutletContext();
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [projectsData, tasksData] = await Promise.all([
        getProjects(),
        getMyTasks(),
      ]);
      setProjects(projectsData);
      setTasks(tasksData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <main>
        {/* Analytics */}
        <Analytics projects={projects} tasks={tasks} loading={loading} />
        {/* Projects */}
        <Projects projectsData={projects} onRefresh={fetchData} />
        {/* Tasks */}
        <TaskList tasks={tasks} onCreateClick={() => setIsOpen(true)} />
        {/* Team Members */}
        <TeamMembersDashboard />
      </main>
      <CreateProject
        open={showCreateModel}
        onClose={() => setShowCreateModel(false)}
        onSuccess={fetchData}
      />
      <CreateTask
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={fetchData}
      />
    </>
  );
}

export default Dashboard;
