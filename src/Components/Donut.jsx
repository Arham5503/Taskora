import { useEffect, useMemo, useRef } from "react";
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

const isTaskDone = (task) => task.completed || task.status === "done";

function DonutChart({ tasks = [], loading = false }) {
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
  const progressData = useMemo(() => {
    const summary = {
      completed: 0,
      inProgress: 0,
      notStarted: 0,
    };

    tasks.forEach((task) => {
      if (isTaskDone(task)) {
        summary.completed += 1;
      } else if (task.status === "in_progress" || task.status === "in_review") {
        summary.inProgress += 1;
      } else {
        summary.notStarted += 1;
      }
    });

    return [
      { label: "Completed", tasks: summary.completed, color: "#10B981" },
      { label: "In Progress", tasks: summary.inProgress, color: "#F59E0B" },
      { label: "Not Started", tasks: summary.notStarted, color: "#6B7280" },
    ];
  }, [tasks]);

  const totalTasks = tasks.length;
  const completedTasks = progressData[0].tasks;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

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
      {loading ? (
        <div
          style={{
            minHeight: "16rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: colors.text,
          }}
        >
          Loading progress...
        </div>
      ) : totalTasks === 0 ? (
        <div
          style={{
            minHeight: "16rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: colors.text,
            textAlign: "center",
          }}
        >
          No personal tasks yet.
        </div>
      ) : (
        <>
          <div
            style={{
              color: colors.boldText,
              fontSize: "1.875rem",
              fontWeight: 700,
              marginBottom: "0.75rem",
            }}
          >
            {completionRate}%
          </div>
          <Doughnut
            ref={chartRef}
            data={{
              labels: progressData.map((task) => task.label),
              datasets: [
                {
                  data: progressData.map((task) => task.tasks),
                  backgroundColor: progressData.map((task) => task.color),
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
                tooltip: {
                  callbacks: {
                    label: (context) =>
                      `${context.label}: ${context.parsed} task${
                        context.parsed === 1 ? "" : "s"
                      }`,
                  },
                },
              },
              cutout: "64%",
            }}
          />
        </>
      )}
    </div>
  );
}
export default DonutChart;
