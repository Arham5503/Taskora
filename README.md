# Taskore

A full-featured project and task management web application built with React and Vite. Taskore lets teams create projects, manage tasks on a kanban board, invite members via links, and track progress through analytics dashboards.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Routing](#routing)
- [Pages](#pages)
- [API Reference](#api-reference)
- [Components](#components)
- [Modals](#modals)
- [Context & State Management](#context--state-management)
- [UI Components](#ui-components)
- [Theming](#theming)
- [Features](#features)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite 7 |
| Routing | React Router DOM 7 |
| Styling | Tailwind CSS 4 |
| Charts | Recharts, Chart.js |
| Icons | Lucide React |
| Notifications | React Toastify |
| Image Upload | Cloudinary |
| Auth | Cookie-based sessions (HTTP-only) |

---

## Project Structure

```
Taskore/
├── public/                   # Static assets
├── src/
│   ├── api/
│   │   └── ApiBuilder.js     # All API call functions
│   ├── assets/               # Images and SVGs
│   ├── Components/           # Reusable UI components
│   ├── Context/
│   │   ├── AuthContext.jsx   # Authentication state
│   │   └── ThemeContext.jsx  # Light/dark theme state
│   ├── models/               # Modal dialogs
│   │   ├── CreateProject.jsx
│   │   └── CreateTask.jsx
│   ├── Pages/                # Route-level page components
│   ├── routes/
│   │   └── AppRoutes.jsx     # Route definitions
│   ├── UI/
│   │   └── OTPInput.jsx      # Reusable OTP input field
│   ├── App.jsx               # App wrapper with providers
│   ├── App.css               # Global layout styles
│   ├── index.css             # Tailwind CSS entry
│   └── main.jsx              # React DOM entry point
├── .env                      # Environment variables
├── index.html                # HTML shell
├── package.json
└── vite.config.js
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_BASE_URL=http://localhost:2004/api
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

| Variable | Description |
|----------|-------------|
| `VITE_BASE_URL` | Backend API base URL |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name for avatar uploads |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Cloudinary unsigned upload preset |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

The dev server runs at `http://localhost:5173` by default.

---

## Routing

Defined in [src/routes/AppRoutes.jsx](src/routes/AppRoutes.jsx).

### Public Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | LandingPage | Marketing landing page |
| `/login` | Login | Email + password login |
| `/signup` | Signup | New account registration |
| `/verify` | OTP-verify | Email OTP verification |
| `/join/:inviteCode` | JoinProject | Accept a project invite |

### Protected Routes

Wrapped in `ProtectedRoute` — redirects to `/` if unauthenticated, to `/verify` if unverified.

| Path | Page | Description |
|------|------|-------------|
| `/dashboard` | Dashboard | Analytics and overview |
| `/project` | ProjectsPage | All projects list |
| `/project/:projectId` | ProjectDetail | Single project + kanban |
| `/tasks` | TasksPage | All tasks kanban board |
| `/calendar` | Calendar | Month view calendar |
| `/notifications` | Notifications | Activity inbox |
| `/profile` | Profile | User profile settings |

---

## Pages

### LandingPage — `src/Pages/LandingPage.jsx`

Public marketing page composed of: `Navbar`, `Hero`, `Trust`, `WhyChoose`, `Feature`, `FAQ`, `Contact`, `Footer`. Visible only to unauthenticated users.

---

### Login — `src/Pages/Login.jsx`

- Email and password form
- On success: redirects to `/dashboard` (or `/verify` if account is unverified)
- Calls `POST /api/login`

---

### Signup — `src/Pages/Signup.jsx`

- Fields: username, email, password, confirm password
- Client-side validation before submission
- On success: redirects to `/verify`
- Calls `POST /api/signup`

---

### OTP Verify — `src/Pages/OTP-verify.jsx`

- 6-digit OTP entry using `OTPInput` component
- 60-second countdown with resend option
- Calls `verifyOTP(email, otp)` and `resendOTP(email)`

---

### Dashboard — `src/Pages/Dashboard.jsx`

Main hub after login. Displays:

- **Analytics cards** — Total Projects, In Progress, Completed, Overdue
- **Project Overview** — first 4 projects with status and progress bars
- **Area Chart** — task completion trend over 12 months
- **Donut Chart** — task breakdown by status (Completed / In Progress / Not Started)
- **Task List** — personal tasks grouped by Today / Tomorrow / Upcoming
- Quick-create buttons for new projects and tasks

Data sources: `getProjects()`, `getMyTasks()`

---

### ProjectsPage — `src/Pages/ProjectsPage.jsx`

Full project list with:

- **Grid / List view toggle**
- **Search** by project title
- **Per-project action menu**: View Details, Invite Member, Put on Hold, Change Status, Delete
- Project cards show: title, description, client, priority, progress, deadline, team avatars

---

### ProjectDetail — `src/Pages/ProjectDetail.jsx`

Single project view with two tabs:

**Tasks tab (Kanban board)**
- Columns: `todo`, `in_progress`, `in_review`, `done`
- Card-based layout per column
- Create tasks, update task status, delete tasks

**Team tab**
- List of all team members with roles
- Generate invite links (viewer / editor / manager roles)
- Remove members (owner only)

---

### TasksPage — `src/Pages/TasksPage.jsx`

Personal kanban board across all projects:

- Same 4-column layout as ProjectDetail
- Filter and search by title
- Create, update, and delete tasks
- Priority color coding: High (red), Medium (yellow), Low (green)

---

### Calendar — `src/Pages/Calendar.jsx`

- Month view calendar with prev/next navigation
- Events displayed on their due dates
- Filter events by project or assignee
- Currently displays static/hardcoded event data

---

### Notifications — `src/Pages/Notifications.jsx`

- Tab filters: All, Tasks, Mentions, Projects, System
- Notifications grouped by date (TODAY, YESTERDAY)
- Currently displays static/mock notification data

---

### Profile — `src/Pages/Profile.jsx`

- Edit username, email, and job title
- Upload profile avatar to Cloudinary
- Client-side image validation: type (jpg/png/gif/webp) and size (max 5 MB)

---

### JoinProject — `src/Pages/JoinProject.jsx`

- Accepts a project invite via URL param `:inviteCode`
- Fetches invite details with `getInviteInfo(inviteCode)`
- Prompts unauthenticated users to log in first; resumes join after login
- Calls `joinViaInvite(inviteCode)` on confirmation

---

## API Reference

All functions are in [src/api/ApiBuilder.js](src/api/ApiBuilder.js). The base URL is read from `import.meta.env.VITE_BASE_URL`. All requests use `credentials: "include"` for cookie-based auth.

### Authentication

| Function | Method | Endpoint | Description |
|----------|--------|----------|-------------|
| `verifyOTP(email, otp)` | POST | `/verify-otp` | Verify email OTP |
| `resendOTP(email)` | POST | `/resend-otp` | Resend verification OTP |

### Projects

| Function | Method | Endpoint | Description |
|----------|--------|----------|-------------|
| `getProjects()` | GET | `/project-data` | Get all projects for current user |
| `getProjectById(projectId)` | GET | `/project/:projectId` | Get single project |
| `createProject(projectData)` | POST | `/project` | Create a new project |
| `updateProject(projectId, updates)` | PUT | `/project/:projectId` | Update project fields |
| `updateProjectStatus(projectId, status)` | PATCH | `/project/:projectId/status` | Change project status |
| `deleteProject(projectId)` | DELETE | `/project/:projectId` | Delete a project |

### Team

| Function | Method | Endpoint | Description |
|----------|--------|----------|-------------|
| `getProjectTeam(projectId)` | GET | `/project/:projectId/team` | Get team members |
| `removeTeamMember(projectId, memberId)` | DELETE | `/project/:projectId/team/:memberId` | Remove a member |

### Invites

| Function | Method | Endpoint | Description |
|----------|--------|----------|-------------|
| `generateInviteLink(projectId, role)` | POST | `/project/:projectId/invite` | Generate invite URL |
| `getInviteInfo(inviteCode)` | GET | `/invite/:inviteCode` | Get invite metadata |
| `joinViaInvite(inviteCode)` | POST | `/invite/:inviteCode/join` | Accept an invite |

### Tasks

| Function | Method | Endpoint | Description |
|----------|--------|----------|-------------|
| `createTask(taskData)` | POST | `/task` | Create a task |
| `getMyTasks()` | GET | `/tasks` | Get current user's tasks |
| `getTasksByProject(projectId)` | GET | `/project/:projectId/tasks` | Get tasks for a project |
| `getTaskById(taskId)` | GET | `/task/:taskId` | Get single task |
| `updateTask(taskId, updates)` | PUT | `/task/:taskId` | Update task fields |
| `updateTaskStatus(taskId, status)` | PATCH | `/task/:taskId/status` | Change task status |
| `deleteTask(taskId)` | DELETE | `/task/:taskId` | Delete a task |

### Users

| Function | Method | Endpoint | Description |
|----------|--------|----------|-------------|
| `getAllUsers()` | GET | `/users` | Get all users (for assignee selection) |

---

## Components

All components live in [src/Components/](src/Components/).

### Layout Components

| Component | Description |
|-----------|-------------|
| `Layout.jsx` | Root wrapper: renders `Sidebar` + `Header` + `<Outlet>` for nested routes |
| `Sidebar.jsx` | Left nav with links to Dashboard, Projects, Tasks, Calendar, Notifications |
| `Header.jsx` | Top bar: page title, global search, theme toggle, create button, notifications icon, avatar |

### Dashboard Components

| Component | Description |
|-----------|-------------|
| `Analytics.jsx` | Four stat cards: Total Projects, In Progress, Completed, Overdue |
| `Projects.jsx` | Grid of the first 4 projects with status badges and progress bars |
| `TasksList.jsx` | Personal task list grouped by Today / Tomorrow / Upcoming with priority badges |
| `AreaChart.jsx` | Recharts AreaChart showing monthly task completion trend |
| `Donut.jsx` | Chart.js doughnut showing task status breakdown |

### Landing Page Components

| Component | Description |
|-----------|-------------|
| `Navbar.jsx` | Top navigation bar with logo and auth links |
| `Hero.jsx` | Hero section with headline and CTA buttons |
| `Trust.jsx` | Social proof / trust indicators |
| `WhyChoose.jsx` | Feature highlights section |
| `Feature.jsx` | Detailed feature breakdown |
| `FAQ.jsx` | Accordion-style frequently asked questions |
| `Contact.jsx` | Contact form / contact info section |
| `Footer.jsx` | Footer with social links and copyright |

### Other Components

| Component | Description |
|-----------|-------------|
| `Team.jsx` | Team member avatar list |
| `PricingModal.jsx` | Pricing tier comparison modal |

---

## Modals

### CreateProject — `src/models/CreateProject.jsx`

Form fields:
- Title, Description, Client name
- Priority: High / Medium / Low
- Duration + unit (days / weeks / months / years)
- Team member search and selection with role assignment (viewer / editor / manager)

Fetches all platform users from `GET /api/users` for the team picker. Submits via `createProject()`.

---

### CreateTask — `src/models/CreateTask.jsx`

Form fields:
- Title, Priority, Description
- Due date
- Project (dropdown — auto-loads that project's team members on selection)
- Category
- Multiple assignee selection

Submits via `createTask()`.

---

## Context & State Management

### AuthContext — `src/Context/AuthContext.jsx`

Provides: `user`, `setUser`, `loading`

- On app mount: calls `GET /api/me` to restore session from cookie
- If `/api/me` returns 401: attempts token refresh via `GET /api/refresh`, then retries
- `loading` flag prevents rendering protected routes before auth check completes
- Wraps the entire app via `AuthProvider` in `main.jsx`

### ThemeContext — `src/Context/ThemeContext.jsx`

Provides: `theme`, `colors`, `isDark`, `toggleTheme`

- Stores full color palettes for both light and dark modes
- Components consume `colors` directly instead of hardcoding hex values

**Color tokens:**

| Token | Light | Dark |
|-------|-------|------|
| `primary` | `#2563EB` | `#2563EB` |
| `background` | `#ffffff` | `#121212` |
| `sidebar` | `#ffffff` | `#1E1E1E` |

---

## UI Components

### OTPInput — `src/UI/OTPInput.jsx`

A 6-digit OTP entry control:

- Auto-focuses next field on digit entry
- Backspace moves focus to previous field
- Accepts numeric characters only
- Memoized with `React.memo` to prevent unnecessary re-renders

Props:

| Prop | Type | Description |
|------|------|-------------|
| `otp` | `string[]` | Array of 6 digit strings |
| `setOtp` | `function` | State setter for the OTP array |

---

## Theming

The app supports **light** and **dark** modes managed by `ThemeContext`. All themed components import `useTheme()` and apply `colors.*` properties inline.

**Status color mapping:**

| Status | Color |
|--------|-------|
| `planning` | Blue |
| `in_progress` | Yellow |
| `completed` | Green |
| `on_hold` | Orange |
| `archived` | Gray |

**Priority color mapping:**

| Priority | Color |
|----------|-------|
| `high` | Red |
| `medium` | Yellow |
| `low` | Green |

---

## Features

| Feature | Status |
|---------|--------|
| Email / password authentication | Complete |
| Email OTP verification | Complete |
| Project CRUD | Complete |
| Kanban task board | Complete |
| Team invites via shareable link | Complete |
| Role-based team access (viewer / editor / manager) | Complete |
| Dashboard analytics cards | Complete |
| Area chart (monthly task trend) | Complete |
| Donut chart (task status breakdown) | Complete |
| Dark / light theme toggle | Complete |
| Profile avatar upload (Cloudinary) | Complete |
| Responsive design (mobile / tablet / desktop) | Complete |
| Calendar view | Partial (static data) |
| Notifications inbox | Partial (static data) |
| Google OAuth login | Not implemented |
