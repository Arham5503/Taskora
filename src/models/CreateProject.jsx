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
  const [allUsers, setAllUsers] = useState([]); // all users from DB
  const [selectedTeam, setSelectedTeam] = useState([]); // picked members: [{_id, username, title, profile, permission}]
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
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
          setAllUsers(data);
        }
      } catch (err) {
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

  // Add a user to selected team
  const addMember = (user) => {
    if (selectedTeam.find((m) => m._id === user._id)) return; // already added
    setSelectedTeam((prev) => [...prev, { ...user, permission: "editor" }]);
    setSearchQuery("");
    setShowDropdown(false);
  };

  // Remove a member from team
  const removeMember = (userId) => {
    setSelectedTeam((prev) => prev.filter((m) => m._id !== userId));
  };

  // Change permission of a selected member
  const changePermission = (userId, permission) => {
    setSelectedTeam((prev) =>
      prev.map((m) => (m._id === userId ? { ...m, permission } : m)),
    );
  };

  // Users NOT already selected, filtered by search
  const filteredUsers = allUsers.filter(
    (u) =>
      !selectedTeam.find((m) => m._id === u._id) &&
      (u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())),
  );

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
        team: selectedTeam.map((m) => m._id), // send only IDs
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
        setDays(1);
        setDue("days");
        onClose();
        if (onSuccess) onSuccess();
      } else {
        toast.error("Failed to create project");
      }
    } catch (error) {
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
        <div className="px-5 py-3 border-b flex items-center justify-between">
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
                <div className="space-y-2 mb-3">
                  {selectedTeam.length === 0 && (
                    <p className="text-sm text-gray-400 italic">
                      No team members added yet.
                    </p>
                  )}
                  {selectedTeam.map((member) => (
                    <div
                      key={member._id}
                      className="flex items-center justify-between p-2 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {/* Avatar: profile image or initials */}
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-sm overflow-hidden">
                          {member.profile ? (
                            <img
                              src={member.profile}
                              alt={member.username}
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            member.username.slice(0, 2).toUpperCase()
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            {member.username}
                          </div>
                          <div className="text-sm text-gray-500">
                            {member.title || member.email}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={member.permission}
                          onChange={(e) =>
                            changePermission(member._id, e.target.value)
                          }
                          className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        >
                          <option value="owner">Owner</option>
                          <option value="editor">Editor</option>
                          <option value="viewer">Viewer</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => removeMember(member._id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Search & Add member */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowDropdown((v) => !v)}
                    className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 cursor-pointer"
                  >
                    <Plus size={20} />
                    Add Team Member
                  </button>

                  {showDropdown && (
                    <div className="absolute left-0 top-8 z-50 w-72 bg-white border border-gray-200 rounded-lg shadow-lg">
                      <div className="p-2 border-b flex items-center gap-2">
                        <Search size={16} className="text-gray-400" />
                        <input
                          autoFocus
                          type="text"
                          placeholder="Search by name or email..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="flex-1 text-sm outline-none"
                        />
                      </div>
                      <div className="max-h-48 overflow-y-auto">
                        {loadingUsers && (
                          <p className="text-sm text-gray-400 p-3">
                            Loading users...
                          </p>
                        )}
                        {!loadingUsers && filteredUsers.length === 0 && (
                          <p className="text-sm text-gray-400 p-3">
                            No users found.
                          </p>
                        )}
                        {filteredUsers.map((user) => (
                          <button
                            key={user._id}
                            type="button"
                            onClick={() => addMember(user)}
                            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 text-left"
                          >
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-xs overflow-hidden">
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
                            <div>
                              <div className="text-sm font-semibold text-gray-900">
                                {user.username}
                              </div>
                              <div className="text-xs text-gray-500">
                                {user.title || user.email}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
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
        <div className="px-5 py-3 border-t flex items-center justify-between">
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
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
