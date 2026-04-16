import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function DonutChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    // Cleanup function to destroy chart when component unmounts
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);
  const totallTasks = [
    { label: "Completed", tasks: 30, color: "#10B981" },
    { label: "In Progress", tasks: 40, color: "#F59E0B" },
    { label: "Not Started", tasks: 20, color: "#6B7280" },
  ];

  return (
    <div className="flex-1">
      <Doughnut
        ref={chartRef}
        data={{
          labels: totallTasks.map((task) => task.label),
          datasets: [
            {
              data: totallTasks.map((task) => task.tasks),
              backgroundColor: totallTasks.map((task) => task.color),
            },
          ],
        }}
      />
    </div>
  );
}
export default DonutChart;
