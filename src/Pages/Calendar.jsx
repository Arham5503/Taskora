import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Filter, Users } from "lucide-react";

const TaskCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 1));
  const [view, setView] = useState("Month");
  const [showAllProjects, setShowAllProjects] = useState(true);
  const [showAllAssignees, setShowAllAssignees] = useState(true);

  const events = [
    {
      id: 1,
      title: "Design System Review",
      date: 10,
      color: "bg-purple-200 text-purple-700",
    },
    {
      id: 2,
      title: "Client Meeting",
      date: 12,
      color: "bg-yellow-200 text-yellow-700",
    },
    {
      id: 3,
      title: "Mobile App Sprint Planning",
      date: 15,
      color: "bg-cyan-200 text-cyan-700",
    },
    {
      id: 4,
      title: "Website Launch",
      date: 19,
      color: "bg-green-200 text-green-700",
    },
    {
      id: 5,
      title: "Team Building",
      date: 24,
      color: "bg-pink-200 text-pink-700",
    },
    {
      id: 6,
      title: "Team Building",
      date: 26,
      color: "bg-pink-200 text-pink-700",
    },
  ];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentDate);

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getEventsForDate = (day) => {
    return events.filter((event) => event.date === day);
  };

  const renderCalendarDays = () => {
    const days = [];
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

    for (let i = 0; i < totalCells; i++) {
      const dayNumber = i - firstDay + 1;
      const isValidDay = dayNumber > 0 && dayNumber <= daysInMonth;
      const dayEvents = isValidDay ? getEventsForDate(dayNumber) : [];

      days.push(
        <div
          key={i}
          className="min-h-24 sm:min-h-28 border border-gray-200 bg-white p-1 sm:p-2 relative overflow-hidden"
        >
          {isValidDay && (
            <>
              <div className="text-xs sm:text-sm text-gray-600 font-medium mb-1">
                {dayNumber}
              </div>
              <div className="space-y-1">
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`${event.color} px-2 py-1 rounded text-xs truncate`}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-2 sm:p-4 md:p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm mb-4 p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Left side - Navigation */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={previousMonth}
                className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={nextMonth}
                className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h1>
            <button
              onClick={goToToday}
              className="px-2 sm:px-3 py-1 text-xs sm:text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Today
            </button>
          </div>

          {/* Right side - View options and filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              {["Month", "Week", "Day"].map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded transition-colors ${
                    view === v
                      ? "bg-white shadow-sm font-medium"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowAllProjects(!showAllProjects)}
              className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 border rounded-lg transition-colors text-xs sm:text-sm ${
                showAllProjects
                  ? "border-gray-300 bg-white hover:bg-gray-50"
                  : "border-blue-500 bg-blue-50 text-blue-700"
              }`}
            >
              <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">All Projects</span>
              <span className="sm:hidden">Projects</span>
            </button>

            <button
              onClick={() => setShowAllAssignees(!showAllAssignees)}
              className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-2 border rounded-lg transition-colors text-xs sm:text-sm ${
                showAllAssignees
                  ? "border-gray-300 bg-white hover:bg-gray-50"
                  : "border-blue-500 bg-blue-50 text-blue-700"
              }`}
            >
              <Users className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">All Assignees</span>
              <span className="sm:hidden">Assignees</span>
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Month/Year header with event count */}
        <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={previousMonth}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <h2 className="text-base sm:text-lg font-semibold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={nextMonth}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
          <span className="text-xs sm:text-sm text-blue-600 font-medium">
            {events.length} events
          </span>
        </div>

        {/* Day names header */}
        <div className="grid grid-cols-7 bg-gray-50">
          {dayNames.map((day) => (
            <div
              key={day}
              className="py-2 sm:py-3 text-center text-xs sm:text-sm font-medium text-gray-600 border-b border-r border-gray-200 last:border-r-0"
            >
              <span className="hidden sm:inline">{day}</span>
              <span className="sm:hidden">{day.slice(0, 1)}</span>
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7">{renderCalendarDays()}</div>
      </div>
    </div>
  );
};

export default TaskCalendar;
