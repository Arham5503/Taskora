import { useEffect, useState } from "react";
import TaskList from "../Components/TasksList";
import Projects from "../Components/Projects";
import TeamMembersDashboard from "../Components/Team";
import CreateProject from "../models/CreateProject";
import CreateTask from "../models/CreateTask";
import { useOutletContext } from "react-router-dom";
import Analytics from "../Components/Analytics";
import { getProjects, getMyTasks, updateTaskStatus } from "../api/ApiBuilder";
import AreaCharts from "../Components/AreaChart";
import DonutChart from "../Components/Donut";
import { toast } from "react-toastify";

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
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCompleteTask = async (taskId) => {
    const previousTasks = tasks;

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task._id === taskId
          ? { ...task, status: "done", completed: true }
          : task,
      ),
    );

    try {
      await updateTaskStatus(taskId, "done");
    } catch (error) {
      console.error("Failed to complete task:", error);
      setTasks(previousTasks);
      toast.error("Failed to complete task");
    }
  };

  return (
    <>
      <main>
        {/* Analytics */}
        <Analytics projects={projects} tasks={tasks} loading={loading} />
        {/* Projects */}
        <Projects projectsData={projects} onRefresh={fetchData} />
        {/* Area Chart + Donut */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            alignItems: "stretch",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        >
          <AreaCharts projects={projects} loading={loading} />
          <DonutChart tasks={tasks} loading={loading} />
        </div>
        {/* Tasks */}
        <TaskList
          tasks={tasks}
          onCreateClick={() => setIsOpen(true)}
          onCompleteTask={handleCompleteTask}
        />
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
