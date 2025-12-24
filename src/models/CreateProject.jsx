import React, { useState } from "react";
import { X, Upload, Plus } from "lucide-react";

export default function CreateProject({ open, onClose }) {
  // const [isModalOpen, setIsModalOpen] = useState(showModel);
  const [projectName, setProjectName] = useState("");
  const [activeTab, setActiveTab] = useState("upload");

  const teamMembers = [
    {
      name: "Courtney Henry",
      role: "Data Analyst Lead",
      avatar: "👨‍💼",
      permission: "Owner",
    },
    {
      name: "Cameron Williamson",
      role: "Software Engineer",
      avatar: "👨‍💻",
      permission: "Editor",
    },
    {
      name: "Leslie Alexander",
      role: "UX Designer",
      avatar: "👩‍🎨",
      permission: "Viewer",
    },
  ];

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="bg-white rounded-lg w-full max-w-4xl mx-4 z-50 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="px-5 py-2 border-b">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Create New Project
              </h2>
              <p className="text-gray-500 mt-1">
                Fill in the details to create a new project.
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="px-5 py-3">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Left Column */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Project name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Team Section */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Team
                </h3>
                <div className="space-y-2">
                  {teamMembers.map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
                          {member.avatar}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            {member.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {member.role}
                          </div>
                        </div>
                      </div>
                      <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>{member.permission}</option>
                        <option>Owner</option>
                        <option>Editor</option>
                        <option>Viewer</option>
                      </select>
                    </div>
                  ))}
                </div>

                <button className="mt-2 flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700">
                  <Plus size={20} />
                  Add Team Member
                </button>
              </div>
            </div>

            {/* Right Column - Logo Upload */}
            <div>
              <div className="flex gap-4 mb-3">
                <button
                  onClick={() => setActiveTab("upload")}
                  className={`px-4 py-2 font-semibold ${
                    activeTab === "upload"
                      ? "text-gray-900 border-b-2 border-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  Upload logo
                </button>
                <button
                  onClick={() => setActiveTab("emoji")}
                  className={`px-4 py-2 font-semibold ${
                    activeTab === "emoji"
                      ? "text-gray-900 border-b-2 border-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  Emoji
                </button>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center text-center hover:border-blue-400 cursor-pointer transition">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Upload className="text-gray-400" size={24} />
                </div>
                <div className="font-semibold text-gray-900 mb-1">
                  Upload project logo
                </div>
                <div className="text-sm text-gray-500">
                  Min 600×600, PNG or JPEG
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-700 font-semibold hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button className="px-6 py-2 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
