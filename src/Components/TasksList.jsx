import { Link } from "react-router-dom";
import { useApp } from "../Context/ThemeContext";
import { useMemo, useState } from "react";

const priorityColors = {
  high: "bg-red-100 text-red-600",
  medium: "bg-yellow-100 text-yellow-600",
  low: "bg-green-100 text-green-600",
};

const dateFinder = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const TaskList = ({ tasks, onCreateClick }) => {
  const categrizedTasks = (tasks) => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const todayTasks = [];
    const tomorrowTasks = [];
    const upCommingTasks = [];
    tasks.forEach((task) => {
      const due = new Date(task.dueDate);
      const dueStr = due.toDateString();
      const todayStr = today.toDateString();
      const tomorrowStr = tomorrow.toDateString();

      if (dueStr === todayStr) {
        todayTasks.push(task);
      } else if (dueStr === tomorrowStr) {
        tomorrowTasks.push(task);
      } else if (due > tomorrow) {
        upCommingTasks.push(task);
      }
    });
    return { todayTasks, tomorrowTasks, upCommingTasks };
  };

  const { todayTasks, tomorrowTasks, upCommingTasks } = useMemo(
    () => categrizedTasks(tasks || []),
    [tasks],
  );
  const [activeTab, setActiveTab] = useState("Today");
  const getTask = () => {
    if (activeTab === "Today") return todayTasks;
    else if (activeTab === "Tomorrow") return tomorrowTasks;
    return upCommingTasks;
  };
  const { colors } = useApp();
  return (
    <section className="py-5">
      <div
        className="p-6 max-w-2xl rounded-lg shadow"
        style={{ background: colors.cards }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-medium">My Tasks</h2>
          <Link
            to="/tasks"
            className="px-3 py-2 border-[#E5E5E5] border rounded text-sm font-medium"
          >
            View All Tasks
          </Link>
        </div>

        <div className="mb-4">
          <nav className="flex gap-1 rounded-md items-center justify-between p-1 bg-gray-100 text-sm ">
            <button
              className={`py-1 flex-1 font-medium rounded-md ${activeTab === "Today" ? "bg-white" : ""}`}
              onClick={() => setActiveTab("Today")}
            >
              Today
            </button>
            <button
              className={`py-1 flex-1 font-medium rounded-md ${activeTab === "Tomorrow" ? "bg-white" : ""}`}
              onClick={() => setActiveTab("Tomorrow")}
            >
              Tomorrow
            </button>
            <button
              className={`py-1 flex-1 font-medium rounded-md ${activeTab === "Upcoming" ? "bg-white" : ""}`}
              onClick={() => setActiveTab("Upcoming")}
            >
              Upcoming
            </button>
          </nav>
        </div>
        {getTask().map((task, index) => (
          <div key={index} className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-gray-700 font-medium">
                {task.project.title}
              </h3>
              {/* <span className="text-sm text-gray-400">
                {category.tasks.length} tasks
              </span> */}
            </div>

            <div className="space-y-2">
              <div
                key={task._id}
                className={`flex items-center justify-between p-3 border rounded-lg 
                    `}
                // ${task.completed ? "bg-gray-50" : ""}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    // checked={task.completed}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded"
                    readOnly
                  />
                  <div>
                    <p
                      className={`text-gray-800 
                        `}
                      // ${task.completed ? "line-through text-gray-400" : ""}
                    >
                      {task.title}
                    </p>
                    <span className="text-xs text-gray-400">
                      {dateFinder(task.dueDate)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      priorityColors[task.priority]
                    }`}
                  >
                    {task.priority}
                  </span>
                  {task.completed && (
                    <span className="text-xs text-green-600 font-medium">
                      Completed
                    </span>
                  )}
                  <div className="flex -space-x-2">
                    {/* {task.assigned.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt="user"
                            className="w-6 h-6 rounded-full border-2 border-white"
                          />
                        ))} */}
                  </div>
                  <button className="text-gray-400 text-lg">⋯</button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={onCreateClick}
          className="w-full border border-gray-300 rounded-lg py-2 mt-2 text-gray-700 cursor-pointer"
        >
          + Add New Task
        </button>
      </div>
    </section>
  );
};

export default TaskList;
