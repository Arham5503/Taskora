import CreateProject from "../models/CreateProject";
import React, { useState } from "react";

import {
  Search,
  Filter,
  Grid3x3,
  List,
  Star,
  Calendar,
  Clock,
  FileText,
  CheckCircle,
  PauseCircle,
  Archive,
  MoreVertical,
  ListChecks,
  Activity,
} from "lucide-react";
function ProjectsPage() {
  const [viewMode, setViewMode] = useState("grid");
  const [showActions, setShowActions] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const toggleActions = () => setShowActions(!showActions);
  const toggleDetails = () => setShowDetails(!showDetails);

  return (
    <>
      {/* <CreateProject /> */}

      <div className="w-full bg-gray-50 border-b border-gray-200 p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Left Section - Search */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                className="pl-10 pr-4 py-2.5 w-80 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Dropdown */}
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span className="font-medium">All Projects</span>
            </button>
          </div>

          {/* Right Section - View Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-white border border-gray-300 shadow-sm"
                  : "hover:bg-gray-100"
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
              <span className="font-medium">Grid</span>
            </button>

            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-white border border-gray-300 shadow-sm"
                  : "hover:bg-gray-100"
              }`}
            >
              <List className="w-4 h-4" />
              <span className="font-medium">List</span>
            </button>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="grid grid-cols-2 w-full space-y-4">
          {/* Card with Actions Menu */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 relative">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-1 h-16 bg-yellow-500 rounded-full -ml-6 mr-2"></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Figma Design System
                    </h2>
                    <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  </div>
                  <p className="text-gray-500 text-sm">
                    UI component library for design system
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-yellow-50 text-yellow-700 text-sm rounded-full whitespace-nowrap">
                In Progress
              </span>
            </div>

            {/* Deadline */}
            <div className="flex items-center gap-2 text-gray-600 mb-6">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Deadline: Nov 15, 2023</span>
              <button
                onClick={toggleActions}
                className="ml-auto p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Progress Section */}
            <div className="mb-6">
              <div className="text-sm text-gray-600 mb-2">Progress</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                  className="bg-gray-900 h-2 rounded-full"
                  style={{ width: "65%" }}
                ></div>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="https://i.pravatar.cc/40?img=1"
                  alt="Team member"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <img
                  src="https://i.pravatar.cc/40?img=5"
                  alt="Team member"
                  className="w-8 h-8 rounded-full border-2 border-white -ml-2"
                />
                <img
                  src="https://i.pravatar.cc/40?img=3"
                  alt="Team member"
                  className="w-8 h-8 rounded-full border-2 border-white -ml-2"
                />
              </div>
            </div>

            {/* Client and Start Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Client</div>
                <div className="font-semibold text-gray-900">Acme Inc.</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Start Date</div>
                <div className="font-semibold text-gray-900">Oct 1, 2023</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Start Date</div>
                <div className="font-semibold text-gray-900">Oct 1, 2023</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Priority</div>
                <span className="inline-block px-3 py-1 bg-red-50 text-red-600 text-sm rounded-full font-medium">
                  High
                </span>
              </div>
            </div>

            {/* Actions Dropdown */}
            {showActions && (
              <div className="absolute right-6 top-24 bg-white rounded-lg shadow-lg border border-gray-200 py-2 w-56 z-10">
                <div className="px-3 py-2 text-sm font-semibold text-gray-900 border-b border-gray-100">
                  Project Actions
                </div>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                  <FileText className="w-4 h-4" />
                  View Details
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                  <Clock className="w-4 h-4" />
                  View Timeline
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  Remove Star
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                  <Clock className="w-4 h-4" />
                  Change Status
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                  <CheckCircle className="w-4 h-4" />
                  Mark as Completed
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                  <PauseCircle className="w-4 h-4" />
                  Put on Hold
                </button>
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3">
                    <Archive className="w-4 h-4" />
                    Archive Project
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default ProjectsPage;
