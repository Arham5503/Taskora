import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useContext } from "react";
import { AppSettingsContext } from "../Context/ThemeContext";
function AreaCharts() {
  const { colors } = useContext(AppSettingsContext);
  const totallTasks = [
    { name: "Jan", tasks: 40, completed: 28 },
    { name: "Feb", tasks: 30, completed: 19 },
    { name: "Mar", tasks: 20, completed: 12 },
    { name: "Apr", tasks: 36, completed: 32 },
    { name: "May", tasks: 27, completed: 15 },
    { name: "Jun", tasks: 20, completed: 20 },
    { name: "Jul", tasks: 19, completed: 16 },
    { name: "Aug", tasks: 39, completed: 37 },
    { name: "Sep", tasks: 24, completed: 18 },
    { name: "Oct", tasks: 12, completed: 12 },
    { name: "Nov", tasks: 44, completed: 40 },
    { name: "Dec", tasks: 37, completed: 37 },
  ];

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
        Task completion and project progress over time
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={totallTasks}>
          <CartesianGrid
            stroke={colors.border}
            strokeDasharray="3 3"
            opacity={0.7}
          />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: colors.text }} />
          <YAxis tick={{ fontSize: 12, fill: colors.text }} width={30} />
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
            dataKey="tasks"
            stroke={colors.primary}
            fill="rgba(96, 165, 250, 0.24)"
          />
          <Area
            type="monotone"
            dataKey="completed"
            stroke={colors.accent}
            fill="rgba(45, 212, 191, 0.18)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AreaCharts;
