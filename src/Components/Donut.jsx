import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useContext } from "react";
ChartJS.register(ArcElement, Tooltip, Legend);
import { AppSettingsContext } from "../Context/ThemeContext";
function DonutChart() {
  const { colors } = useContext(AppSettingsContext);
  const chartRef = useRef(null);

  useEffect(() => {
    const chart = chartRef.current;
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, []);
  const totallTasks = [
    { label: "Completed", tasks: 30, color: "#10B981" },
    { label: "In Progress", tasks: 40, color: "#F59E0B" },
    { label: "Not Started", tasks: 20, color: "#6B7280" },
  ];

  return (
    <div
      style={{
        flex: "1 1 200px",
        minWidth: "180px",
        maxWidth: "340px",
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
        My Progress
      </h1>
      <p
        style={{ color: colors.text, fontSize: "0.875rem", marginBottom: "1rem" }}
      >
        Your task completion rate
      </p>
      <Doughnut
        ref={chartRef}
        data={{
          labels: totallTasks.map((task) => task.label),
          datasets: [
            {
              data: totallTasks.map((task) => task.tasks),
              backgroundColor: totallTasks.map((task) => task.color),
              borderColor: colors.cards,
              borderWidth: 3,
            },
          ],
        }}
        options={{
          plugins: {
            legend: {
              labels: {
                color: colors.text,
                boxWidth: 12,
              },
            },
          },
        }}
      />
    </div>
  );
}
export default DonutChart;
