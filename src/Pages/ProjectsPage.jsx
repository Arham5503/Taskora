import CreateProject from "../models/CreateProject";
import { useEffect, useState, useRef } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
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
  Users,
  Link,
  Copy,
  Check,
  X,
  Trash2,
} from "lucide-react";
import { getProjects, updateProjectStatus, deleteProject, generateInviteLink } from "../api/ApiBuilder";
import { toast } from "react-toastify";

function ProjectsPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("grid");
  const [activeActionMenu, setActiveActionMenu] = useState(null);
  const [showStatusMenu, setShowStatusMenu] = useState(null);
  const [showInviteModal, setShowInviteModal] = useState(null);
  const [inviteLink, setInviteLink] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const { showCreateModel, setShowCreateModel } = useOutletContext();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const menuRef = useRef(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveActionMenu(null);
        setShowStatusMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function fetchProjects() {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const toggleActions = (projectId, e) => {
    e.stopPropagation();
    setActiveActionMenu(activeActionMenu === projectId ? null : projectId);
    setShowStatusMenu(null);
  };

  // Get date from duration days
  const dateFinder = (days, startDate) => {
    if (typeof days !== "number") return "N/A";
    const start = startDate ? new Date(startDate) : new Date();
    const futureDate = new Date(start);
    futureDate.setDate(futureDate.getDate() + days);
    return futureDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Handle view details
  const handleViewDetails = (projectId) => {
    navigate(`/project/${projectId}`);
    setActiveActionMenu(null);
  };

  // Handle status change
  const handleStatusChange = async (projectId, newStatus) => {
    try {
      await updateProjectStatus(projectId, newStatus);
      toast.success(`Project status updated to ${newStatus.replace("_", " ")}`);
      fetchProjects();
    } catch (error) {
      toast.error("Failed to update project status");
    }
    setActiveActionMenu(null);
    setShowStatusMenu(null);
  };

  // Handle project deletion
  const handleDeleteProject = async (projectId) => {
    try {
      await deleteProject(projectId);
      toast.success("Project deleted successfully");
      fetchProjects();
    } catch (error) {
      toast.error("Failed to delete project");
    }
    setShowDeleteConfirm(null);
    setActiveActionMenu(null);
  };

  // Handle generate invite link
  const handleGenerateInvite = async (projectId) => {
    try {
      const response = await generateInviteLink(projectId);
      setInviteLink(response.inviteUrl);
      setShowInviteModal(projectId);
    } catch (error) {
      toast.error("Failed to generate invite link");
    }
    setActiveActionMenu(null);
  };

  // Copy invite link
  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setLinkCopied(true);
    toast.success("Invite link copied!");
    setTimeout(() => setLinkCopied(false), 2000);
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "planning":
        return "bg-blue-50 text-blue-700";
      case "in_progress":
        return "bg-yellow-50 text-yellow-700";
      case "completed":
        return "bg-green-50 text-green-700";
      case "on_hold":
        return "bg-orange-50 text-orange-700";
      case "archived":
        return "bg-gray-50 text-gray-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  // Format status text
  const formatStatus = (status) => {
    return status?.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "Planning";
  };

  // Filter projects by search
  const filteredProjects = projects.filter((project) =>
    project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.client?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="w-full bg-gray-50 border-b border-gray-200 p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Left Section - Search */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

      <div className="min-h-screen bg-gray-50 px-4 flex py-4">
        {loading ? (
          <div className="w-full flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <div
                  key={project._id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 max-w-[450px] relative cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleViewDetails(project._id)}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start gap-3 flex-1">
                      <div
                        className={`w-1 h-16 rounded-full mr-2 ${
                          project.priority === "high"
                            ? "bg-red-500"
                            : project.priority === "medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-xl font-semibold text-gray-900">
                            {project.title}
                          </h2>
                          {project.isStarred && (
                            <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                          )}
                        </div>
                        <p className="text-gray-500 text-sm line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${getStatusColor(project.status)}`}>
                      {formatStatus(project.status)}
                    </span>
                  </div>

                  {/* Deadline */}
                  <div className="flex items-center gap-2 text-gray-600 mb-6">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      Deadline: {dateFinder(project.durationDays, project.startDate)}
                    </span>
                    <button
                      onClick={(e) => toggleActions(project._id, e)}
                      className="ml-auto p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  {/* Progress Section */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{project.progress || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div
                        className="bg-gray-900 h-2 rounded-full transition-all"
                        style={{ width: `${project.progress || 0}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center gap-2">
                      {project.team?.slice(0, 3).map((member, index) => (
                        <div
                          key={member._id || index}
                          className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium border-2 border-white -ml-2 first:ml-0"
                          title={member.username || member.email}
                        >
                          {(member.username || member.email || "U")[0].toUpperCase()}
                        </div>
                      ))}
                      {project.team?.length > 3 && (
                        <span className="text-sm text-gray-500">
                          +{project.team.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Client and Tasks */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Client</div>
                      <div className="font-semibold text-gray-900">
                        {project.client || "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Tasks</div>
                      <div className="font-semibold text-gray-900">
                        {project.completedTasks || 0}/{project.totalTasks || 0}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Start Date</div>
                      <div className="font-semibold text-gray-900">
                        {project.startDate
                          ? new Date(project.startDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "N/A"}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Priority</div>
                      <span
                        className={`inline-block px-3 py-1 text-sm rounded-full font-medium capitalize ${
                          project.priority === "high"
                            ? "bg-red-50 text-red-600"
                            : project.priority === "medium"
                            ? "bg-yellow-50 text-yellow-600"
                            : "bg-green-50 text-green-600"
                        }`}
                      >
                        {project.priority}
                      </span>
                    </div>
                  </div>

                  {/* Actions Dropdown */}
                  {activeActionMenu === project._id && (
                    <div
                      ref={menuRef}
                      className="absolute right-6 top-24 bg-white rounded-lg shadow-lg border border-gray-200 py-2 w-56 z-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="px-3 py-2 text-sm font-semibold text-gray-900 border-b border-gray-100">
                        Project Actions
                      </div>
                      <button
                        onClick={() => handleViewDetails(project._id)}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                      >
                        <FileText className="w-4 h-4" />
                        View Details
                      </button>
                      <button
                        onClick={() => handleGenerateInvite(project._id)}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                      >
                        <Users className="w-4 h-4" />
                        Invite Team Member
                      </button>
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowStatusMenu(showStatusMenu === project._id ? null : project._id);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                        >
                          <Clock className="w-4 h-4" />
                          Change Status
                        </button>
                        {showStatusMenu === project._id && (
                          <div className="absolute left-full top-0 ml-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 w-40">
                            {["planning", "in_progress", "completed", "on_hold", "archived"].map(
                              (status) => (
                                <button
                                  key={status}
                                  onClick={() => handleStatusChange(project._id, status)}
                                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                                    project.status === status
                                      ? "text-blue-600 font-medium"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {formatStatus(status)}
                                </button>
                              )
                            )}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleStatusChange(project._id, "completed")}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Mark as Completed
                      </button>
                      <button
                        onClick={() => handleStatusChange(project._id, "on_hold")}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                      >
                        <PauseCircle className="w-4 h-4" />
                        Put on Hold
                      </button>
                      <button
                        onClick={() => handleStatusChange(project._id, "archived")}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                      >
                        <Archive className="w-4 h-4" />
                        Archive Project
                      </button>
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button
                          onClick={() => setShowDeleteConfirm(project._id)}
                          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete Project
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-20 text-gray-500">
                {searchQuery ? "No projects match your search" : "No Projects Created Yet"}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Invite Team Member</h3>
              <button
                onClick={() => {
                  setShowInviteModal(null);
                  setInviteLink("");
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-500 text-sm mb-4">
              Share this link with your team member to invite them to the project.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={inviteLink}
                readOnly
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
              />
              <button
                onClick={copyInviteLink}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 flex items-center gap-2"
              >
                {linkCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {linkCopied ? "Copied!" : "Copy"}
              </button>
            </div>
            <p className="text-gray-400 text-xs mt-3">
              This link will expire in 7 days.
            </p>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold mb-2">Delete Project?</h3>
            <p className="text-gray-500 text-sm mb-4">
              This action cannot be undone. All tasks and data associated with this
              project will be permanently deleted.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProject(showDeleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <CreateProject
        open={showCreateModel}
        onClose={() => setShowCreateModel(false)}
        onSuccess={fetchProjects}
      />
    </>
  );
}

export default ProjectsPage;
