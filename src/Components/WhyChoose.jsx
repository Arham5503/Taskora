function WhyChoose() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-gray-900 mb-3">
            Why Choose Taskora
          </h2>
          <p className="text-xl text-indigo-600 font-medium">
            Turn your goals into real progress
          </p>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Taskora gives you simple, powerful tools that help you stay
            consistent, organized, and motivated — every single day.
          </p>
        </div>

        {/* 3 Feature Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 hover:shadow-md hover:-translate-y-1 transition duration-300">
            <h3 className="text-xl font-semibold text-indigo-700 mb-3">
              Stay Organized Effortlessly
            </h3>
            <p className="text-gray-600">
              Manage tasks, goals, and projects in one clean dashboard that
              keeps you focused and stress-free throughout your day.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 hover:shadow-md hover:-translate-y-1 transition duration-300">
            <h3 className="text-xl font-semibold text-indigo-700 mb-3">
              Build Better Habits
            </h3>
            <p className="text-gray-600">
              Set priorities, track your daily progress, and stay consistent
              with smart reminders designed to help you follow through.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 hover:shadow-md hover:-translate-y-1 transition duration-300">
            <h3 className="text-xl font-semibold text-indigo-700 mb-3">
              See Your Growth
            </h3>
            <p className="text-gray-600">
              Stay motivated with progress charts, completion stats, and
              milestones that show how far you've come over time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;
