import React from "react";
import { Users, MoreVertical, TrendingUp, TrendingDown } from "lucide-react";
import { useApp } from "../Context/ThemeContext";

const TeamMembersDashboard = () => {
  const { colors } = useApp();

  const teamMembers = [
    {
      id: 1,
      name: "Alex Morgan",
      email: "alex.morgan@example.com",
      role: "UI/UX Designer",
      tasks: { total: 18, inProgress: 7, completed: 11 },
      performance: { value: 12, trend: "up", label: "+12% this week" },
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    {
      id: 2,
      name: "Jessica Chen",
      email: "jessica.chen@example.com",
      role: "Frontend Developer",
      tasks: { total: 24, inProgress: 9, completed: 15 },
      performance: { value: 8, trend: "up", label: "+8% this week" },
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
    },
    {
      id: 3,
      name: "Ryan Park",
      email: "ryan.park@example.com",
      role: "Product Manager",
      tasks: { total: 14, inProgress: 3, completed: 11 },
      performance: { value: 15, trend: "up", label: "+15% this week" },
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan",
    },
    {
      id: 4,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      role: "Backend Developer",
      tasks: { total: 20, inProgress: 8, completed: 12 },
      performance: { value: -3, trend: "down", label: "-3% this week" },
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
      id: 5,
      name: "David Kim",
      email: "david.kim@example.com",
      role: "QA Engineer",
      tasks: { total: 16, inProgress: 5, completed: 11 },
      performance: { value: 6, trend: "up", label: "+6% this week" },
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
  ];

  return (
    <section
      style={{
        padding: "1.25rem 0",
        borderRadius: "0.5rem",
        border: `1px solid ${colors.border}`,
        background: colors.cards,
        overflowX: "auto",
      }}
    >
      <div style={{ maxWidth: "100%", overflow: "hidden" }}>
        {/* Header */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid #E5E7EB",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "clamp(1.125rem, 3vw, 1.5rem)",
                fontWeight: 700,
                color: "#111827",
                margin: 0,
              }}
            >
              Team Members
            </h1>
            <p
              style={{
                fontSize: "0.875rem",
                color: "#6B7280",
                marginTop: "0.25rem",
                marginBottom: 0,
              }}
            >
              Performance overview of team members
            </p>
          </div>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "#374151",
              background: "none",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
            }}
          >
            <Users size="1rem" />
            View All
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "36rem",
            }}
          >
            <thead>
              <tr>
                {["Name", "Role", "Tasks", "Performance", "Actions"].map(
                  (col) => (
                    <th
                      key={col}
                      style={{
                        padding: "0.75rem 1.5rem",
                        textAlign: "left",
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        color: "#6B7280",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        borderBottom: "1px solid #E5E7EB",
                      }}
                    >
                      {col}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member) => (
                <tr
                  key={member.id}
                  style={{
                    borderBottom: "1px solid #E5E7EB",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#F9FAFB")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  {/* Name */}
                  <td style={{ padding: "1rem 1.5rem", whiteSpace: "nowrap" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                      }}
                    >
                      <img
                        src={member.avatar}
                        alt={member.name}
                        style={{
                          width: "2.5rem",
                          height: "2.5rem",
                          borderRadius: "50%",
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <div
                          style={{
                            fontSize: "0.9375rem",
                            fontWeight: 500,
                            color: "#111827",
                          }}
                        >
                          {member.name}
                        </div>
                        <div
                          style={{ fontSize: "0.8125rem", color: "#6B7280" }}
                        >
                          {member.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td
                    style={{
                      padding: "1rem 1.5rem",
                      fontSize: "0.875rem",
                      color: "#374151",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {member.role}
                  </td>

                  {/* Tasks */}
                  <td style={{ padding: "1rem 1.5rem", whiteSpace: "nowrap" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.375rem",
                      }}
                    >
                      {[
                        {
                          val: member.tasks.total,
                          bg: "#DBEAFE",
                          text: "#1D4ED8",
                        },
                        {
                          val: member.tasks.inProgress,
                          bg: "#FEF9C3",
                          text: "#A16207",
                        },
                        {
                          val: member.tasks.completed,
                          bg: "#DCFCE7",
                          text: "#15803D",
                        },
                      ].map(({ val, bg, text }, i) => (
                        <span
                          key={i}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "2.25rem",
                            height: "1.5rem",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            backgroundColor: bg,
                            color: text,
                            borderRadius: "9999px",
                          }}
                        >
                          {val}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Performance */}
                  <td style={{ padding: "1rem 1.5rem", whiteSpace: "nowrap" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        padding: "0.25rem 0.75rem",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        borderRadius: "9999px",
                        backgroundColor:
                          member.performance.trend === "up"
                            ? "#DCFCE7"
                            : "#FEE2E2",
                        color:
                          member.performance.trend === "up"
                            ? "#15803D"
                            : "#B91C1C",
                      }}
                    >
                      {member.performance.trend === "up" ? (
                        <TrendingUp size="0.75rem" />
                      ) : (
                        <TrendingDown size="0.75rem" />
                      )}
                      {member.performance.label}
                    </span>
                  </td>

                  {/* Actions */}
                  <td
                    style={{
                      padding: "1rem 1.5rem",
                      textAlign: "right",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <button
                      style={{
                        color: "#9CA3AF",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "0.25rem",
                      }}
                    >
                      <MoreVertical size="1.25rem" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TeamMembersDashboard;
