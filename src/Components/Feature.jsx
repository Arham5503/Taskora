function Feature() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-gray-900">
            Everything You Need to Manage
          </h2>
          <h3 className="text-3xl md:text-4xl font-heading font-semibold text-indigo-600 mt-1">
            Your Projects & Tasks
          </h3>

          <p className="mt-5 text-gray-600 max-w-2xl mx-auto">
            From daily to-dos to major projects — Taskora helps you organize,
            track, and achieve more with clarity and focus.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* Card 1 */}
          <div className="p-8 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300">
            <h4 className="text-lg font-semibold text-indigo-700 mb-2">
              All-in-One Dashboard
            </h4>
            <p className="text-gray-600">
              View all your projects, deadlines, and progress in a single, clean
              workspace built for clarity.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300">
            <h4 className="text-lg font-semibold text-indigo-700 mb-2">
              Smart Task Management
            </h4>
            <p className="text-gray-600">
              Prioritize work, break down tasks, and stay focused with simple,
              intuitive controls.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300">
            <h4 className="text-lg font-semibold text-indigo-700 mb-2">
              Goal & Habit Tracker
            </h4>
            <p className="text-gray-600">
              Set personal goals, track your habits, and celebrate progress with
              motivating milestones.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-8 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300">
            <h4 className="text-lg font-semibold text-indigo-700 mb-2">
              Reminders & Scheduling
            </h4>
            <p className="text-gray-600">
              Stay on top of every task with smart reminders, recurring
              schedules, and calendar sync.
            </p>
          </div>

          {/* Card 5 */}
          <div className="p-8 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300">
            <h4 className="text-lg font-semibold text-indigo-700 mb-2">
              Progress Insights
            </h4>
            <p className="text-gray-600">
              Track your productivity with charts and analytics that keep you
              motivated to improve.
            </p>
          </div>

          {/* Card 6 */}
          <div className="p-8 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300">
            <h4 className="text-lg font-semibold text-indigo-700 mb-2">
              Customizable Workspace
            </h4>
            <p className="text-gray-600">
              Switch between light/dark themes and tailor your setup for maximum
              focus and comfort.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Feature;
