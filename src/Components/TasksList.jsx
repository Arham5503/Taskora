import { Link } from "react-router-dom";
const tasksData = [
  {
    category: "Figma Design System",
    tasks: [
      {
        title: "Create component documentation",
        time: "2025-12-24T06:33:54.000Z",
        priority: "high",
        assigned: [
          "https://randomuser.me/api/portraits/men/32.jpg",
          "https://randomuser.me/api/portraits/women/44.jpg",
        ],
        completed: false,
      },
      {
        title: "Design system color palette update",
        time: "2025-12-22T08:13:54.000Z",
        priority: "medium",
        assigned: ["https://randomuser.me/api/portraits/men/32.jpg"],
        completed: true,
      },
    ],
  },
  {
    category: "Keep React",
    tasks: [
      {
        title: "Fix navigation component responsive issues",
        time: "2025-12-20T00:00:00.000Z",
        priority: "high",
        assigned: ["https://randomuser.me/api/portraits/women/65.jpg"],
        completed: false,
      },
    ],
  },
];

const priorityColors = {
  high: "bg-red-100 text-red-600",
  medium: "bg-yellow-100 text-yellow-600",
  low: "bg-green-100 text-green-600",
};

const TaskList = () => {
  return (
    <div className="p-6 max-w-2xl bg-white rounded-lg shadow">
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
          <button className="py-1 flex-1 font-medium rounded-md bg-white">
            Today
          </button>
          <button className="py-1 flex-1 font-medium ">Tomorrow</button>
          <button className="py-1 flex-1 font-medium ">Upcoming</button>
        </nav>
      </div>

      {tasksData.map((category, idx) => (
        <div key={idx} className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-gray-700 font-medium">{category.category}</h3>
            <span className="text-sm text-gray-400">
              {category.tasks.length} tasks
            </span>
          </div>

          <div className="space-y-2">
            {category.tasks.map((task, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 border rounded-lg ${
                  task.completed ? "bg-gray-50" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded"
                    readOnly
                  />
                  <div>
                    <p
                      className={`text-gray-800 ${
                        task.completed ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {task.title}
                    </p>
                    <span className="text-xs text-gray-400">{task.time}</span>
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
                    {task.assigned.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt="user"
                        className="w-6 h-6 rounded-full border-2 border-white"
                      />
                    ))}
                  </div>
                  <button className="text-gray-400 text-lg">⋯</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <button className="w-full border border-gray-300 rounded-lg py-2 mt-2 text-gray-700">
        + Add New Task
      </button>
    </div>
  );
};

export default TaskList;
