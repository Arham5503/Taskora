import { FileText, Calendar, Star } from "lucide-react";
import { useContext } from "react";
import { AppSettingsContext } from "../Context/ThemeContext";
function Projects({ projectsData }) {
  const { colors } = useContext(AppSettingsContext);
  console.log(projectsData);
  // get date function
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

  return (
    <>
      {/* Projects */}
      <section className="py-5">
        <h1 className="text-2xl font-medium" style={{ color: colors.boldText }}>
          Project Overview
        </h1>
        {/* Project card */}
        {Array.isArray(projectsData) && projectsData.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 my-4">
            {projectsData.slice(0, 4).map((card) => (
              <div
                key={card._id}
                className="border border-[#E5E5E5] flex flex-col gap-6 rounded-lg p-4 shadow-sm"
                style={{ background: colors.cards, color: colors.text }}
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
                      <h2
                        className="text-[18px] font-medium "
                        style={{ color: colors.boldText }}
                      >
                        {card.title || "Untitled Project"}
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
                    <p className="text-[14px] text-[#A6A6A6]">
                      {card.description || card.disc || "No description"}
                    </p>
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
                      Deadline: {dateFinder(card.durationDays)}
                    </span>
                  </div>

                  {/* Progress */}
                  <div
                    className="flex justify-between items-center text-[14px] my-2"
                    style={{ color: colors.text }}
                  >
                    <span>Progress</span>
                    <span>{card.progress ?? 0}%</span>
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
                      {/* <span>{card.tasks} tasks</span> */}
                      <span>0 tasks</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          "No Projects Created Yet"
        )}
      </section>
    </>
  );
}
export default Projects;
