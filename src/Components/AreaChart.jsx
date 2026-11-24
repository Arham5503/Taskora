import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useContext, useMemo } from "react";
import { AppSettingsContext } from "../Context/ThemeContext";

const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "short" });

const getProjectMonthData = (projects = []) => {
  const now = new Date();
  const months = Array.from({ length: 12 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - 11 + index, 1);
    return {
      key: `${date.getFullYear()}-${date.getMonth()}`,
      name: monthFormatter.format(date),
      projects: 0,
      completed: 0,
      inProgress: 0,
    };
  });

  const monthIndex = new Map(months.map((month, index) => [month.key, index]));

  projects.forEach((project) => {
    const date = new Date(project.createdAt || project.startDate || Date.now());
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const index = monthIndex.get(key);

    if (index === undefined) return;

    months[index].projects += 1;
    if (project.status === "completed") {
      months[index].completed += 1;
    }
    if (project.status === "planning" || project.status === "in_progress") {
      months[index].inProgress += 1;
    }
  });

  return months;
};

function AreaCharts({ projects = [], loading = false }) {
  const { colors } = useContext(AppSettingsContext);
  const projectData = useMemo(() => getProjectMonthData(projects), [projects]);
  const hasProjectData = projects.length > 0;

  return (
    <div
      style={{
        flex: "3 1 280px",
        minWidth: 0,
        width: "100%",
        background: colors.cards,
        border: `1px solid ${colors.border}`,
        borderRadius: "0.75rem",
        padding: "1.25rem",
        boxShadow: "0 14px 40px rgba(0,0,0,0.12)",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(1.25rem, 3vw, 1.5rem)",
          fontWeight: 500,
          color: colors.boldText,
        }}
      >
        Project Analytics
      </h1>
      <p
        style={{
          color: colors.text,
          fontSize: "0.875rem",
          marginBottom: "1rem",
        }}
      >
        Projects you own or have been added to over the last 12 months
      </p>
      {loading ? (
        <div
          style={{
            height: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: colors.text,
          }}
        >
          Loading project analytics...
        </div>
      ) : !hasProjectData ? (
        <div
          style={{
            height: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: colors.text,
            textAlign: "center",
          }}
        >
          No project data available yet.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={projectData}>
            <CartesianGrid
              stroke={colors.border}
              strokeDasharray="3 3"
              opacity={0.7}
            />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: colors.text }} />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12, fill: colors.text }}
              width={30}
            />
            <Tooltip
              contentStyle={{
                background: colors.cards,
                border: `1px solid ${colors.border}`,
                borderRadius: "0.5rem",
                color: colors.boldText,
              }}
            />
            <Area
              type="monotone"
              name="Projects"
              dataKey="projects"
              stroke={colors.primary}
              fill="rgba(96, 165, 250, 0.24)"
            />
            <Area
              type="monotone"
              name="Completed"
              dataKey="completed"
              stroke={colors.accent}
              fill="rgba(45, 212, 191, 0.18)"
            />
            <Area
              type="monotone"
              name="In Progress"
              dataKey="inProgress"
              stroke="#F59E0B"
              fill="rgba(245, 158, 11, 0.14)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default AreaCharts;
