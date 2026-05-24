import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Filter, Users } from "lucide-react";
import { getMyTasks } from "../api/ApiBuilder";
import { toast } from "react-toastify";

const TaskCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("Month");
  const [showAllProjects, setShowAllProjects] = useState(true);
  const [showAllAssignees, setShowAllAssignees] = useState(true);

  useEffect(() => {
    fetchTasks();

    const refreshInterval = setInterval(fetchTasks, 30000);
    const handleVisibilityChange = () => {
      if (!document.hidden) fetchTasks();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(refreshInterval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getMyTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch calendar tasks:", error);
      toast.error("Failed to load calendar tasks");
    } finally {
      setLoading(false);
    }
  };

  const taskColors = {
    high: "bg-red-100 text-red-700",
    medium: "bg-blue-100 text-blue-700",
    low: "bg-green-100 text-green-700",
  };

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

  const calendarTasks = useMemo(
    () =>
      tasks
        .filter((task) => task.dueDate)
        .map((task) => {
          const dueDate = new Date(task.dueDate);

          return {
            ...task,
            dueYear: dueDate.getFullYear(),
            dueMonth: dueDate.getMonth(),
            dueDay: dueDate.getDate(),
          };
        }),
    [tasks],
  );

  const visibleMonthTasks = calendarTasks.filter(
    (task) =>
      task.dueYear === currentDate.getFullYear() &&
      task.dueMonth === currentDate.getMonth(),
  );

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
    return visibleMonthTasks.filter((task) => task.dueDay === day);
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
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event._id}
                    title={`${event.title} (${event.project?.title || "No project"})`}
                    className={`${
                      taskColors[event.priority] || taskColors.medium
                    } px-2 py-1 rounded text-xs truncate`}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="px-2 py-1 text-xs text-gray-500">
                    +{dayEvents.length - 3} more
                  </div>
                )}
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
            {loading ? "Loading..." : `${visibleMonthTasks.length} tasks`}
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
