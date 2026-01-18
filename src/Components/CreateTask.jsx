import { useState } from "react";
import { X, Calendar } from "lucide-react";

export default function CreateProjectModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    priority: "Medium",
    dueDate: "",
    description: "",
    assignees: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Project data:", formData);
    // Handle project creation logic here
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Create New Project
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Add a new project to the todo column.
            </p>
          </div>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          {/* Project Title */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Project Title
            </label>
            <input
              type="text"
              placeholder="Enter project title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2.5 border-2 border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Project Type */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Project Type
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            >
              <option value="">Select project type</option>
              <option value="development">Development</option>
              <option value="design">Design</option>
              <option value="marketing">Marketing</option>
              <option value="research">Research</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Priority
            </label>
            <div className="flex gap-6">
              {["Low", "Medium", "High"].map((priority) => (
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
                    className={`text-sm font-medium ${
                      priority === "Low"
                        ? "text-green-600"
                        : priority === "Medium"
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
                placeholder="Select a date"
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
              placeholder="Enter project description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Assignees */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Assignees
            </label>
            <select
              multiple
              value={formData.assignees}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  assignees: Array.from(
                    e.target.selectedOptions,
                    (option) => option.value,
                  ),
                })
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            >
              <option value="">Select team members</option>
              <option value="john">John Doe</option>
              <option value="jane">Jane Smith</option>
              <option value="mike">Mike Johnson</option>
              <option value="sarah">Sarah Williams</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Create Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
