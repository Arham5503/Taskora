import {
  FileText,
  ArrowUpRight,
  Clock,
  CircleCheckBig,
  CircleAlert,
  Calendar,
  Star,
} from "lucide-react";
import { useContext, useEffect, useMemo } from "react";
import { AppSettingsContext } from "../Context/ThemeContext";
import TaskList from "../Components/TasksList";
import Projects from "../Components/Projects";
import TeamMembersDashboard from "../Components/Team";
import CreateProject from "../models/CreateProject";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
function Dashboard() {
  const { colors } = useContext(AppSettingsContext);
  const { showCreateModel, setShowCreateModel } = useOutletContext();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:2004/api/project-data", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        setProjects(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  // get date function
  const dateFinder = (days) => {
    const futureDate = new Date();
    return futureDate.setDate(futureDate.getDate() + days);
  };
  // console.log(result);

  const analytics = useMemo(() => {
    const now = new Date();

    const summary = [
      {
        all: projects.length || 0,
        inProgress: 0,
        completed: 0,
        overdue: 0,
      },
    ];

    projects.forEach((project) => {
      if (project.status === "planning" || project.status === "in_progress") {
        summary.inProgress++;
      }
      if (project.status === "completed") {
        summary.completed++;
      }
    });
  }, [projects]);

  const analyticsMock = [
    {
      icon1: <FileText />,
      icon2: <ArrowUpRight />,
      icon2Value: "+2",
      title: "Total Projects",
      numbers: analytics.all,
      from: "from last month",
    },
    {
      icon1: <Clock />,
      icon2: <ArrowUpRight />,
      icon2Value: "+3",
      title: "In Progress",
      numbers: analytics.inProgress,
      from: "from last month",
    },
    {
      icon1: <CircleCheckBig />,
      icon2: <ArrowUpRight />,
      icon2Value: "+1",
      title: "Completed",
      numbers: analytics.completed,
      from: "from last month",
    },
    {
      icon1: <CircleAlert />,
      icon2: <ArrowUpRight />,
      icon2Value: "-1",
      title: analytics.overdue,
      numbers: 1,
      from: "from last month",
    },
  ];
  return (
    <>
      <main>
        {/* Analytics */}
        <section className="flex justify-between p-2 [&>div]:flex [&>div]:flex-col [&>div]:space-y-2 [&>div]:p-3">
          {analyticsMock.map((analytic) => (
            <div
              style={{
                background: colors.cards,
                border: `1px solid ${colors.border}`,
                color: colors.text,
              }}
              className="rounded-md border min-w-52"
            >
              <div className="flex justify-between items-center">
                <div
                  className="w-10 h-10 p-2 rounded-full bg-[#DBEAFE] "
                  style={{ color: colors.primary }}
                >
                  {analytic.icon1}
                </div>
                <span className="flex gap-1 text-green-600">
                  {analytic.icon2} {analytic.icon2Value}
                </span>
              </div>
              <h2
                className="text-base font-medium"
                style={{ color: colors.text }}
              >
                {analytic.title}
              </h2>
              <h1
                className="font-bold text-3xl"
                style={{ color: colors.boldText }}
              >
                {analytic.numbers}
              </h1>
              <h3 className=" text-[14px]" style={{ color: colors.text }}>
                {analytic.from}
              </h3>
            </div>
          ))}
        </section>
        {/* Projects */}
        <Projects />
        {/* Tasks */}
        <TaskList />
        {/* Team Members */}
        <TeamMembersDashboard />
      </main>
      <CreateProject
        open={showCreateModel}
        onClose={() => setShowCreateModel(false)}
      />
    </>
  );
}
export default Dashboard;
