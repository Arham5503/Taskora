import {
  CalendarDays,
  User,
  ChevronLeft,
  ChevronRight,
  Rocket,
  CircleCheck,
  Users,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
function HomeScreen() {
  // Tasks Mock Data
  const mockTasks = [
    {
      id: 1,
      title: "UI Placement on Fitness App",
      description: "Design and adjust UI components for the workout screen.",
      dueDate: "Today",
      dueTime: "11:00 PM",
      project: "Fitness App",
      priority: "High",
      status: "In Progress",
      categoryLetter: "F",
      profileIcon: "/assets/icons/user.png",
      calendarIcon: "/assets/icons/calendar.png",
    },
    {
      id: 2,
      title: "Workout Plan Page Refinement",
      description: "Improve layout spacing and typography.",
      dueDate: "Tomorrow",
      dueTime: "4:00 PM",
      project: "Fitness App",
      priority: "Medium",
      status: "Pending",
      categoryLetter: "F",
      profileIcon: "/assets/icons/user.png",
      calendarIcon: "/assets/icons/calendar.png",
    },
    {
      id: 3,
      title: "Meal Tracker UI Fix",
      description: "Fix overlapping card elements and update icons.",
      dueDate: "This Week",
      dueTime: "6:00 PM",
      project: "Fitness App",
      priority: "Low",
      status: "Pending",
      categoryLetter: "F",
      profileIcon: "/assets/icons/user.png",
      calendarIcon: "/assets/icons/calendar.png",
    },
    {
      id: 4,
      title: "Dashboard Widgets Placement",
      description: "Place analytics widgets with consistent spacing.",
      dueDate: "Today",
      dueTime: "9:00 PM",
      project: "Fitness App",
      priority: "High",
      status: "Completed",
      categoryLetter: "F",
      profileIcon: "/assets/icons/user.png",
      calendarIcon: "/assets/icons/calendar.png",
    },
    {
      id: 5,
      title: "Steps Counter UI Revamp",
      description: "Redesign the step counter with a new circular progress.",
      dueDate: "Next Monday",
      dueTime: "5:00 PM",
      project: "Fitness App",
      priority: "Medium",
      status: "In Progress",
      categoryLetter: "F",
      profileIcon: "/assets/icons/user.png",
      calendarIcon: "/assets/icons/calendar.png",
    },
    {
      id: 6,
      title: "Steps Counter UI Revamp",
      description: "Redesign the step counter with a new circular progress.",
      dueDate: "Next Monday",
      dueTime: "5:00 PM",
      project: "Fitness App",
      priority: "Medium",
      status: "In Progress",
      categoryLetter: "F",
      profileIcon: "/assets/icons/user.png",
      calendarIcon: "/assets/icons/calendar.png",
    },
    {
      id: 7,
      title: "Steps Counter UI Revamp",
      description: "Redesign the step counter with a new circular progress.",
      dueDate: "Next Monday",
      dueTime: "5:00 PM",
      project: "Fitness App",
      priority: "Medium",
      status: "In Progress",
      categoryLetter: "F",
      profileIcon: "/assets/icons/user.png",
      calendarIcon: "/assets/icons/calendar.png",
    },
    {
      id: 8,
      title: "Steps Counter UI Revamp",
      description: "Redesign the step counter with a new circular progress.",
      dueDate: "Next Monday",
      dueTime: "5:00 PM",
      project: "Fitness App",
      priority: "Medium",
      status: "In Progress",
      categoryLetter: "F",
      profileIcon: "/assets/icons/user.png",
      calendarIcon: "/assets/icons/calendar.png",
    },
    {
      id: 9,
      title: "Steps Counter UI Revamp",
      description: "Redesign the step counter with a new circular progress.",
      dueDate: "Next Monday",
      dueTime: "5:00 PM",
      project: "Fitness App",
      priority: "Medium",
      status: "In Progress",
      categoryLetter: "F",
      profileIcon: "/assets/icons/user.png",
      calendarIcon: "/assets/icons/calendar.png",
    },
    {
      id: 10,
      title: "Steps Counter UI Revamp",
      description: "Redesign the step counter with a new circular progress.",
      dueDate: "Next Monday",
      dueTime: "5:00 PM",
      project: "Fitness App",
      priority: "Medium",
      status: "In Progress",
      categoryLetter: "F",
      profileIcon: "/assets/icons/user.png",
      calendarIcon: "/assets/icons/calendar.png",
    },
  ];

  // Pagination Code
  const itemsPerPage = 5;
  const totalPages = Math.ceil(mockTasks.length / itemsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Cards Mock Data
  const mockCards = [
    {
      category: "App Development #1",
      title: "Fitness App",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, sit.",
      image: "https://picsum.photos/400/200?random=1",
    },
    {
      category: "Web Development #2",
      title: "SaaS Dashboard",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, sit.",
      image: "https://picsum.photos/400/200?random=2",
    },
  ];

  // Date function
  const today = new Date();
  const dayNum = today.getDay();
  const dayName = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Seturday",
    "Sunday",
  ];
  const monthName = [
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

  const weekCel = ["Mon", "Tus", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const hourlyPlans = [
    {
      hour: "8:00 am",
      taskTitle: "Task Planning",
      taskDes: "Review Daily Tasks and set priorities",
    },
    {
      hour: "9:05 am",
      taskTitle: "Do Not Disturb",
      taskDes: "Work on my daily task",
    },
    {
      hour: "11:20 am",
      taskTitle: "Daily Catch-up with design team",
      taskDes: "New App Design and Development",
    },
    {
      hour: "12:30 pm",
      taskTitle: "Lunch Break",
      taskDes: "",
    },
    {
      hour: "1:30 pm",
      taskTitle: "Brain Strom with Team",
      taskDes: "New App Design and Development",
    },
    {
      hour: "2:30 pm",
      taskTitle: "Client Call",
      taskDes: "Discuss project updates and feedback",
    },
    {
      hour: "3:15 pm",
      taskTitle: "Code Review",
      taskDes: "Review pull requests and give feedback",
    },
    {
      hour: "4:00 pm",
      taskTitle: "Focus Time",
      taskDes: "Work on high-priority tasks without interruption",
    },
    {
      hour: "5:00 pm",
      taskTitle: "Team Stand-up",
      taskDes: "Daily update on tasks and blockers",
    },
    {
      hour: "5:30 pm",
      taskTitle: "Wrap Up",
      taskDes: "Summarize completed tasks and plan for tomorrow",
    },
    {
      hour: "6:00 pm",
      taskTitle: "Evening Learning",
      taskDes: "Read articles or watch tutorials on new tech",
    },
  ];

  return (
    <>
      <main className="flex gap-5 bg-[#F9FCFE]">
        <section>
          {/* Upper tasks block */}
          <div className="shadow-xl p-4  rounded-xl">
            <div className="flex justify-between ">
              <h2 className="text-[18px] font-bold">My tasks</h2>
              <Link
                to="/tasks"
                className="text-[#105EF5] font-medium underline"
              >
                See all
              </Link>
            </div>
            {mockTasks.slice(0, 5).map((task) => {
              return (
                <div key={task.id} className="">
                  <div className="border-b-2 flex justify-between py-2">
                    <div className="flex gap-2">
                      <input type="checkbox" />
                      <div>
                        <h3>{task.title}</h3>
                        <span className="flex items-center gap-2">
                          <CalendarDays className="w-4 h-4" /> {task.dueDate}{" "}
                          {task.dueTime}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-end mb-2 w-full">
                        <User className="w-5 h-5" />
                      </div>
                      <span className="flex gap-2">
                        <p>{task.project}</p>
                        <span className="text-[#105EF5] font-bold bg-[#E3F5FF] w-6 h-6 text-center rounded">
                          {task.categoryLetter}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="p-2 text-[#105EF5] flex justify-end gap-2">
              <span className="text-[#105EF5]">
                <ChevronLeft />
              </span>
              {pages.map((page) => {
                return (
                  <span
                    key={page}
                    className="bg-[#105EF5]  text-white rounded w-6 h-6 text-center"
                  >
                    {page}
                  </span>
                );
              })}
              {/* <span>...</span> */}
              <span className="text-[#105EF5] ">
                <ChevronRight />
              </span>
            </div>
          </div>
          {/* Projects Block */}
          <div className="shadow-xl p-4  rounded-xl">
            <div className="flex justify-between ">
              <h2 className="text-[18px] font-bold">Projects</h2>
              <a href="" className="text-[#105EF5] font-medium underline">
                See all
              </a>
            </div>
            {/* <div className="flex gap-2"> */}
            <div className="grid grid-cols-3 gap-2 py-3">
              {/* Cards Data */}
              {mockCards.map((card) => {
                return (
                  <div className="shadow-2xl rounded-xl overflow-hidden">
                    <img src={card.image} alt={card.title} />
                    <div className="p-2">
                      <p className="text-[#105EF5]">{card.category} </p>
                      <h1 className="text-[22px] ">{card.title}</h1>
                      <p className="text-[13px] text-[#737373]">
                        {card.description}
                      </p>
                      <button className="text-[#105EF5] border-[#105ef5] border rounded-2xl px-3 py-1 my-2">
                        View All
                      </button>
                      {/* <div>for icons</div> */}
                    </div>
                  </div>
                );
              })}

              <div className="text-[#105EF5] flex justify-center flex-col items-center bg-[#E3F5FF] shadow-2xl rounded-xl">
                <div className="w-10 h-10">
                  <Plus className="w-8 h-8" />
                </div>
                <h2>Create a new project</h2>
              </div>
            </div>
          </div>
        </section>
        <section className="">
          {/* Status Dashboard */}
          <div>
            <div className="flex justify-between gap-2 my-2">
              <div className="flex gap-2 shadow-2xl rounded-xl p-2">
                <div>
                  <p className="text-[14px] text-[#737373]">
                    Today's Productivity
                  </p>
                  <span className="flex items-center">
                    <h3>10/8 </h3>{" "}
                    <p className="ml-1 text-[#48BB78] text-[13px]"> +55%</p>
                  </span>
                </div>
                <div className="bg-[#E3F5FF] flex justify-center items-center rounded p-2">
                  <Rocket className="text-[#105EF5]" />
                </div>
              </div>

              <div className="flex gap-2 shadow-2xl rounded-xl p-2">
                <div>
                  <p className="text-[14px] text-[#737373]">
                    Monthly Productivity
                  </p>
                  <span className="flex">
                    <h3>620/598</h3>
                    <p className="ml-1 text-[#48BB78] text-[13px]">+95%</p>
                  </span>
                </div>
                <div className="bg-[#E3F5FF] flex justify-center items-center rounded p-2">
                  <CalendarDays className="text-[#105EF5]" />
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-2">
              <div className="flex gap-2 shadow-2xl rounded-xl p-2">
                <div>
                  <p className="text-[14px] text-[#737373]">Meetings atended</p>
                  <span className="flex">
                    <h3>85/85</h3>
                    <p className="ml-1 text-[#48BB78] text-[13px]">+100%</p>
                  </span>
                </div>
                <div className="bg-[#E3F5FF] flex justify-center items-center rounded p-2">
                  <Users className="text-[#105EF5]" />
                </div>
              </div>

              <div className="flex gap-2 shadow-2xl rounded-xl p-2">
                <div>
                  <p className="text-[14px] text-[#737373]">
                    Tasks Done Weekly
                  </p>
                  <span className="flex">
                    <h3>29/30</h3>
                    <p className="ml-1 text-[#48BB78] text-[13px]">+101%</p>
                  </span>
                </div>
                <div className="bg-[#E3F5FF] flex justify-center items-center rounded p-2">
                  <CircleCheck className="text-[#105EF5]" />
                </div>
              </div>
            </div>
          </div>
          {/* Calender */}
          <div className="shadow-xl p-4  rounded-xl">
            <div className="flex justify-between ">
              <h2 className="text-[18px] font-bold">Projects</h2>
              <a href="" className="text-[#105EF5] font-medium underline">
                See all
              </a>
            </div>
            <div className="flex flex-col">
              <span>Today</span>
              <h1 className="text-xl font-bold mb-1.5">
                {dayName[dayNum]}, {today.getDate()}{" "}
                {monthName[today.getMonth()]} {today.getFullYear()}
              </h1>
            </div>
            <div>
              <div className="flex justify-between space-x-2">
                {weekCel.map((day, index) => {
                  const today = new Date();
                  const dayOfWeek = today.getDay();

                  const jsWeekIndex = (dayOfWeek + 6) % 7;

                  const weekStart = new Date(today);
                  weekStart.setDate(today.getDate() - jsWeekIndex);

                  const cellDate = new Date(weekStart);
                  cellDate.setDate(weekStart.getDate() + index);

                  return (
                    <div
                      className="rounded border-[#105EF5] border min-w-10 p-2 text-center"
                      style={{
                        backgroundColor:
                          today.toDateString() === cellDate.toDateString()
                            ? "#105EF5"
                            : "transparent",
                        color:
                          today.toDateString() === cellDate.toDateString()
                            ? "white"
                            : "black",
                      }}
                      key={index}
                    >
                      <h1>{day}</h1>
                      <h1>{cellDate.getDate()}</h1>
                    </div>
                  );
                })}
              </div>

              <div className="my-2">
                {hourlyPlans.slice(0, 6).map((plan) => {
                  return (
                    <>
                      <div className="flex gap-2 my-2">
                        <div className="min-w-18">
                          <p className="text-[#105EF5]">{plan.hour}</p>
                          <div className="w-0.5 justify-self-center bg-[#d2efff] h-10"></div>
                        </div>
                        <div className="border-[#105EF5] rounded border-l-4 bg-[#E3F5FF] p-2">
                          <h3 className="font-bold">{plan.taskTitle}</h3>
                          <p>{plan.taskDes}</p>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
export default HomeScreen;
