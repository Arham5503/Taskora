import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Users,
  Plus,
  MoreVertical,
  CheckCircle,
  Clock,
  AlertCircle,
  Trash2,
  Copy,
  Check,
  X,
  UserMinus,
} from "lucide-react";
import {
  getProjectById,
  getTasksByProject,
  getProjectTeam,
  generateInviteLink,
  removeTeamMember,
  updateTaskStatus,
  deleteTask,
} from "../api/ApiBuilder";
import CreateTask from "../models/CreateTask";
import { toast } from "react-toastify";

export default function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [team, setTeam] = useState({ owner: null, team: [], isOwner: false });
  const [loading, setLoading] = useState(true);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteLink, setInviteLink] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("tasks");

  useEffect(() => {
    fetchProjectData();
  }, [projectId]);

  const fetchProjectData = async () => {
    try {
      const [projectData, tasksData, teamData] = await Promise.all([
        getProjectById(projectId),
        getTasksByProject(projectId),
        getProjectTeam(projectId),
      ]);
      setProject(projectData);
      setTasks(tasksData);
      setTeam(teamData);
    } catch (error) {
      console.error("Failed to fetch project data:", error);
      toast.error("Failed to load project");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateInvite = async () => {
    try {
      const response = await generateInviteLink(projectId);
      setInviteLink(response.inviteUrl);
      setShowInviteModal(true);
    } catch (error) {
      toast.error("Failed to generate invite link");
    }
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setLinkCopied(true);
    toast.success("Invite link copied!");
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleRemoveMember = async (memberId) => {
    if (!confirm("Remove this team member?")) return;
    try {
      await removeTeamMember(projectId, memberId);
      toast.success("Team member removed");
      fetchProjectData();
    } catch (error) {
      toast.error("Failed to remove member");
    }
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      toast.success("Task status updated");
      fetchProjectData();
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!confirm("Delete this task?")) return;
    try {
      await deleteTask(taskId);
      toast.success("Task deleted");
      fetchProjectData();
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "todo":
        return "bg-gray-100 text-gray-700";
      case "in_progress":
        return "bg-blue-100 text-blue-700";
      case "in_review":
        return "bg-yellow-100 text-yellow-700";
      case "done":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatStatus = (status) => {
    return status?.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "";
  };

  const groupedTasks = {
    todo: tasks.filter((t) => t.status === "todo"),
    in_progress: tasks.filter((t) => t.status === "in_progress"),
    in_review: tasks.filter((t) => t.status === "in_review"),
    done: tasks.filter((t) => t.status === "done"),
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Project Not Found
          </h2>
          <button
            onClick={() => navigate("/project")}
            className="text-blue-600 hover:underline"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigate("/project")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
            <p className="text-gray-600">{project.description}</p>
          </div>
          <div className="flex items-center gap-3">
            {team.isOwner && (
              <button
                onClick={handleGenerateInvite}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Users className="w-4 h-4" />
                Invite
              </button>
            )}
            <button
              onClick={() => setShowCreateTask(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Task
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">
              Deadline:{" "}
              {project.startDate
                ? new Date(
                    new Date(project.startDate).getTime() +
                      project.durationDays * 24 * 60 * 60 * 1000
                  ).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">{team.team?.length || 0} members</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">
              {project.completedTasks || 0}/{project.totalTasks || 0} tasks
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${project.progress || 0}%` }}
                ></div>
              </div>
              <span className="text-gray-600">{project.progress || 0}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex gap-6">
          {["tasks", "team"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-1 border-b-2 font-medium capitalize transition-colors ${
                activeTab === tab
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === "tasks" && (
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(groupedTasks).map(([status, statusTasks]) => (
              <div key={status} className="bg-gray-100 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 capitalize">
                    {formatStatus(status)}
                  </h3>
                  <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                    {statusTasks.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {statusTasks.map((task) => (
                    <div
                      key={task._id}
                      className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900 text-sm">
                          {task.title}
                        </h4>
                        <div className="relative group">
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <MoreVertical className="w-4 h-4 text-gray-400" />
                          </button>
                          <div className="hidden group-hover:block absolute right-0 top-6 bg-white rounded-lg shadow-lg border border-gray-200 py-1 w-36 z-10">
                            {status !== "done" && (
                              <button
                                onClick={() =>
                                  handleUpdateTaskStatus(
                                    task._id,
                                    status === "todo"
                                      ? "in_progress"
                                      : status === "in_progress"
                                      ? "in_review"
                                      : "done"
                                  )
                                }
                                className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                              >
                                Move to Next
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteTask(task._id)}
                              className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                      {task.description && (
                        <p className="text-gray-500 text-xs mb-3 line-clamp-2">
                          {task.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-xs px-2 py-1 rounded capitalize ${getPriorityColor(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>
                        {task.category && (
                          <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">
                            {task.category}
                          </span>
                        )}
                      </div>
                      {task.dueDate && (
                        <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                      )}
                      {task.assignees?.length > 0 && (
                        <div className="flex items-center gap-1 mt-3">
                          {task.assignees.slice(0, 3).map((assignee, idx) => (
                            <div
                              key={assignee._id || idx}
                              className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium border-2 border-white -ml-1 first:ml-0"
                              title={assignee.username || assignee.email}
                            >
                              {(assignee.username || assignee.email || "U")[0].toUpperCase()}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  {statusTasks.length === 0 && (
                    <div className="text-center py-8 text-gray-400 text-sm">
                      No tasks
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "team" && (
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Team Members</h3>
              {team.isOwner && (
                <button
                  onClick={handleGenerateInvite}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                >
                  <Plus className="w-4 h-4" />
                  Invite Member
                </button>
              )}
            </div>
            <div className="divide-y divide-gray-100">
              {/* Owner */}
              {team.owner && (
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-medium">
                      {(team.owner.username || team.owner.email || "O")[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {team.owner.username || "Unknown"}
                      </div>
                      <div className="text-sm text-gray-500">{team.owner.email}</div>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full font-medium">
                    Owner
                  </span>
                </div>
              )}
              {/* Team Members */}
              {team.team
                ?.filter((m) => m._id !== team.owner?._id)
                .map((member) => (
                  <div
                    key={member._id}
                    className="p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                        {(member.username || member.email || "M")[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {member.username || "Unknown"}
                        </div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                        Member
                      </span>
                      {team.isOwner && (
                        <button
                          onClick={() => handleRemoveMember(member._id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove member"
                        >
                          <UserMinus className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Create Task Modal */}
      <CreateTask
        open={showCreateTask}
        onClose={() => setShowCreateTask(false)}
        projectId={projectId}
        onSuccess={fetchProjectData}
      />

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Invite Team Member</h3>
              <button
                onClick={() => {
                  setShowInviteModal(false);
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
    </div>
  );
}
