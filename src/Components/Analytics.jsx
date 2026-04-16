import {
  FileText,
  ArrowUpRight,
  Clock,
  CircleCheckBig,
  CircleAlert,
} from "lucide-react";
import { useContext, useMemo } from "react";
import { AppSettingsContext } from "../Context/ThemeContext";

function Analytics({ projects }) {
  const { colors } = useContext(AppSettingsContext);

  const analytics = useMemo(() => {
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
      icon1: <FileText size="1.25rem" />,
      icon2Value: "+2",
      title: "Total Projects",
      numbers: analytics.all,
      from: "from last month",
    },
    {
      id: 1,
      icon1: <Clock size="1.25rem" />,
      icon2Value: "+3",
      title: "In Progress",
      numbers: analytics.inProgress,
      from: "from last month",
    },
    {
      id: 2,
      icon1: <CircleCheckBig size="1.25rem" />,
      icon2Value: "+1",
      title: "Completed",
      numbers: analytics.completed,
      from: "from last month",
    },
    {
      id: 3,
      icon1: <CircleAlert size="1.25rem" />,
      icon2Value: "-1",
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
                  color: "#16a34a",
                  fontSize: "0.875rem",
                }}
              >
                <ArrowUpRight size="1rem" />
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
