import { FileText, Calendar, Star } from "lucide-react";
import { useContext } from "react";
import { AppSettingsContext } from "../Context/ThemeContext";
function Projects() {
  const { colors } = useContext(AppSettingsContext);
  const projectsMock = [
    {
      title: "Figma Design System",
      disc: "UI component library for design system",
      status: "In Progress",
      icon: <Star className="w-4 h-4 " fill="#EAB308" stroke="#EAB308" />,
      deadline: "Nov 15, 2023",
      progress: 65,
      tasks: 24,
    },
    {
      title: "Keep React",
      disc: "React component library development",
      status: "Planning",
      deadline: "Dec 5, 2023",
      progress: 35,
      tasks: 18,
    },
    {
      title: "UI Redesign",
      disc: "Complete modern redesign of dashboard UI",
      status: "In Progress",
      icon: <Star className="w-4 h-4 " fill="#EAB308" stroke="#EAB308" />,
      deadline: "Jan 12, 2024",
      progress: 62,
      tasks: 24,
    },
    {
      title: "API Integration",
      disc: "Integrating backend API with frontend modules",
      status: "Completed",
      icon: <Star className="w-4 h-4 " />,
      deadline: "Nov 28, 2023",
      progress: 100,
      tasks: 30,
    },
  ];
  return (
    <>
      {/* Projects */}
      <section className="py-5">
        <h1 className="text-2xl font-medium">Project Overview</h1>
        {/* Project card */}
        <div className="grid grid-cols-2 gap-6 my-4">
          {projectsMock.map((card, index) => (
            <div
              key={index}
              className="border border-[#E5E5E5] flex flex-col gap-6 rounded-lg p-4 bg-white shadow-sm"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <div
                  className=" pl-2 flex-1"
                  style={{
                    borderLeft: `4px solid ${
                      card.status === "Completed"
                        ? "#22C55E"
                        : card.status === "Planning"
                        ? "#3B82F6"
                        : "#EAB308"
                    }`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <h2 className="text-[18px] font-medium text-black">
                      {card.title}
                    </h2>
                    <span
                      style={{
                        color:
                          card.status === "Completed" ? "#22C55E" : "#EAB308",
                      }}
                    >
                      {card?.icon}
                    </span>
                  </div>
                  <p className="text-[14px] text-gray-500">{card.disc}</p>
                </div>
                <div
                  className="text-[14px] px-3 py-1 rounded-full "
                  style={{
                    backgroundColor:
                      card.status === "Completed"
                        ? "#DCFCE7"
                        : card.status === "Planning"
                        ? "#DBEAFE"
                        : "#FEF9C3",
                    color:
                      card.status === "Completed"
                        ? "#166534"
                        : card.status === "Planning"
                        ? "#1E40AF"
                        : "#854D0E",
                  }}
                >
                  {card.status}
                </div>
              </div>
              <div>
                {/* Deadline */}
                <div className="flex items-center text-gray-500 mb-3">
                  <Calendar className="w-5 h-5" />
                  <span className="ml-2 text-[14px]">
                    Deadline: {card.deadline}
                  </span>
                </div>

                {/* Progress */}
                <div
                  className="flex justify-between items-center text-[14px] my-2"
                  style={{ color: colors.text }}
                >
                  <span>Progress</span>
                  <span>{card.progress}%</span>
                </div>
                <div className="h-2 rounded-md overflow-hidden bg-[#F5F5F5]">
                  <div
                    className="bg-black h-full"
                    style={{ width: `${card.progress}%` }}
                  ></div>
                </div>

                {/* Team & Tasks */}
                <div className="flex justify-between items-center mt-3">
                  {/* Team avatars */}
                  <div className="flex -space-x-2">
                    <img
                      className="w-7 h-7 rounded-full border-2 border-white"
                      src="alex-morgan.png"
                      alt="Alex"
                    />
                    <img
                      className="w-7 h-7 rounded-full border-2 border-white"
                      src="david-kim.png"
                      alt="David"
                    />
                    <img
                      className="w-7 h-7 rounded-full border-2 border-white"
                      src="jessica-chen.png"
                      alt="Jessica"
                    />
                  </div>

                  {/* Tasks */}
                  <div className="flex items-center gap-1 text-gray-500 text-[14px]">
                    <FileText className="w-4 h-4 stroke-gray-400" />
                    <span>{card.tasks} tasks</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
export default Projects;
