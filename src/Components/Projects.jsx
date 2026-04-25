import { FileText, Calendar } from "lucide-react";
import { useContext } from "react";
import { AppSettingsContext } from "../Context/ThemeContext";

function Projects({ projectsData }) {
  const { colors } = useContext(AppSettingsContext);

  const dateFinder = (days) => {
    if (typeof days !== "number") return "N/A";
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);
    return futureDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatus = (stat) => {
    if (stat === "in_progress") return "In Progress";
    if (stat === "completed") return "Completed";
    if (stat === "on_hold") return "On Hold";
    return "Planning";
  };

  const statusBg = (status) => {
    if (status === "completed") return { bg: "#DCFCE7", text: "#166534" };
    if (status === "planning") return { bg: "#DBEAFE", text: "#1E40AF" };
    return { bg: "#FEF9C3", text: "#854D0E" };
  };

  const borderColor = (status) => {
    if (status === "completed") return "#22C55E";
    if (status === "planning") return "#3B82F6";
    return "#EAB308";
  };

  return (
    <section style={{ padding: "1.25rem 0" }}>
      <h1
        style={{
          fontSize: "clamp(1.25rem, 3vw, 1.5rem)",
          fontWeight: 500,
          color: colors.boldText,
          marginBottom: "1rem",
        }}
      >
        Project Overview
      </h1>

      {Array.isArray(projectsData) && projectsData.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 18rem), 1fr))",
            gap: "1.5rem",
          }}
        >
          {projectsData.slice(0, 4).map((card) => (
            <div
              key={card._id}
              style={{
                border: "1px solid #E5E5E5",
                borderRadius: "0.5rem",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                background: colors.cards,
                color: colors.text,
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                }}
              >
                <div
                  style={{
                    paddingLeft: "0.5rem",
                    flex: 1,
                    borderLeft: `4px solid ${borderColor(card.status)}`,
                    minWidth: 0,
                  }}
                >
                  <h2
                    style={{
                      fontSize: "1.0625rem",
                      fontWeight: 500,
                      color: colors.boldText,
                      margin: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {card.title || "Untitled Project"}
                  </h2>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "#A6A6A6",
                      margin: "0.25rem 0 0",
                    }}
                  >
                    {card.description || card.disc || "No description"}
                  </p>
                </div>

                <span
                  style={{
                    fontSize: "0.8125rem",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "9999px",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    backgroundColor: statusBg(card.status).bg,
                    color: statusBg(card.status).text,
                  }}
                >
                  {getStatus(card.status)}
                </span>
              </div>

              <div>
                {/* Deadline */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "#6B7280",
                    marginBottom: "0.75rem",
                    fontSize: "0.875rem",
                    gap: "0.5rem",
                  }}
                >
                  <Calendar size="1.125rem" />
                  <span>Deadline: {dateFinder(card.durationDays)}</span>
                </div>

                {/* Progress */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.875rem",
                    marginBottom: "0.375rem",
                    color: colors.text,
                  }}
                >
                  <span>Progress</span>
                  <span>{card.progress ?? 0}%</span>
                </div>
                <div
                  style={{
                    height: "0.5rem",
                    borderRadius: "0.375rem",
                    overflow: "hidden",
                    backgroundColor: "#F5F5F5",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#000",
                      height: "100%",
                      width: `${card.progress ?? 0}%`,
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>

                {/* Team & Tasks */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "0.75rem",
                  }}
                >
                  <div style={{ display: "flex", marginLeft: "-0.375rem" }}>
                    {card.team && card.team.length > 0 ? (
                      card.team.slice(0, 3).map((member, idx) => (
                        <div
                          key={member._id}
                          style={{
                            marginLeft: idx === 0 ? 0 : "-0.5rem",
                            position: "relative",
                          }}
                        >
                          {member.user?.profile &&
                          member.user.profile.trim() !== "" ? (
                            <img
                              src={member.user.profile}
                              alt={member.user.username}
                              style={{
                                width: "1.75rem",
                                height: "1.75rem",
                                borderRadius: "50%",
                                border: "2px solid white",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: "1.75rem",
                                height: "1.75rem",
                                borderRadius: "50%",
                                border: "2px solid white",
                                backgroundColor: "#E5E7EB",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "0.75rem",
                                fontWeight: 500,
                                color: "#4B5563",
                              }}
                            >
                              {(
                                member.user?.username?.[0] || "?"
                              ).toUpperCase()}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div
                        style={{
                          width: "1.75rem",
                          height: "1.75rem",
                          borderRadius: "50%",
                          border: "2px solid white",
                          backgroundColor: "#E5E7EB",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.75rem",
                          fontWeight: 500,
                          color: "#4B5563",
                        }}
                      >
                        ?
                      </div>
                    )}

                    {card.team && card.team.length > 3 && (
                      <div
                        style={{
                          width: "1.75rem",
                          height: "1.75rem",
                          borderRadius: "50%",
                          border: "2px solid white",
                          backgroundColor: "#D1D5DB",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.7rem",
                          fontWeight: 500,
                          color: "#374151",
                          marginLeft: "-0.5rem",
                        }}
                      >
                        +{card.team.length - 3}
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      color: "#6B7280",
                      fontSize: "0.875rem",
                    }}
                  >
                    <FileText size="1rem" style={{ stroke: "#9CA3AF" }} />
                    <span>{card.totalTasks || 0} tasks</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: colors.text }}>No Projects Created Yet</p>
      )}
    </section>
  );
}

export default Projects;
