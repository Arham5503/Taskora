import React, { useState, useEffect } from "react";
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
  Clock,
  Trash2,
} from "lucide-react";
import { getMyTasks, updateTaskStatus, deleteTask } from "../api/ApiBuilder";
import CreateTask from "../models/CreateTask";
import { toast } from "react-toastify";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getMyTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      toast.success("Task status updated");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to update task");
    }
    setActiveMenu(null);
  };

  const handleDeleteTask = async (taskId) => {
    if (!confirm("Delete this task?")) return;
    try {
      await deleteTask(taskId);
      toast.success("Task deleted");
      fetchTasks();
    } catch (error) {
      toast.error("Failed to delete task");
    }
    setActiveMenu(null);
  };

  // Group tasks by status
  const groupedTasks = {
    todo: tasks.filter((t) => t.status === "todo"),
    in_progress: tasks.filter((t) => t.status === "in_progress"),
    in_review: tasks.filter((t) => t.status === "in_review"),
    done: tasks.filter((t) => t.status === "done"),
  };

  const columns = [
    { id: "todo", title: "To Do", count: groupedTasks.todo.length },
    { id: "in_progress", title: "In Progress", count: groupedTasks.in_progress.length },
    { id: "in_review", title: "In Review", count: groupedTasks.in_review.length },
    { id: "done", title: "Done", count: groupedTasks.done.length },
  ];

  const priorityColors = {
    high: "bg-red-100 text-red-700",
    medium: "bg-blue-100 text-blue-700",
    low: "bg-green-100 text-green-700",
  };

  const getNextStatus = (currentStatus) => {
    const statusFlow = {
      todo: "in_progress",
      in_progress: "in_review",
      in_review: "done",
    };
    return statusFlow[currentStatus];
  };

  const TaskCard = ({ task }) => {
    const isMenuOpen = activeMenu === task._id;

    return (
      <div className="bg-white rounded-lg p-4 mb-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow relative">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xs text-gray-500 font-medium">
            {task.category || "General"}
          </span>
          <span
            className={`text-xs px-2 py-1 rounded font-medium capitalize ${
              priorityColors[task.priority] || priorityColors.medium
            }`}
          >
            {task.priority}
          </span>
        </div>

        <h3 className="text-sm font-semibold text-gray-800 mb-2">
          {task.title}
        </h3>

        {task.description && (
          <p className="text-xs text-gray-500 mb-3 line-clamp-2">
            {task.description}
          </p>
        )}

        {task.project && (
          <div className="mb-3">
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
              {task.project.title || "Project"}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-gray-500">
            {task.dueDate && (
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span className="text-xs">
                  {new Date(task.dueDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            )}
            {task.attachments > 0 && (
              <div className="flex items-center gap-1">
                <Paperclip size={14} />
                <span className="text-xs">{task.attachments}</span>
              </div>
            )}
            {task.comments > 0 && (
              <div className="flex items-center gap-1">
                <MessageSquare size={14} />
                <span className="text-xs">{task.comments}</span>
              </div>
            )}
            {task.checklist?.total > 0 && (
              <div className="flex items-center gap-1">
                <CheckSquare size={14} />
                <span className="text-xs">
                  {task.checklist.completed}/{task.checklist.total}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {task.assignees?.length > 0 && (
              <div className="flex -space-x-2">
                {task.assignees.slice(0, 3).map((assignee, idx) => (
                  <div
                    key={assignee._id || idx}
                    className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-xs font-medium"
                    title={assignee.username || assignee.email}
                  >
                    {(assignee.username || assignee.email || "U")[0].toUpperCase()}
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveMenu(isMenuOpen ? null : task._id);
              }}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <MoreVertical size={16} />
            </button>
          </div>
        </div>

        {/* Action Menu */}
        {isMenuOpen && (
          <div className="absolute right-4 top-12 bg-white rounded-lg shadow-lg border border-gray-200 py-1 w-40 z-10">
            {task.status !== "done" && (
              <button
                onClick={() => handleStatusChange(task._id, getNextStatus(task.status))}
                className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
              >
                Move to Next
              </button>
            )}
            {["todo", "in_progress", "in_review", "done"].map((status) => (
              status !== task.status && (
                <button
                  key={status}
                  onClick={() => handleStatusChange(task._id, status)}
                  className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 capitalize"
                >
                  Move to {status.replace("_", " ")}
                </button>
              )
            ))}
            <div className="border-t border-gray-100 mt-1 pt-1">
              <button
                onClick={() => handleDeleteTask(task._id)}
                className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

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
            <button
              onClick={() => setShowCreateTask(true)}
              className="flex items-center gap-2 bg-gray-900 text-white font-medium px-4 py-2 rounded-lg hover:bg-gray-800"
            >
              <Plus size={18} />
              <span>Add Task</span>
            </button>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="p-6">
        {tasks.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <CheckSquare size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No tasks yet</h3>
            <p className="text-gray-500 mb-4">
              Create your first task to get started
            </p>
            <button
              onClick={() => setShowCreateTask(true)}
              className="inline-flex items-center gap-2 bg-gray-900 text-white font-medium px-4 py-2 rounded-lg hover:bg-gray-800"
            >
              <Plus size={18} />
              <span>Create Task</span>
            </button>
          </div>
        ) : (
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

                <div className="space-y-3 min-h-[200px]">
                  {groupedTasks[column.id].map((task) => (
                    <TaskCard key={task._id} task={task} />
                  ))}
                  {groupedTasks[column.id].length === 0 && (
                    <div className="text-center py-8 text-gray-400 text-sm">
                      No tasks
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setShowCreateTask(true)}
                  className="w-full mt-3 flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Plus size={18} />
                  <span className="font-medium">Add Task</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Task Modal */}
      <CreateTask
        open={showCreateTask}
        onClose={() => setShowCreateTask(false)}
        onSuccess={fetchTasks}
      />
    </div>
  );
};

export default TasksPage;
