import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Bell, Clock, MoreVertical, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppSettingsContext } from "../Context/ThemeContext";
import {
  deleteNotification,
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "../api/ApiBuilder";

const tabs = ["All", "Tasks", "Mentions", "Projects", "System"];

const typeByTab = {
  All: "all",
  Tasks: "task",
  Mentions: "mention",
  Projects: "project",
  System: "system",
};

const notifyCountChanged = () => {
  window.dispatchEvent(new Event("notifications:changed"));
};

const getId = (value) => {
  if (!value) return null;
  if (typeof value === "string") return value;
  return value._id || value.id || null;
};

const getProjectId = (notification) => {
  const taskProject = notification.task?.project;
  return getId(notification.project) || getId(taskProject);
};

const formatTime = (dateValue) => {
  if (!dateValue) return "";
  const date = new Date(dateValue);
  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes} min ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} hr ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() === new Date().getFullYear() ? undefined : "numeric",
  });
};

const getDateGroup = (dateValue) => {
  const date = new Date(dateValue);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return "Earlier";
};

const getInitial = (notification) => {
  const actor = notification.actor;
  const name = actor?.username || actor?.name || actor?.email || notification.title || "N";
  return name[0]?.toUpperCase() || "N";
};

const NotificationInbox = () => {
  const navigate = useNavigate();
  const { colors } = useContext(AppSettingsContext);
  const [activeTab, setActiveTab] = useState("All");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getNotifications({
        type: typeByTab[activeTab],
        page: 1,
        limit: 30,
      });
      setNotifications(response.notifications || []);
    } catch (err) {
      console.error("Failed to load notifications:", err);
      setError("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const groupedNotifications = useMemo(() => {
    return notifications.reduce(
      (groups, notification) => {
        const group = getDateGroup(notification.createdAt);
        groups[group].push(notification);
        return groups;
      },
      { Today: [], Yesterday: [], Earlier: [] },
    );
  }, [notifications]);

  const handleNotificationClick = async (notification) => {
    const notificationId = notification._id || notification.id;

    if (!notification.read) {
      setNotifications((current) =>
        current.map((item) =>
          (item._id || item.id) === notificationId ? { ...item, read: true } : item,
        ),
      );
      notifyCountChanged();

      try {
        await markNotificationRead(notificationId);
      } catch (err) {
        console.error("Failed to mark notification as read:", err);
      }
    }

    const projectId = getProjectId(notification);
    if (projectId) {
      navigate(`/project/${projectId}`);
    } else if (notification.task) {
      navigate("/tasks");
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsRead();
      setNotifications((current) =>
        current.map((notification) => ({ ...notification, read: true })),
      );
      notifyCountChanged();
    } catch (err) {
      console.error("Failed to mark all notifications as read:", err);
      setError("Failed to mark notifications as read");
    }
  };

  const handleDelete = async (event, notificationId) => {
    event.stopPropagation();
    setOpenMenuId(null);

    try {
      await deleteNotification(notificationId);
      setNotifications((current) =>
        current.filter((notification) => (notification._id || notification.id) !== notificationId),
      );
      notifyCountChanged();
    } catch (err) {
      console.error("Failed to delete notification:", err);
      setError("Failed to delete notification");
    }
  };

  const hasUnread = notifications.some((notification) => !notification.read);
  const hasNotifications = notifications.length > 0;

  return (
    <div style={{ minHeight: "100%", backgroundColor: colors.background }}>
      <div
        style={{
          width: "100%",
          maxWidth: "64rem",
          margin: "0 auto",
          backgroundColor: colors.cards,
          border: `1px solid ${colors.border}`,
          borderRadius: "0.75rem",
          overflow: "hidden",
          boxShadow: "0 12px 32px rgba(15, 23, 42, 0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.75rem",
            padding: "1rem 1.25rem",
            borderBottom: `1px solid ${colors.border}`,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2
              style={{
                color: colors.boldText,
                fontSize: "1.25rem",
                fontWeight: 700,
                margin: 0,
              }}
            >
              Notifications
            </h2>
            <p style={{ color: colors.text, fontSize: "0.875rem", margin: "0.25rem 0 0" }}>
              Updates from tasks, mentions, projects, and system events
            </p>
          </div>
          <button
            onClick={handleMarkAllRead}
            disabled={!hasUnread || loading}
            style={{
              padding: "0.5rem 0.75rem",
              borderRadius: "0.5rem",
              border: `1px solid ${colors.border}`,
              backgroundColor: hasUnread ? colors.primarySoft : colors.muted,
              color: hasUnread ? colors.primary : colors.text,
              cursor: hasUnread && !loading ? "pointer" : "not-allowed",
              fontWeight: 600,
              fontSize: "0.875rem",
              whiteSpace: "nowrap",
            }}
          >
            Mark all as read
          </button>
        </div>

        <div
          style={{
            display: "flex",
            overflowX: "auto",
            borderBottom: `1px solid ${colors.border}`,
            backgroundColor: colors.cards,
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "0.875rem 1rem",
                border: "none",
                borderBottom:
                  activeTab === tab ? `2px solid ${colors.primary}` : "2px solid transparent",
                background: "transparent",
                color: activeTab === tab ? colors.boldText : colors.text,
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.875rem",
                whiteSpace: "nowrap",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {error && (
          <div
            style={{
              margin: "1rem",
              padding: "0.75rem 1rem",
              borderRadius: "0.5rem",
              backgroundColor: "#FEE2E2",
              color: "#B91C1C",
              fontSize: "0.875rem",
            }}
          >
            {error}
          </div>
        )}

        {loading ? (
          <div style={{ padding: "4rem 1rem", textAlign: "center", color: colors.text }}>
            Loading notifications...
          </div>
        ) : !hasNotifications ? (
          <div
            style={{
              padding: "4rem 1rem",
              textAlign: "center",
              color: colors.text,
            }}
          >
            <Bell size={42} style={{ margin: "0 auto 0.75rem", color: colors.primary }} />
            <h3 style={{ color: colors.boldText, margin: "0 0 0.375rem", fontSize: "1rem" }}>
              No notifications
            </h3>
            <p style={{ margin: 0, fontSize: "0.875rem" }}>
              You are all caught up in this category.
            </p>
          </div>
        ) : (
          <div>
            {Object.entries(groupedNotifications)
              .filter(([, items]) => items.length > 0)
              .map(([group, items]) => (
                <div key={group}>
                  <div
                    style={{
                      padding: "0.75rem 1.25rem",
                      backgroundColor: colors.muted,
                      borderBottom: `1px solid ${colors.border}`,
                    }}
                  >
                    <h3
                      style={{
                        color: colors.text,
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        margin: 0,
                        textTransform: "uppercase",
                      }}
                    >
                      {group}
                    </h3>
                  </div>

                  {items.map((notification) => {
                    const notificationId = notification._id || notification.id;
                    const avatar = notification.actor?.profile;

                    return (
                      <div
                        key={notificationId}
                        onClick={() => handleNotificationClick(notification)}
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.875rem",
                          padding: "1rem 1.25rem",
                          borderBottom: `1px solid ${colors.border}`,
                          backgroundColor: notification.read ? colors.cards : colors.primarySoft,
                          cursor: "pointer",
                          transition: "background-color 0.15s",
                        }}
                      >
                        {avatar ? (
                          <img
                            src={avatar}
                            alt=""
                            style={{
                              width: "2.75rem",
                              height: "2.75rem",
                              borderRadius: "50%",
                              objectFit: "cover",
                              flexShrink: 0,
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "2.75rem",
                              height: "2.75rem",
                              borderRadius: "50%",
                              backgroundColor: colors.primary,
                              color: "#fff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: 700,
                              flexShrink: 0,
                            }}
                          >
                            {getInitial(notification)}
                          </div>
                        )}

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h4
                            style={{
                              color: colors.boldText,
                              fontSize: "0.9375rem",
                              fontWeight: 700,
                              margin: "0 0 0.25rem",
                            }}
                          >
                            {notification.title}
                          </h4>
                          <p
                            style={{
                              color: colors.text,
                              fontSize: "0.875rem",
                              margin: "0 0 0.5rem",
                              lineHeight: 1.45,
                            }}
                          >
                            {notification.description}
                          </p>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.25rem",
                              color: colors.text,
                              fontSize: "0.75rem",
                            }}
                          >
                            <Clock size={13} />
                            {formatTime(notification.createdAt)}
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
                          {!notification.read && (
                            <span
                              aria-label="Unread"
                              style={{
                                width: "0.55rem",
                                height: "0.55rem",
                                borderRadius: "50%",
                                backgroundColor: "#2563EB",
                                display: "inline-block",
                              }}
                            />
                          )}
                          <div style={{ position: "relative" }}>
                            <button
                              onClick={(event) => {
                                event.stopPropagation();
                                setOpenMenuId(openMenuId === notificationId ? null : notificationId);
                              }}
                              aria-label="Notification actions"
                              style={{
                                padding: "0.35rem",
                                border: `1px solid ${colors.border}`,
                                borderRadius: "0.375rem",
                                backgroundColor: colors.cards,
                                color: colors.text,
                                cursor: "pointer",
                                display: "flex",
                              }}
                            >
                              <MoreVertical size={16} />
                            </button>
                            {openMenuId === notificationId && (
                              <div
                                style={{
                                  position: "absolute",
                                  right: 0,
                                  top: "2rem",
                                  width: "8.5rem",
                                  backgroundColor: colors.cards,
                                  border: `1px solid ${colors.border}`,
                                  borderRadius: "0.5rem",
                                  boxShadow: "0 12px 24px rgba(15, 23, 42, 0.14)",
                                  zIndex: 5,
                                  overflow: "hidden",
                                }}
                              >
                                <button
                                  onClick={(event) => handleDelete(event, notificationId)}
                                  style={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    padding: "0.625rem 0.75rem",
                                    border: "none",
                                    background: "transparent",
                                    color: "#DC2626",
                                    cursor: "pointer",
                                    fontSize: "0.875rem",
                                  }}
                                >
                                  <Trash2 size={14} />
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationInbox;
