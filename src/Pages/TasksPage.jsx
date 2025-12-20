//
import React, { useState } from "react";
import {
  Calendar,
  Paperclip,
  MessageSquare,
  CheckSquare,
  MoreVertical,
  Plus,
  Grid3x3,
  List,
  CalendarIcon,
  Filter,
  ArrowUpDown,
  Layers,
} from "lucide-react";

const TasksPage = () => {
  const [tasks, setTasks] = useState({
    todo: [
      {
        id: 1,
        category: "Website Redesign",
        title: "Redesign landing page",
        priority: "High",
        progress: 33,
        date: "Jun 15",
        attachments: 2,
        comments: 5,
        checklist: { completed: 1, total: 3 },
        assignees: [
          { id: 1, color: "bg-blue-400" },
          { id: 2, color: "bg-purple-400" },
        ],
      },
    ],
    inProgress: [
      {
        id: 2,
        category: "Bug Fixes",
        title: "Fix navigation bug",
        priority: "Medium",
        progress: 50,
        date: "Jun 10",
        attachments: 0,
        comments: 3,
        checklist: { completed: 2, total: 4 },
        assignees: [{ id: 3, color: "bg-orange-400" }],
      },
    ],
    inReview: [
      {
        id: 3,
        category: "User Experience",
        title: "Create user onboarding flow",
        priority: "High",
        progress: 60,
        date: "Jun 20",
        attachments: 5,
        comments: 8,
        checklist: { completed: 3, total: 5 },
        assignees: [
          { id: 4, color: "bg-pink-400" },
          { id: 5, color: "bg-teal-400" },
        ],
      },
    ],
    done: [],
  });

  const columns = [
    { id: "todo", title: "To Do", count: tasks.todo.length },
    { id: "inProgress", title: "In Progress", count: tasks.inProgress.length },
    { id: "inReview", title: "In Review", count: tasks.inReview.length },
    { id: "done", title: "Done", count: tasks.done.length },
  ];

  const TaskCard = ({ task }) => {
    const priorityColors = {
      High: "bg-red-100 text-red-700",
      Medium: "bg-blue-100 text-blue-700",
      Low: "bg-green-100 text-green-700",
    };

    return (
      <div className="bg-white rounded-lg p-4 mb-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xs text-gray-500 font-medium">
            {task.category}
          </span>
          <span
            className={`text-xs px-2 py-1 rounded font-medium ${
              priorityColors[task.priority]
            }`}
          >
            {task.priority}
          </span>
        </div>

        <h3 className="text-sm font-semibold text-gray-800 mb-3">
          {task.title}
        </h3>

        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Progress</span>
            <span className="text-xs text-gray-700 font-medium">
              {task.progress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-gray-800 h-1.5 rounded-full transition-all"
              style={{ width: `${task.progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span className="text-xs">{task.date}</span>
            </div>
            {task.attachments > 0 && (
              <div className="flex items-center gap-1">
                <Paperclip size={14} />
                <span className="text-xs">{task.attachments}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <MessageSquare size={14} />
              <span className="text-xs">{task.comments}</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckSquare size={14} />
              <span className="text-xs">
                {task.checklist.completed}/{task.checklist.total}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {task.assignees.map((assignee) => (
                <div
                  key={assignee.id}
                  className={`w-6 h-6 rounded-full ${assignee.color} border-2 border-white`}
                />
              ))}
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-blue-600 font-medium px-3 py-2 rounded hover:bg-blue-50">
              <Grid3x3 size={18} />
              <span>Board</span>
            </button>
            <button className="flex items-center gap-2 text-gray-600 font-medium px-3 py-2 rounded hover:bg-gray-100">
              <List size={18} />
              <span>List</span>
            </button>
            <button className="flex items-center gap-2 text-gray-600 font-medium px-3 py-2 rounded hover:bg-gray-100">
              <CalendarIcon size={18} />
              <span>Calendar</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-gray-700 font-medium px-3 py-2 rounded hover:bg-gray-100">
              <Filter size={18} />
              <span>Filter</span>
            </button>
            <button className="flex items-center gap-2 text-gray-700 font-medium px-3 py-2 rounded hover:bg-gray-100">
              <ArrowUpDown size={18} />
              <span>Sort</span>
            </button>
            <button className="flex items-center gap-2 text-gray-700 font-medium px-3 py-2 rounded hover:bg-gray-100">
              <Layers size={18} />
              <span>Group By</span>
            </button>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((column) => (
            <div key={column.id} className="bg-gray-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold text-gray-800">
                    {column.title}
                  </h2>
                  <span className="bg-gray-200 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
                    {column.count}
                  </span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical size={18} />
                </button>
              </div>

              <div className="space-y-3">
                {tasks[column.id].map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>

              <button className="w-full mt-3 flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                <Plus size={18} />
                <span className="font-medium">Add Task</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
