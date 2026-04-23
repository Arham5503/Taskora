import {
  FileText,
  ArrowUpRight,
  Clock,
  CircleCheckBig,
  CircleAlert,
  ArrowDownRight,
} from "lucide-react";
import { useContext, useMemo } from "react";
import { AppSettingsContext } from "../Context/ThemeContext";

function Analytics({ projects }) {
  const { colors } = useContext(AppSettingsContext);
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const startOfCurrentMonth = new Date(currentYear, currentMonth, 1);
  const startOfLastMonth = new Date(currentYear, currentMonth - 1, 1);
  const endOfLastMonth = new Date(startOfCurrentMonth - 1);

  const analytics = useMemo(() => {
    const summary = {
      all: projects.length || 0,
      inProgress: 0,
      completed: 0,
      overdue: 0,
      lastMonthProjects: 0,
      currentMonthProjects: 0,
      lastMonthProgress: 0,
      currentMonthProgress: 0,
      lastMonthCompleted: 0,
      currentMonthCompleted: 0,
    };

    if (projects.length > 0) {
      projects.forEach((project) => {
        const createdAt = new Date(project.createdAt);
        if (project.status === "planning" || project.status === "in_progress") {
          summary.inProgress++;
          if (createdAt <= endOfLastMonth && createdAt >= startOfLastMonth) {
            summary.lastMonthProgress++;
          }
          if (createdAt <= now && createdAt >= startOfCurrentMonth) {
            summary.currentMonthProgress++;
          }
        }
        if (project.status === "completed") {
          summary.completed++;
          if (createdAt <= endOfLastMonth && createdAt >= startOfLastMonth) {
            summary.lastMonthCompleted++;
          }
          if (createdAt <= now && createdAt >= startOfCurrentMonth) {
            summary.currentMonthCompleted++;
          }
        }
        if (createdAt <= endOfLastMonth && createdAt >= startOfLastMonth) {
          summary.lastMonthProjects++;
        }
        if (createdAt <= now && createdAt >= startOfCurrentMonth) {
          summary.currentMonthProjects++;
        }
        if (createdAt > now) {
          summary.overdue++;
        }
      });
    }

    return summary;
  }, [projects]);
  const analyticCards = [
    {
      id: 0,
      icon1: <FileText size="1.25rem" />,
      icon2Value: analytics.currentMonthProjects - analytics.lastMonthProjects,
      title: "Total Projects",
      numbers: analytics.all,
      from: "from last month",
    },
    {
      id: 1,
      icon1: <Clock size="1.25rem" />,
      icon2Value: analytics.currentMonthProgress - analytics.lastMonthProgress,
      title: "In Progress",
      numbers: analytics.inProgress,
      from: "from last month",
    },
    {
      id: 2,
      icon1: <CircleCheckBig size="1.25rem" />,
      icon2Value:
        analytics.currentMonthCompleted - analytics.lastMonthCompleted,
      title: "Completed",
      numbers: analytics.completed,
      from: "from last month",
    },
    {
      id: 3,
      icon1: <CircleAlert size="1.25rem" />,
      icon2Value: analytics.overdue,
      title: "Over Due",
      numbers: analytics.overdue,
      from: "from last month",
    },
  ];

  return (
    <>
      <section
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 12rem), 1fr))",
          gap: "1rem",
          padding: "0.5rem",
        }}
      >
        {analyticCards.map((analytic) => (
          <div
            key={analytic.id}
            style={{
              background: colors.cards,
              border: `1px solid ${colors.border}`,
              color: colors.text,
              borderRadius: "0.5rem",
              padding: "0.875rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  padding: "0.5rem",
                  borderRadius: "50%",
                  backgroundColor: "#DBEAFE",
                  color: colors.primary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {analytic.icon1}
              </div>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  color: `${analytic.icon2Value > 0 ? "#16a34a" : "#DC2626"}`,
                  fontSize: "0.875rem",
                }}
              >
                {analytic.icon2Value > 0 ? (
                  <ArrowUpRight size="1rem" />
                ) : (
                  <ArrowDownRight stroke="#DC2626" size="1rem" />
                )}

                {analytic.icon2Value}
              </span>
            </div>

            <h2
              style={{
                fontSize: "0.9375rem",
                fontWeight: 500,
                color: colors.text,
                margin: 0,
              }}
            >
              {analytic.title}
            </h2>
            <h1
              style={{
                fontSize: "clamp(1.5rem, 4vw, 1.875rem)",
                fontWeight: 700,
                color: colors.boldText,
                margin: 0,
              }}
            >
              {analytic.numbers}
            </h1>
            <h3
              style={{ fontSize: "0.8125rem", color: colors.text, margin: 0 }}
            >
              {analytic.from}
            </h3>
          </div>
        ))}
      </section>
    </>
  );
}

export default Analytics;
