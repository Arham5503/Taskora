import React, { useState } from "react";
import { Clock, MoreVertical } from "lucide-react";

const NotificationInbox = () => {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "Tasks", "Mentions", "Projects", "System"];

  const notifications = [
    {
      id: 1,
      type: "task",
      category: "TODAY",
      title: "Task assigned to you",
      description: "Alex Morgan assigned you the task 'Update design system'",
      time: "about 1 hour ago",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      unread: true,
    },
    {
      id: 2,
      type: "mention",
      category: "TODAY",
      title: "You were mentioned in a comment",
      description:
        "Jessica Chen mentioned you in a comment: 'Can @you review this by tomorrow?'",
      time: "about 3 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      unread: false,
    },
    {
      id: 3,
      type: "project",
      category: "TODAY",
      title: "Project status updated",
      description:
        "The project 'Figma Design System' status changed to 'In Progress'",
      time: "about 6 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      unread: true,
    },
    {
      id: 4,
      type: "task",
      category: "YESTERDAY",
      title: "Task completed",
      description:
        'Your task "Review user feedback" has been marked as complete',
      time: "yesterday at 4:30 PM",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      unread: false,
    },
  ];

  const getFilteredNotifications = () => {
    if (activeTab === "All") return notifications;
    return notifications.filter(
      (n) => n.type.toLowerCase() === activeTab.toLowerCase().slice(0, -1)
    );
  };

  const groupedNotifications = getFilteredNotifications().reduce(
    (acc, notification) => {
      if (!acc[notification.category]) {
        acc[notification.category] = [];
      }
      acc[notification.category].push(notification);
      return acc;
    },
    {}
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white min-h-screen shadow-sm">
        {/* Tabs */}
        <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="divide-y divide-gray-100">
          {Object.entries(groupedNotifications).map(([category, items]) => (
            <div key={category}>
              <div className="px-6 py-3 bg-gray-50">
                <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {category}
                </h2>
              </div>

              {items.map((notification) => (
                <div
                  key={notification.id}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors relative"
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <img
                      src={notification.avatar}
                      alt="Avatar"
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-gray-900 mb-1">
                        {notification.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {notification.description}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        {notification.time}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {notification.unread && (
                        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      )}
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {getFilteredNotifications().length === 0 && (
          <div className="px-6 py-16 text-center">
            <p className="text-gray-500">No notifications in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationInbox;
