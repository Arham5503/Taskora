import { useState, useEffect } from "react";
import { X, Calendar } from "lucide-react";
import { createTask, getProjects, getProjectTeam } from "../api/ApiBuilder";
import { toast } from "react-toastify";

export default function CreateTask({ open, onClose, projectId, onSuccess }) {
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    priority: "medium",
    dueDate: "",
    description: "",
    assignees: [],
    project: projectId || "",
    category: "General",
  });

  useEffect(() => {
    if (open) {
      fetchProjects();
      if (projectId) {
        setFormData((prev) => ({ ...prev, project: projectId }));
        fetchTeamMembers(projectId);
      }
    }
  }, [open, projectId]);

  useEffect(() => {
    if (formData.project) {
      fetchTeamMembers(formData.project);
    }
  }, [formData.project]);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  const fetchTeamMembers = async (projId) => {
    try {
      const data = await getProjectTeam(projId);
      setTeamMembers(data.team || []);
    } catch (error) {
      console.error("Failed to fetch team:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.project) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      await createTask({
        title: formData.title,
        description: formData.description,
        priority: formData.priority.toLowerCase(),
        dueDate: formData.dueDate || null,
        project: formData.project,
        assignees: formData.assignees,
        category: formData.category,
      });
      toast.success("Task created successfully!");
      setFormData({
        title: "",
        priority: "medium",
        dueDate: "",
        description: "",
        assignees: [],
        project: projectId || "",
        category: "General",
      });
      onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  const handleAssigneeToggle = (memberId) => {
    setFormData((prev) => ({
      ...prev,
      assignees: prev.assignees.includes(memberId)
        ? prev.assignees.filter((id) => id !== memberId)
        : [...prev.assignees, memberId],
    }));
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Create New Task
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Add a new task to your project.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
          {/* Project Selection */}
          {!projectId && (
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Project <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.project}
                onChange={(e) =>
                  setFormData({ ...formData, project: e.target.value, assignees: [] })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                required
              >
                <option value="">Select a project</option>
                {projects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Task Title */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter task title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            >
              <option value="General">General</option>
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Research">Research</option>
              <option value="Bug Fix">Bug Fix</option>
              <option value="Feature">Feature</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Priority
            </label>
            <div className="flex gap-6">
              {["low", "medium", "high"].map((priority) => (
                <label
                  key={priority}
                  className="flex items-center cursor-pointer"
                >
                  <input
                    type="radio"
                    name="priority"
                    value={priority}
                    checked={formData.priority === priority}
                    onChange={(e) =>
                      setFormData({ ...formData, priority: e.target.value })
                    }
                    className="w-4 h-4 mr-2"
                  />
                  <span
                    className={`text-sm font-medium capitalize ${
                      priority === "low"
                        ? "text-green-600"
                        : priority === "medium"
                          ? "text-blue-600"
                          : "text-red-600"
                    }`}
                  >
                    {priority}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Due Date
            </label>
            <div className="relative">
              <Calendar
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Description
            </label>
            <textarea
              placeholder="Enter task description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Assignees */}
          {formData.project && teamMembers.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Assign To
              </label>
              <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-2">
                {teamMembers.map((member) => (
                  <label
                    key={member._id}
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.assignees.includes(member._id)}
                      onChange={() => handleAssigneeToggle(member._id)}
                      className="w-4 h-4 rounded"
                    />
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                      {(member.username || member.email || "U")[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {member.username || "Unknown"}
                      </div>
                      <div className="text-xs text-gray-500">{member.email}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
