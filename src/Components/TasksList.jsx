import { Link } from "react-router-dom";
import { useApp } from "../Context/ThemeContext";
import { useMemo, useState } from "react";

const priorityColors = {
  high: { bg: "#FEE2E2", text: "#DC2626" },
  medium: { bg: "#FEF9C3", text: "#CA8A04" },
  low: { bg: "#DCFCE7", text: "#16A34A" },
};

const dateFinder = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const TaskList = ({ tasks, onCreateClick, onCompleteTask }) => {
  const { colors } = useApp();
  const [updatingTaskId, setUpdatingTaskId] = useState(null);

  const categorizedTasks = (tasks) => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const todayTasks = [],
      tomorrowTasks = [],
      upCommingTasks = [];

    tasks.forEach((task) => {
      const due = new Date(task.dueDate);
      const dueStr = due.toDateString();
      if (dueStr === today.toDateString()) todayTasks.push(task);
      else if (dueStr === tomorrow.toDateString()) tomorrowTasks.push(task);
      else if (due > tomorrow) upCommingTasks.push(task);
    });

    return { todayTasks, tomorrowTasks, upCommingTasks };
  };

  const { todayTasks, tomorrowTasks, upCommingTasks } = useMemo(
    () => categorizedTasks(tasks || []),
    [tasks],
  );

  const [activeTab, setActiveTab] = useState("Today");

  const getTask = () => {
    if (activeTab === "Today") return todayTasks;
    if (activeTab === "Tomorrow") return tomorrowTasks;
    return upCommingTasks;
  };

  const tabs = ["Today", "Tomorrow", "Upcoming"];

  const isTaskCompleted = (task) => task.completed || task.status === "done";

  const handleCompleteTask = async (task) => {
    if (isTaskCompleted(task) || updatingTaskId === task._id) return;

    try {
      setUpdatingTaskId(task._id);
      await onCompleteTask?.(task._id);
    } finally {
      setUpdatingTaskId(null);
    }
  };

  return (
    <section style={{ padding: "1.25rem 0" }}>
      <div
        style={{
          padding: "1.5rem",
          width: "100%",
          maxWidth: "42rem",
          borderRadius: "0.5rem",
          boxShadow: "0 14px 40px rgba(0,0,0,0.12)",
          background: colors.cards,
          border: `1px solid ${colors.border}`,
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.125rem, 3vw, 1.5rem)",
              fontWeight: 500,
              margin: 0,
            }}
          >
            My Tasks
          </h2>
          <Link
            to="/tasks"
            style={{
              padding: "0.5rem 0.75rem",
              border: "1px solid #E5E5E5",
              borderRadius: "0.375rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: colors.text,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            View All Tasks
          </Link>
        </div>

        {/* Tab Nav */}
        <nav
          style={{
            display: "flex",
            gap: "0.25rem",
            backgroundColor: colors.muted,
            border: `1px solid ${colors.border}`,
            borderRadius: "0.375rem",
            padding: "0.25rem",
            marginBottom: "1rem",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: "0.375rem 0",
                fontWeight: 500,
                fontSize: "0.875rem",
                borderRadius: "0.25rem",
                border: "none",
                cursor: "pointer",
                background: activeTab === tab ? colors.cards : "transparent",
                color: activeTab === tab ? colors.boldText : colors.text,
                boxShadow:
                  activeTab === tab ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                transition: "all 0.15s",
              }}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Task items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {getTask().map((task, index) => (
            <div key={index}>
              <h3
                style={{
                  fontSize: "0.9375rem",
                  fontWeight: 500,
                  color: colors.boldText,
                  marginBottom: "0.5rem",
                }}
              >
                {task.project?.title}
              </h3>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.75rem",
                  border: `1px solid ${colors.border}`,
                  background: colors.muted,
                  borderRadius: "0.5rem",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    minWidth: 0,
                  }}
                >
                  <input
                    type="radio"
                    checked={isTaskCompleted(task)}
                    disabled={updatingTaskId === task._id}
                    onChange={() => handleCompleteTask(task)}
                    style={{
                      width: "1.125rem",
                      height: "1.125rem",
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: "0.9375rem",
                        color: colors.boldText,
                        margin: 0,
                        textDecoration: isTaskCompleted(task)
                          ? "line-through"
                          : "none",
                        opacity: isTaskCompleted(task) ? 0.65 : 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {task.title}
                    </p>
                    <span style={{ fontSize: "0.75rem", color: colors.text }}>
                      {dateFinder(task.dueDate)}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.125rem 0.5rem",
                      borderRadius: "9999px",
                      backgroundColor: priorityColors[task.priority]?.bg,
                      color: priorityColors[task.priority]?.text,
                    }}
                  >
                    {task.priority}
                  </span>
                  {isTaskCompleted(task) && (
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "#16A34A",
                        fontWeight: 500,
                      }}
                    >
                      Completed
                    </span>
                  )}
                  <button
                    style={{
                      color: colors.text,
                      fontSize: "1.25rem",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      lineHeight: 1,
                    }}
                  >
                    ⋯
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onCreateClick}
          style={{
            width: "100%",
            border: `1px solid ${colors.border}`,
            borderRadius: "0.5rem",
            padding: "0.5rem 0",
            marginTop: "0.75rem",
            color: colors.boldText,
            cursor: "pointer",
            background: colors.muted,
            fontSize: "0.9375rem",
          }}
        >
          + Add New Task
        </button>
      </div>
    </section>
  );
};

export default TaskList;
