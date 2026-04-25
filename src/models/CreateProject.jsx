import React, { useEffect, useState } from "react";
import { X, Plus, Search } from "lucide-react";
import { toast } from "react-toastify";

export default function CreateProject({ open, onClose, onSuccess }) {
  const [days, setDays] = useState(1);
  const [due, setDue] = useState("days");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    client: "",
    priority: "low",
    durationDays: 1,
  });

  // Real users state
  const [allUsers, setAllUsers] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Fetch all users when modal opens
  useEffect(() => {
    if (!open) return;
    const fetchUsers = async () => {
      setLoadingUsers(true);
      try {
        const res = await fetch("http://localhost:2004/api/users", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          // Initialize each user with a 'selected' property and default role
          const usersWithSelection = data.map((user) => ({
            ...user,
            selected: false,
            role: "viewer", // default role
          }));
          setAllUsers(usersWithSelection);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load users");
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, [open]);

  // Duration calculation
  useEffect(() => {
    if (!days || days <= 0) return;
    const multipliers = { days: 1, weeks: 7, months: 30, years: 365 };
    setFormData((prev) => ({
      ...prev,
      durationDays: Number(days) * (multipliers[due] || 1),
    }));
  }, [days, due]);

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle checkbox selection for team member
  const handleMemberSelection = (userId, isSelected) => {
    setAllUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, selected: isSelected } : user,
      ),
    );

    if (isSelected) {
      // Add to selected team
      const user = allUsers.find((u) => u._id === userId);
      if (user && !selectedTeam.find((m) => m._id === userId)) {
        setSelectedTeam((prev) => [
          ...prev,
          {
            _id: user._id,
            username: user.username,
            email: user.email,
            profile: user.profile,
            title: user.title,
            role: user.role || "viewer",
          },
        ]);
      }
    } else {
      // Remove from selected team
      setSelectedTeam((prev) => prev.filter((m) => m._id !== userId));
    }
  };

  // Change role/permission of a selected member
  const changePermission = (userId, permission) => {
    // Update in allUsers
    setAllUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, role: permission } : user,
      ),
    );

    // Update in selectedTeam
    setSelectedTeam((prev) =>
      prev.map((m) => (m._id === userId ? { ...m, role: permission } : m)),
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.description ||
      !formData.priority ||
      !formData.durationDays
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const payload = {
        ...formData,
        team: selectedTeam.map((m) => ({
          _id: m._id,
          permission: m.role,
        })),
      };

      const res = await fetch("http://localhost:2004/api/project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (res.ok) {
        toast.success("Project created successfully!");
        setFormData({
          title: "",
          description: "",
          priority: "low",
          durationDays: 1,
          client: "",
        });
        setSelectedTeam([]);
        setAllUsers([]);
        setDays(1);
        setDue("days");
        onClose();
        if (onSuccess) onSuccess();
      } else {
        const error = await res.json();
        toast.error(error.message || "Failed to create project");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while creating the project");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg w-full max-w-4xl mx-auto z-50 max-h-[98vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="px-5 py-3 border-b flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Create New Project
            </h2>
            <p className="text-gray-500 mt-1">
              Fill in the details to create a new project.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Left Column */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1">
                Project name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Project name"
                name="title"
                value={formData.title}
                onChange={handleFormData}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="block text-sm font-semibold text-gray-900 mt-3 mb-1">
                Project Description <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Short description"
                name="description"
                value={formData.description}
                onChange={handleFormData}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Team Section */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Team
                </h3>

                {/* Selected members list */}
                <div className="space-y-2 mb-3 max-h-96 overflow-y-auto">
                  {loadingUsers ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                      <p className="text-sm text-gray-500 mt-2">
                        Loading users...
                      </p>
                    </div>
                  ) : (
                    allUsers.map((user) => (
                      <div
                        key={user._id}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {/* Checkbox for selection */}
                          <input
                            type="checkbox"
                            checked={user.selected || false}
                            onChange={(e) =>
                              handleMemberSelection(user._id, e.target.checked)
                            }
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                          />

                          {/* Avatar */}
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-sm overflow-hidden">
                            {user.profile ? (
                              <img
                                src={user.profile}
                                alt={user.username}
                                className="w-full h-full object-cover rounded-full"
                              />
                            ) : (
                              user.username.slice(0, 2).toUpperCase()
                            )}
                          </div>

                          {/* User Info */}
                          <div>
                            <div className="font-semibold text-gray-900">
                              {user.username}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.title || user.email}
                            </div>
                          </div>
                        </div>

                        {/* Role Selector - Only show if user is selected */}
                        {user.selected && (
                          <div className="flex items-center gap-2">
                            <select
                              value={user.role || "viewer"}
                              onChange={(e) =>
                                changePermission(user._id, e.target.value)
                              }
                              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                            >
                              <option value="owner">Owner</option>
                              <option value="manager">Manager</option>
                              <option value="contributor">Contributor</option>
                              <option value="viewer">Viewer</option>
                            </select>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                  {!loadingUsers && allUsers.length === 0 && (
                    <p className="text-sm text-gray-400 italic text-center py-8">
                      No users found
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  Client <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Client name"
                  name="client"
                  value={formData.client}
                  onChange={handleFormData}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  Priority <span className="text-red-500">*</span>
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleFormData}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  Duration <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min={1}
                    placeholder="Enter duration"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <select
                    value={due}
                    onChange={(e) => setDue(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="months">Months</option>
                    <option value="years">Years</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t flex items-center justify-between sticky bottom-0 bg-white z-10">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 text-gray-700 font-semibold hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 cursor-pointer"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
}
