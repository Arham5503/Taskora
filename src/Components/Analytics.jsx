import {
  FileText,
  ArrowUpRight,
  Clock,
  CircleCheckBig,
  CircleAlert,
  Calendar,
  Star,
} from "lucide-react";
import { useContext, useMemo } from "react";
import { AppSettingsContext } from "../Context/ThemeContext";
function Analytics({ projects }) {
  const { colors } = useContext(AppSettingsContext);
  console.log("projects:", projects);

  const analytics = useMemo(() => {
    // const now = new Date();

    const summary = {
      all: projects.length || 0,
      inProgress: 0,
      completed: 0,
      overdue: 0,
    };

    if (projects.length > 0) {
      projects.forEach((project) => {
        if (project.status === "planning" || project.status === "in_progress") {
          summary.inProgress++;
        }
        if (project.status === "completed") {
          summary.completed++;
        }
      });
    }
    return summary;
  }, [projects]);

  const analyticCards = [
    {
      id: 0,
      icon1: <FileText />,
      icon2: <ArrowUpRight />,
      icon2Value: "+2",
      title: "Total Projects",
      numbers: analytics.all,
      from: "from last month",
    },
    {
      id: 1,
      icon1: <Clock />,
      icon2: <ArrowUpRight />,
      icon2Value: "+3",
      title: "In Progress",
      numbers: analytics.inProgress,
      from: "from last month",
    },
    {
      id: 2,
      icon1: <CircleCheckBig />,
      icon2: <ArrowUpRight />,
      icon2Value: "+1",
      title: "Completed",
      numbers: analytics.completed,
      from: "from last month",
    },
    {
      id: 3,
      icon1: <CircleAlert />,
      icon2: <ArrowUpRight />,
      icon2Value: "-1",
      title: "Over Due",
      numbers: analytics.overdue,
      from: "from last month",
    },
  ];
  return (
    <section className="flex justify-between p-2 [&>div]:flex [&>div]:flex-col [&>div]:space-y-2 [&>div]:p-3">
      {analyticCards.map((analytic) => (
        <div
          key={analytic.id}
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
          <h2 className="text-base font-medium" style={{ color: colors.text }}>
            {analytic.title}
          </h2>
          <h1 className="font-bold text-3xl" style={{ color: colors.boldText }}>
            {analytic.numbers}
          </h1>
          <h3 className=" text-[14px]" style={{ color: colors.text }}>
            {analytic.from}
          </h3>
        </div>
      ))}
    </section>
  );
}
export default Analytics;
