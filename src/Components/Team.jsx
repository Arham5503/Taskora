import React from "react";
import { Users, MoreVertical, TrendingUp, TrendingDown } from "lucide-react";

const TeamMembersDashboard = () => {
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
    <section className="py-5 ">
      <div className="max-w-7xl mx-auto overflow-hidden">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Team Members
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Performance overview of team members
                </p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Users className="w-4 h-4" />
                View All
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tasks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {teamMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* Name Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {member.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {member.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Role Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{member.role}</div>
                    </td>

                    {/* Tasks Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-10 h-6 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
                          {member.tasks.total}
                        </span>
                        <span className="inline-flex items-center justify-center w-10 h-6 text-xs font-medium text-yellow-700 bg-yellow-100 rounded-full">
                          {member.tasks.inProgress}
                        </span>
                        <span className="inline-flex items-center justify-center w-10 h-6 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                          {member.tasks.completed}
                        </span>
                      </div>
                    </td>

                    {/* Performance Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-full ${
                          member.performance.trend === "up"
                            ? "text-green-700 bg-green-100"
                            : "text-red-700 bg-red-100"
                        }`}
                      >
                        {member.performance.trend === "up" ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        {member.performance.label}
                      </span>
                    </td>

                    {/* Actions Column */}
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamMembersDashboard;
