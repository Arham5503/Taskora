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

const TASK_STATUS_STYLES = {
  todo: { bg: "#F3F4F6", text: "#374151" },
  in_progress: { bg: "#DBEAFE", text: "#1D4ED8" },
  in_review: { bg: "#FEF9C3", text: "#A16207" },
  done: { bg: "#DCFCE7", text: "#15803D" },
};
const PRIORITY_STYLES = {
  high: { bg: "#FEE2E2", text: "#DC2626" },
  medium: { bg: "#FEF9C3", text: "#CA8A04" },
  low: { bg: "#DCFCE7", text: "#16A34A" },
};
const COLUMN_COLORS = {
  todo: "#F3F4F6",
  in_progress: "#EFF6FF",
  in_review: "#FEFCE8",
  done: "#F0FDF4",
};

function formatStatus(status) {
  return (
    status?.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase()) || ""
  );
}

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
  const [openTaskMenu, setOpenTaskMenu] = useState(null);

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
      console.error(error);
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
    } catch {
      toast.error("Failed to generate invite link");
    }
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setLinkCopied(true);
    toast.success("Copied!");
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleRemoveMember = async (memberId) => {
    if (!confirm("Remove this team member?")) return;
    try {
      await removeTeamMember(projectId, memberId);
      toast.success("Member removed");
      fetchProjectData();
    } catch {
      toast.error("Failed to remove member");
    }
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      toast.success("Task updated");
      fetchProjectData();
    } catch {
      toast.error("Failed to update task");
    }
    setOpenTaskMenu(null);
  };

  const handleDeleteTask = async (taskId) => {
    if (!confirm("Delete this task?")) return;
    try {
      await deleteTask(taskId);
      toast.success("Task deleted");
      fetchProjectData();
    } catch {
      toast.error("Failed to delete task");
    }
    setOpenTaskMenu(null);
  };

  const groupedTasks = {
    todo: tasks.filter((t) => t.status === "todo"),
    in_progress: tasks.filter((t) => t.status === "in_progress"),
    in_review: tasks.filter((t) => t.status === "in_review"),
    done: tasks.filter((t) => t.status === "done"),
  };

  const NEXT_STATUS = {
    todo: "in_progress",
    in_progress: "in_review",
    in_review: "done",
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
        }}
      >
        <div
          style={{
            width: "3rem",
            height: "3rem",
            borderRadius: "50%",
            border: "3px solid #E5E7EB",
            borderTopColor: "#111827",
            animation: "spin 0.7s linear infinite",
          }}
        />
      </div>
    );
  }

  if (!project) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              marginBottom: "0.5rem",
            }}
          >
            Project Not Found
          </h2>
          <button
            onClick={() => navigate("/project")}
            style={{
              color: "#2563EB",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const deadline = project.startDate
    ? new Date(
        new Date(project.startDate).getTime() + project.durationDays * 86400000,
      ).toLocaleDateString()
    : "N/A";

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F9FAFB" }}>
      {/* Page header */}
      <div
        style={{
          backgroundColor: "#fff",
          borderBottom: "1px solid #E5E7EB",
          padding: "1rem 1.25rem",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
            gap: "0.75rem",
            marginBottom: "1rem",
          }}
        >
          <button
            onClick={() => navigate("/project")}
            style={{
              padding: "0.4rem",
              borderRadius: "0.5rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#374151",
              display: "flex",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <ArrowLeft size={20} />
          </button>
          <div style={{ flex: 1, minWidth: "10rem" }}>
            <h1
              style={{
                fontSize: "clamp(1.125rem, 3vw, 1.5rem)",
                fontWeight: 700,
                color: "#111827",
                margin: "0 0 0.25rem",
              }}
            >
              {project.title}
            </h1>
            <p style={{ fontSize: "0.875rem", color: "#6B7280", margin: 0 }}>
              {project.description}
            </p>
          </div>
          {/* Action buttons */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              flexShrink: 0,
            }}
          >
            {team.isOwner && (
              <button onClick={handleGenerateInvite} style={outlineBtnStyle}>
                <Users size={14} /> Invite
              </button>
            )}
            <button
              onClick={() => setShowCreateTask(true)}
              style={primaryBtnStyle}
            >
              <Plus size={14} /> Add Task
            </button>
          </div>
        </div>

        {/* Stats row — scrollable on mobile */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            fontSize: "0.8125rem",
            color: "#6B7280",
            alignItems: "center",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}
          >
            <Calendar size={14} style={{ color: "#9CA3AF" }} />
            Deadline: {deadline}
          </div>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}
          >
            <Users size={14} style={{ color: "#9CA3AF" }} />
            {team.team?.length || 0} members
          </div>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}
          >
            <CheckCircle size={14} style={{ color: "#9CA3AF" }} />
            {project.completedTasks || 0}/{project.totalTasks || 0} tasks
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              flex: 1,
              minWidth: "8rem",
            }}
          >
            <div
              style={{
                flex: 1,
                height: "0.375rem",
                backgroundColor: "#E5E7EB",
                borderRadius: "9999px",
                overflow: "hidden",
                maxWidth: "12rem",
              }}
            >
              <div
                style={{
                  height: "100%",
                  backgroundColor: "#22C55E",
                  width: `${project.progress || 0}%`,
                  borderRadius: "9999px",
                  transition: "width 0.3s",
                }}
              />
            </div>
            <span>{project.progress || 0}%</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          backgroundColor: "#fff",
          borderBottom: "1px solid #E5E7EB",
          padding: "0 1.25rem",
        }}
      >
        <div style={{ display: "flex", gap: "0" }}>
          {["tasks", "team"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "0.75rem 1rem",
                border: "none",
                background: "none",
                cursor: "pointer",
                fontSize: "0.9375rem",
                fontWeight: 500,
                textTransform: "capitalize",
                color: activeTab === tab ? "#111827" : "#6B7280",
                borderBottom:
                  activeTab === tab
                    ? "2px solid #111827"
                    : "2px solid transparent",
                transition: "color 0.15s, border-color 0.15s",
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "1.25rem" }}>
        {/* ── Tasks board ── */}
        {activeTab === "tasks" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 14rem), 1fr))",
              gap: "0.875rem",
              alignItems: "start",
            }}
          >
            {Object.entries(groupedTasks).map(([status, statusTasks]) => (
              <div
                key={status}
                style={{
                  backgroundColor: COLUMN_COLORS[status],
                  borderRadius: "0.625rem",
                  padding: "0.875rem",
                }}
              >
                {/* Column header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "0.75rem",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "#111827",
                      margin: 0,
                    }}
                  >
                    {formatStatus(status)}
                  </h3>
                  <span
                    style={{
                      backgroundColor: "#E5E7EB",
                      color: "#374151",
                      fontSize: "0.7rem",
                      padding: "0.125rem 0.5rem",
                      borderRadius: "9999px",
                      fontWeight: 600,
                    }}
                  >
                    {statusTasks.length}
                  </span>
                </div>

                {/* Task cards */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.625rem",
                  }}
                >
                  {statusTasks.map((task) => (
                    <div
                      key={task._id}
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: "0.5rem",
                        padding: "0.875rem",
                        border: "1px solid #E5E7EB",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: "0.375rem",
                        }}
                      >
                        <h4
                          style={{
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            color: "#111827",
                            margin: 0,
                            flex: 1,
                            marginRight: "0.5rem",
                          }}
                        >
                          {task.title}
                        </h4>
                        {/* Task menu */}
                        <div style={{ position: "relative", flexShrink: 0 }}>
                          <button
                            onClick={() =>
                              setOpenTaskMenu(
                                openTaskMenu === task._id ? null : task._id,
                              )
                            }
                            style={{
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                              padding: "0.125rem",
                              color: "#9CA3AF",
                              borderRadius: "0.25rem",
                            }}
                          >
                            <MoreVertical size={14} />
                          </button>
                          {openTaskMenu === task._id && (
                            <div
                              style={{
                                position: "absolute",
                                right: 0,
                                top: "1.5rem",
                                backgroundColor: "#fff",
                                borderRadius: "0.5rem",
                                boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                                border: "1px solid #E5E7EB",
                                width: "9rem",
                                zIndex: 20,
                              }}
                            >
                              {NEXT_STATUS[status] && (
                                <button
                                  onClick={() =>
                                    handleUpdateTaskStatus(
                                      task._id,
                                      NEXT_STATUS[status],
                                    )
                                  }
                                  style={taskMenuBtnStyle}
                                >
                                  Move to Next
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteTask(task._id)}
                                style={{
                                  ...taskMenuBtnStyle,
                                  color: "#DC2626",
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {task.description && (
                        <p
                          style={{
                            fontSize: "0.75rem",
                            color: "#6B7280",
                            margin: "0 0 0.5rem",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {task.description}
                        </p>
                      )}

                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "0.375rem",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.7rem",
                            padding: "0.125rem 0.5rem",
                            borderRadius: "9999px",
                            textTransform: "capitalize",
                            backgroundColor: PRIORITY_STYLES[task.priority]?.bg,
                            color: PRIORITY_STYLES[task.priority]?.text,
                          }}
                        >
                          {task.priority}
                        </span>
                        {task.category && (
                          <span
                            style={{
                              fontSize: "0.7rem",
                              padding: "0.125rem 0.5rem",
                              borderRadius: "9999px",
                              backgroundColor: "#DBEAFE",
                              color: "#1D4ED8",
                            }}
                          >
                            {task.category}
                          </span>
                        )}
                      </div>

                      {task.dueDate && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.25rem",
                            fontSize: "0.7rem",
                            color: "#9CA3AF",
                          }}
                        >
                          <Clock size={11} />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                      )}

                      {task.assignees?.length > 0 && (
                        <div style={{ display: "flex", marginTop: "0.5rem" }}>
                          {task.assignees.slice(0, 3).map((a, idx) => (
                            <div
                              key={a._id || idx}
                              style={{
                                width: "1.5rem",
                                height: "1.5rem",
                                borderRadius: "50%",
                                backgroundColor: "#3B82F6",
                                border: "2px solid #fff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#fff",
                                fontSize: "0.6rem",
                                fontWeight: 600,
                                marginLeft: idx === 0 ? 0 : "-0.4rem",
                              }}
                            >
                              {(a.username || a.email || "U")[0].toUpperCase()}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  {statusTasks.length === 0 && (
                    <div
                      style={{
                        textAlign: "center",
                        padding: "2rem 0",
                        color: "#D1D5DB",
                        fontSize: "0.8125rem",
                      }}
                    >
                      No tasks
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Team tab ── */}
        {activeTab === "team" && (
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "0.625rem",
              border: "1px solid #E5E7EB",
              overflow: "hidden",
              maxWidth: "40rem",
            }}
          >
            <div
              style={{
                padding: "0.875rem 1rem",
                borderBottom: "1px solid #E5E7EB",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, margin: 0 }}>
                Team Members
              </h3>
              {team.isOwner && (
                <button onClick={handleGenerateInvite} style={primaryBtnStyle}>
                  <Plus size={14} /> Invite
                </button>
              )}
            </div>
            <div>
              {/* Owner */}
              {team.owner && (
                <MemberRow
                  name={team.owner.username || "Unknown"}
                  email={team.owner.email}
                  avatarColor="#7C3AED"
                  badge={{ label: "Owner", bg: "#F3E8FF", text: "#7C3AED" }}
                />
              )}
              {/* Team members */}
              {team.team
                ?.filter((m) => m._id !== team.owner?._id)
                .map((member) => (
                  <MemberRow
                    key={member._id}
                    name={member.user.username || "Unknown"}
                    email={member.user.email}
                    avatarColor="#3B82F6"
                    badge={{
                      label: member.role,
                      bg: "#F3F4F6",
                      text: "#374151",
                    }}
                    action={
                      team.isOwner ? (
                        <button
                          onClick={() => handleRemoveMember(member._id)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "#EF4444",
                            padding: "0.375rem",
                            borderRadius: "0.375rem",
                            display: "flex",
                            alignItems: "center",
                          }}
                          title="Remove member"
                        >
                          <UserMinus size={15} />
                        </button>
                      ) : null
                    }
                  />
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
        <ModalShell
          onClose={() => {
            setShowInviteModal(false);
            setInviteLink("");
          }}
          title="Invite Team Member"
        >
          <p
            style={{
              fontSize: "0.875rem",
              color: "#6B7280",
              marginBottom: "1rem",
            }}
          >
            Share this link to invite a team member.
          </p>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input
              type="text"
              value={inviteLink}
              readOnly
              style={{
                flex: 1,
                padding: "0.5rem 0.75rem",
                border: "1px solid #D1D5DB",
                borderRadius: "0.5rem",
                backgroundColor: "#F9FAFB",
                fontSize: "0.875rem",
                outline: "none",
                minWidth: 0,
              }}
            />
            <button onClick={copyInviteLink} style={primaryBtnStyle}>
              {linkCopied ? <Check size={14} /> : <Copy size={14} />}
              {linkCopied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p
            style={{
              fontSize: "0.75rem",
              color: "#9CA3AF",
              marginTop: "0.625rem",
            }}
          >
            Expires in 7 days.
          </p>
        </ModalShell>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

/* ─── Small helpers ─── */
const primaryBtnStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0.375rem",
  padding: "0.45rem 0.875rem",
  backgroundColor: "#111827",
  color: "#fff",
  border: "none",
  borderRadius: "0.5rem",
  cursor: "pointer",
  fontSize: "0.8125rem",
  fontWeight: 500,
  whiteSpace: "nowrap",
};
const outlineBtnStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0.375rem",
  padding: "0.45rem 0.875rem",
  backgroundColor: "#fff",
  color: "#374151",
  border: "1px solid #D1D5DB",
  borderRadius: "0.5rem",
  cursor: "pointer",
  fontSize: "0.8125rem",
  fontWeight: 500,
  whiteSpace: "nowrap",
};
const taskMenuBtnStyle = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  padding: "0.5rem 0.75rem",
  background: "none",
  border: "none",
  fontSize: "0.8125rem",
  color: "#374151",
  cursor: "pointer",
  textAlign: "left",
};

function MemberRow({ name, email, avatarColor, badge, action }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.875rem 1rem",
        borderBottom: "1px solid #F3F4F6",
        gap: "0.75rem",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          minWidth: 0,
        }}
      >
        <div
          style={{
            width: "2.25rem",
            height: "2.25rem",
            borderRadius: "50%",
            backgroundColor: avatarColor,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 600,
            fontSize: "0.875rem",
          }}
        >
          {(name || "?")[0].toUpperCase()}
        </div>
        <div style={{ minWidth: 0 }}>
          <div
            style={{ fontSize: "0.9375rem", fontWeight: 500, color: "#111827" }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: "0.8125rem",
              color: "#6B7280",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {email}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            padding: "0.2rem 0.625rem",
            borderRadius: "9999px",
            fontSize: "0.8125rem",
            fontWeight: 500,
            backgroundColor: badge.bg,
            color: badge.text,
          }}
        >
          {badge.label}
        </span>
        {action}
      </div>
    </div>
  );
}

function ModalShell({ children, onClose, title }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "0.75rem",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          width: "100%",
          maxWidth: "28rem",
          padding: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <h3 style={{ fontSize: "1rem", fontWeight: 600, margin: 0 }}>
            {title}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#9CA3AF",
            }}
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
