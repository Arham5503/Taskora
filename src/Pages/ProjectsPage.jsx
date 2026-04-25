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
  Copy,
  Check,
  X,
  Trash2,
} from "lucide-react";
import {
  getProjects,
  updateProjectStatus,
  deleteProject,
  generateInviteLink,
} from "../api/ApiBuilder";
import { toast } from "react-toastify";

const STATUS_STYLES = {
  planning: { bg: "#EFF6FF", text: "#1D4ED8" },
  in_progress: { bg: "#FEFCE8", text: "#A16207" },
  completed: { bg: "#F0FDF4", text: "#15803D" },
  on_hold: { bg: "#FFF7ED", text: "#C2410C" },
  archived: { bg: "#F9FAFB", text: "#374151" },
};
const PRIORITY_BAR = { high: "#EF4444", medium: "#F59E0B", low: "#22C55E" };
const PRIORITY_BADGE = {
  high: { bg: "#FEF2F2", text: "#DC2626" },
  medium: { bg: "#FEFCE8", text: "#CA8A04" },
  low: { bg: "#F0FDF4", text: "#16A34A" },
};

function formatStatus(status) {
  return (
    status?.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase()) ||
    "Planning"
  );
}

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
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

  const dateFinder = (days, startDate) => {
    if (typeof days !== "number") return "N/A";
    const start = startDate ? new Date(startDate) : new Date();
    const d = new Date(start);
    d.setDate(d.getDate() + days);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleViewDetails = (projectId) => {
    navigate(`/project/${projectId}`);
    setActiveActionMenu(null);
  };

  const handleStatusChange = async (projectId, newStatus) => {
    try {
      await updateProjectStatus(projectId, newStatus);
      toast.success(`Status updated to ${newStatus.replace("_", " ")}`);
      fetchProjects();
    } catch {
      toast.error("Failed to update status");
    }
    setActiveActionMenu(null);
    setShowStatusMenu(null);
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await deleteProject(projectId);
      toast.success("Project deleted");
      fetchProjects();
    } catch {
      toast.error("Failed to delete project");
    }
    setShowDeleteConfirm(null);
    setActiveActionMenu(null);
  };

  const handleGenerateInvite = async (projectId) => {
    try {
      const response = await generateInviteLink(projectId);
      setInviteLink(response.inviteUrl);
      setShowInviteModal(projectId);
    } catch {
      toast.error("Failed to generate invite link");
    }
    setActiveActionMenu(null);
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setLinkCopied(true);
    toast.success("Copied!");
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      {/* Toolbar */}
      <div
        style={{
          backgroundColor: "#F9FAFB",
          borderBottom: "1px solid #E5E7EB",
          padding: "0.75rem 1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
            maxWidth: "80rem",
            margin: "0 auto",
          }}
        >
          {/* Search + Filter */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "0.625rem",
              flex: 1,
              minWidth: 0,
            }}
          >
            <div
              style={{
                position: "relative",
                flex: "1 1 12rem",
                minWidth: "10rem",
                maxWidth: "22rem",
              }}
            >
              <Search
                size={16}
                style={{
                  position: "absolute",
                  left: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9CA3AF",
                  pointerEvents: "none",
                }}
              />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  paddingLeft: "2.25rem",
                  paddingRight: "0.75rem",
                  paddingTop: "0.5rem",
                  paddingBottom: "0.5rem",
                  border: "1px solid #D1D5DB",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                  outline: "none",
                  boxSizing: "border-box",
                  backgroundColor: "#fff",
                }}
              />
            </div>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
                padding: "0.5rem 0.875rem",
                backgroundColor: "#fff",
                border: "1px solid #D1D5DB",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              <Filter size={14} />
              All Projects
            </button>
          </div>

          {/* View Toggle */}
          <div style={{ display: "flex", gap: "0.25rem" }}>
            {[
              { mode: "grid", Icon: Grid3x3 },
              { mode: "list", Icon: List },
            ].map(({ mode, Icon }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  padding: "0.5rem 0.875rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  border:
                    viewMode === mode
                      ? "1px solid #D1D5DB"
                      : "1px solid transparent",
                  backgroundColor: viewMode === mode ? "#fff" : "transparent",
                  boxShadow:
                    viewMode === mode ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
                  color: "#374151",
                }}
              >
                <Icon size={14} />
                <span style={{ textTransform: "capitalize" }}>{mode}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards */}
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#F9FAFB",
          padding: "1rem",
        }}
      >
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "5rem 0",
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
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                viewMode === "grid"
                  ? "repeat(auto-fill, minmax(min(100%, 22rem), 1fr))"
                  : "1fr",
              gap: "1rem",
              width: "100%",
            }}
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <div
                  key={project._id}
                  onClick={() => handleViewDetails(project._id)}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "0.625rem",
                    border: "1px solid #E5E7EB",
                    padding: "1.25rem",
                    position: "relative",
                    cursor: "pointer",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                    transition: "box-shadow 0.15s, transform 0.15s",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(0,0,0,0.1)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 1px 3px rgba(0,0,0,0.06)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/* Header row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                    }}
                  >
                    {/* Priority bar */}
                    <div
                      style={{
                        width: "4px",
                        minHeight: "3.5rem",
                        borderRadius: "9999px",
                        backgroundColor:
                          PRIORITY_BAR[project.priority] || "#9CA3AF",
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          marginBottom: "0.25rem",
                        }}
                      >
                        <h2
                          style={{
                            fontSize: "1rem",
                            fontWeight: 600,
                            color: "#111827",
                            margin: 0,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {project.title}
                        </h2>
                        {project.isStarred && (
                          <Star
                            size={14}
                            style={{
                              fill: "#F59E0B",
                              color: "#F59E0B",
                              flexShrink: 0,
                            }}
                          />
                        )}
                      </div>
                      <p
                        style={{
                          fontSize: "0.8125rem",
                          color: "#6B7280",
                          margin: 0,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {project.description}
                      </p>
                    </div>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        padding: "0.2rem 0.625rem",
                        borderRadius: "9999px",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                        backgroundColor:
                          STATUS_STYLES[project.status]?.bg || "#F9FAFB",
                        color: STATUS_STYLES[project.status]?.text || "#374151",
                      }}
                    >
                      {formatStatus(project.status)}
                    </span>
                  </div>

                  {/* Deadline + actions */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      color: "#6B7280",
                      fontSize: "0.8125rem",
                    }}
                  >
                    <Calendar size={14} />
                    <span>
                      Deadline:{" "}
                      {dateFinder(project.durationDays, project.startDate)}
                    </span>
                    <button
                      onClick={(e) => toggleActions(project._id, e)}
                      style={{
                        marginLeft: "auto",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "0.25rem",
                        borderRadius: "0.375rem",
                        color: "#6B7280",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>

                  {/* Progress */}
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "0.8125rem",
                        color: "#6B7280",
                        marginBottom: "0.375rem",
                      }}
                    >
                      <span>Progress</span>
                      <span>{project.progress || 0}%</span>
                    </div>
                    <div
                      style={{
                        height: "0.375rem",
                        borderRadius: "9999px",
                        backgroundColor: "#E5E7EB",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          borderRadius: "9999px",
                          backgroundColor: "#111827",
                          width: `${project.progress || 0}%`,
                          transition: "width 0.3s ease",
                        }}
                      />
                    </div>
                  </div>

                  {/* Team avatars */}
                  <div
                    style={{ display: "flex", alignItems: "center", gap: "0" }}
                  >
                    {project.team?.slice(0, 4).map((member, idx) => (
                      <div
                        key={member._id || idx}
                        style={{
                          width: "1.75rem",
                          height: "1.75rem",
                          borderRadius: "50%",
                          backgroundColor: "#3B82F6",
                          border: "2px solid #fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          marginLeft: idx === 0 ? 0 : "-0.5rem",
                        }}
                      >
                        {(member.user?.username ||
                          member.user?.email ||
                          "U")[0].toUpperCase()}
                      </div>
                    ))}
                    {project.team?.length > 4 && (
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "#6B7280",
                          marginLeft: "0.5rem",
                        }}
                      >
                        +{project.team.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Meta grid */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "0.625rem 1rem",
                    }}
                  >
                    {[
                      { label: "Client", value: project.client || "N/A" },
                      {
                        label: "Tasks",
                        value: `${project.completedTasks || 0}/${project.totalTasks || 0}`,
                      },
                      {
                        label: "Start Date",
                        value: project.startDate
                          ? new Date(project.startDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )
                          : "N/A",
                      },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "#9CA3AF",
                            marginBottom: "0.125rem",
                          }}
                        >
                          {label}
                        </div>
                        <div
                          style={{
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            color: "#111827",
                          }}
                        >
                          {value}
                        </div>
                      </div>
                    ))}
                    <div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "#9CA3AF",
                          marginBottom: "0.25rem",
                        }}
                      >
                        Priority
                      </div>
                      <span
                        style={{
                          display: "inline-block",
                          fontSize: "0.75rem",
                          padding: "0.1875rem 0.5rem",
                          borderRadius: "9999px",
                          textTransform: "capitalize",
                          fontWeight: 500,
                          backgroundColor:
                            PRIORITY_BADGE[project.priority]?.bg || "#F9FAFB",
                          color:
                            PRIORITY_BADGE[project.priority]?.text || "#374151",
                        }}
                      >
                        {project.priority}
                      </span>
                    </div>
                  </div>

                  {/* Action dropdown */}
                  {activeActionMenu === project._id && (
                    <div
                      ref={menuRef}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        position: "absolute",
                        right: "1rem",
                        top: "4.5rem",
                        backgroundColor: "#fff",
                        borderRadius: "0.5rem",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                        border: "1px solid #E5E7EB",
                        width: "13rem",
                        zIndex: 20,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          padding: "0.5rem 0.75rem",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "#111827",
                          borderBottom: "1px solid #F3F4F6",
                        }}
                      >
                        Project Actions
                      </div>
                      {[
                        {
                          label: "View Details",
                          Icon: FileText,
                          onClick: () => handleViewDetails(project._id),
                        },
                        {
                          label: "Invite Member",
                          Icon: Users,
                          onClick: () => handleGenerateInvite(project._id),
                        },
                        {
                          label: "Put on Hold",
                          Icon: PauseCircle,
                          onClick: () =>
                            handleStatusChange(project._id, "on_hold"),
                        },
                      ].map(({ label, Icon, onClick }) => (
                        <button
                          key={label}
                          onClick={onClick}
                          style={menuBtnStyle}
                        >
                          <Icon size={14} /> {label}
                        </button>
                      ))}

                      {/* Change Status submenu */}
                      <div style={{ position: "relative" }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowStatusMenu(
                              showStatusMenu === project._id
                                ? null
                                : project._id,
                            );
                          }}
                          style={menuBtnStyle}
                        >
                          <Clock size={14} /> Change Status
                        </button>
                        {showStatusMenu === project._id && (
                          <div
                            style={{
                              position: "absolute",
                              left: "100%",
                              top: 0,
                              backgroundColor: "#fff",
                              borderRadius: "0.5rem",
                              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                              border: "1px solid #E5E7EB",
                              width: "9rem",
                              zIndex: 30,
                            }}
                          >
                            {[
                              "planning",
                              "in_progress",
                              "completed",
                              "on_hold",
                              "archived",
                            ].map((s) => (
                              <button
                                key={s}
                                onClick={() =>
                                  handleStatusChange(project._id, s)
                                }
                                style={{
                                  ...menuBtnStyle,
                                  color:
                                    project.status === s
                                      ? "#2563EB"
                                      : "#374151",
                                  fontWeight: project.status === s ? 600 : 400,
                                }}
                              >
                                {formatStatus(s)}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <div
                        style={{
                          borderTop: "1px solid #F3F4F6",
                          marginTop: "0.25rem",
                        }}
                      >
                        <button
                          onClick={() => setShowDeleteConfirm(project._id)}
                          style={{ ...menuBtnStyle, color: "#DC2626" }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = "#FEF2F2")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              "transparent")
                          }
                        >
                          <Trash2 size={14} /> Delete Project
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div
                style={{
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  padding: "5rem 0",
                  color: "#9CA3AF",
                  fontSize: "0.9375rem",
                }}
              >
                {searchQuery
                  ? "No projects match your search"
                  : "No Projects Created Yet"}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <Modal
          onClose={() => {
            setShowInviteModal(null);
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
            Share this link with your team member to invite them to the project.
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
            <button
              onClick={copyInviteLink}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
                padding: "0.5rem 0.875rem",
                backgroundColor: "#111827",
                color: "#fff",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
                fontSize: "0.875rem",
                whiteSpace: "nowrap",
              }}
            >
              {linkCopied ? <Check size={14} /> : <Copy size={14} />}
              {linkCopied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p
            style={{
              fontSize: "0.75rem",
              color: "#9CA3AF",
              marginTop: "0.75rem",
            }}
          >
            This link expires in 7 days.
          </p>
        </Modal>
      )}

      {/* Delete Confirm Modal */}
      {showDeleteConfirm && (
        <Modal
          onClose={() => setShowDeleteConfirm(null)}
          title="Delete Project?"
          maxWidth="24rem"
        >
          <p
            style={{
              fontSize: "0.875rem",
              color: "#6B7280",
              marginBottom: "1.25rem",
            }}
          >
            This action cannot be undone. All tasks and data will be permanently
            deleted.
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "0.625rem",
            }}
          >
            <button
              onClick={() => setShowDeleteConfirm(null)}
              style={cancelBtnStyle}
            >
              Cancel
            </button>
            <button
              onClick={() => handleDeleteProject(showDeleteConfirm)}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#DC2626",
                color: "#fff",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            >
              Delete
            </button>
          </div>
        </Modal>
      )}

      <CreateProject
        open={showCreateModel}
        onClose={() => setShowCreateModel(false)}
        onSuccess={fetchProjects}
      />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}

/* ─── Shared small helpers ─── */
const menuBtnStyle = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  padding: "0.5rem 0.75rem",
  background: "transparent",
  border: "none",
  fontSize: "0.875rem",
  color: "#374151",
  cursor: "pointer",
  textAlign: "left",
  transition: "background 0.1s",
};

const cancelBtnStyle = {
  padding: "0.5rem 1rem",
  border: "1px solid #D1D5DB",
  borderRadius: "0.5rem",
  background: "#fff",
  cursor: "pointer",
  fontSize: "0.875rem",
  color: "#374151",
};

function Modal({ children, onClose, title, maxWidth = "28rem" }) {
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
          maxWidth,
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
          <h3 style={{ fontSize: "1.0625rem", fontWeight: 600, margin: 0 }}>
            {title}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#9CA3AF",
              padding: "0.25rem",
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

export default ProjectsPage;
