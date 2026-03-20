import React, { useEffect, useState } from "react";
import { X, Upload, Plus } from "lucide-react";
import { toast } from "react-toastify";

export default function CreateProject({ open, onClose, onSuccess }) {
  // const [isModalOpen, setIsModalOpen] = useState(showModel);
  const [activeTab, setActiveTab] = useState("upload");
  const [days, setDays] = useState(1);
  const [due, setDue] = useState("days");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    client: "",
    priority: "low",
    durationDays: 1,
  });

  useEffect(() => {
    let calculatedDays = 0;
    if (!days || days <= 0) return;
    switch (due) {
      case "days":
        calculatedDays = Number(days);
        break;
      case "weeks":
        calculatedDays = Number(days) * 7;
        break;
      case "months":
        calculatedDays = Number(days) * 30;
        break;
      case "years":
        calculatedDays = Number(days) * 365;
        break;

      default:
        calculatedDays = Number(days);
        break;
    }
    setFormData((prev) => ({
      ...prev,
      durationDays: calculatedDays,
    }));
  }, [days, due]);

  const handelFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
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
      const res = await fetch("http://localhost:2004/api/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      if (res.ok) {
        toast.success("Project created successfully!");
        setFormData({ title: "", description: "", priority: "low", durationDays: 1, client: "" });
        setDays(1);
        setDue("days");
        onClose();
        if (onSuccess) onSuccess();
      } else {
        toast.error("Failed to create project");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while creating the project");
    }
  };
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="bg-white rounded-lg w-full max-w-4xl mx-auto z-50 max-h-[98vh] overflow-y-auto"
      >
        {/* Modal Header */}
        <div className="px-5 py-1 border-b">
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
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="px-5 py-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Left Column */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Project name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Project name"
                name="title"
                value={formData.title}
                onChange={handelFormData}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="block text-sm font-semibold text-gray-900 my-2">
                Project Discription<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Short Discription"
                name="description"
                value={formData.description}
                onChange={handelFormData}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Team Section */}
              <div className="mt-3">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Team
                </h3>
                <div className="space-y-2">
                  {teamMembers.map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 border border-gray-200 rounded-lg "
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
                      <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                        <option>{member.permission}</option>
                        <option>Owner</option>
                        <option>Editor</option>
                        <option>Viewer</option>
                      </select>
                    </div>
                  ))}
                </div>

                <button className="mt-2 flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 cursor-pointer">
                  <Plus size={20} />
                  Add Team Member
                </button>
              </div>
            </div>

            {/* Right Column - Logo Upload */}
            <div>
              {/* <div>
                <div className="flex gap-4 mb-2">
                  <button
                    onClick={() => setActiveTab("upload")}
                    className={`px-4 py-2 cursor-pointer font-semibold ${
                      activeTab === "upload"
                        ? "text-gray-900 border-b-2 border-blue-600"
                        : "text-gray-500"
                    }`}
                  >
                    Upload logo
                  </button>
                  <button
                    onClick={() => setActiveTab("emoji")}
                    className={`px-4 cursor-pointer py-2 font-semibold ${
                      activeTab === "emoji"
                        ? "text-gray-900 border-b-2 border-blue-600"
                        : "text-gray-500"
                    }`}
                  >
                    Emoji
                  </button>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-7 flex flex-col items-center justify-center text-center hover:border-blue-400 cursor-pointer transition">
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
              </div> */}
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Client<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Client name"
                name="client"
                value={formData.client}
                onChange={handelFormData}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Priority<span className="text-red-500">*</span>
              </label>

              <select
                name="priority"
                id=""
                value={formData.priority}
                onChange={handelFormData}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Duration<span className="text-red-500">*</span>
              </label>
              <span className="flex gap-2">
                <input
                  type="number"
                  name="days"
                  min={1}
                  placeholder="Enter Duration"
                  value={days}
                  onChange={(e) => {
                    setDays(e.target.value);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  name="due"
                  id="due"
                  value={due}
                  onChange={(e) => {
                    setDue(e.target.value);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="days" selected>
                    Days
                  </option>
                  <option value="weeks">Weeks</option>
                  <option value="years">Years</option>
                </select>
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-2 border-t flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-700 font-semibold hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            Cancel
          </button>
          <button className="px-6 py-2 cursor-pointer bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
