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
        style={{ color: "#737373", fontSize: "0.875rem", marginBottom: "1rem" }}
      >
        Task completion and project progress over time
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={totallTasks}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} width={30} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="tasks"
            stroke="#8884d8"
            fill="#E7E6F7"
          />
          <Area
            type="monotone"
            dataKey="completed"
            stroke="#82CA9D"
            fill="#D3E0E5"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AreaCharts;
