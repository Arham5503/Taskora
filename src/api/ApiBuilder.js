const BASE_URL = import.meta.env.VITE_BASE_URL;

// ==================== PROJECT APIs ====================

// Fetch all Projects
export const getProjects = async () => {
  try {
    const response = await fetch(`${BASE_URL}/project-data`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Error (getProjects):", error);
    throw error;
  }
};

// Get single project by ID
export const getProjectById = async (projectId) => {
  try {
    const response = await fetch(`${BASE_URL}/project/${projectId}`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch project");
    }
    return await response.json();
  } catch (error) {
    console.error("API Error (getProjectById):", error);
    throw error;
  }
};

// Create new project
export const createProject = async (projectData) => {
  try {
    const response = await fetch(`${BASE_URL}/project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to create project");
    }
    return await response.json();
  } catch (error) {
    console.error("API Error (createProject):", error);
    throw error;
  }
};

// Update project
export const updateProject = async (projectId, updates) => {
  try {
    const response = await fetch(`${BASE_URL}/project/${projectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to update project");
    }
    return await response.json();
  } catch (error) {
    console.error("API Error (updateProject):", error);
    throw error;
  }
};

// Update project status
export const updateProjectStatus = async (projectId, status) => {
  try {
    const response = await fetch(`${BASE_URL}/project/${projectId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to update project status");
    }
    return await response.json();
  } catch (error) {
    console.error("API Error (updateProjectStatus):", error);
    throw error;
  }
};

// Delete project
export const deleteProject = async (projectId) => {
  try {
    const response = await fetch(`${BASE_URL}/project/${projectId}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to delete project");
    }
    return await response.json();
  } catch (error) {
    console.error("API Error (deleteProject):", error);
    throw error;
  }
};

// ==================== PROJECT TEAM APIs ====================

// Get project team
export const getProjectTeam = async (projectId) => {
  try {
    const response = await fetch(`${BASE_URL}/project/${projectId}/team`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch team");
    }
    return await response.json();
  } catch (error) {
    console.error("API Error (getProjectTeam):", error);
    throw error;
  }
};

// Remove team member
export const removeTeamMember = async (projectId, memberId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/project/${projectId}/team/${memberId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to remove team member");
    }
    return await response.json();
  } catch (error) {
    console.error("API Error (removeTeamMember):", error);
    throw error;
  }
};

// ==================== INVITE APIs ====================

// Generate invite link
export const generateInviteLink = async (projectId, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}/project/${projectId}/invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to generate invite link");
    }
    return await response.json();
  } catch (error) {
    console.error("API Error (generateInviteLink):", error);
    throw error;
  }
};

// Get invite info (for preview)
export const getInviteInfo = async (inviteCode) => {
  try {
    const response = await fetch(`${BASE_URL}/invite/${inviteCode}`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Invalid or expired invite");
    }
    return await response.json();
  } catch (error) {
    console.error("API Error (getInviteInfo):", error);
    throw error;
  }
};

// Join via invite
export const joinViaInvite = async (inviteCode) => {
  try {
    const response = await fetch(`${BASE_URL}/invite/${inviteCode}/join`, {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to join project");
    }
    return await response.json();
  } catch (error) {
    console.error("API Error (joinViaInvite):", error);
    throw error;
  }
};

// ==================== TASK APIs ====================

// Create task
export const createTask = async (taskData) => {
  try {
    const response = await fetch(`${BASE_URL}/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to create task");
    }
    return await response.json();
  } catch (error) {
    console.error("API Error (createTask):", error);
    throw error;
  }
};

// Get all user's tasks
export const getMyTasks = async () => {
  try {
    const response = await fetch(`${BASE_URL}/tasks`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    return await response.json();
  } catch (error) {
    console.error("API Error (getMyTasks):", error);
    throw error;
  }
};

// Get tasks by project
export const getTasksByProject = async (projectId) => {
  try {
    const response = await fetch(`${BASE_URL}/project/${projectId}/tasks`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    return await response.json();
  } catch (error) {
    console.error("API Error (getTasksByProject):", error);
    throw error;
  }
};

// Get task by ID
export const getTaskById = async (taskId) => {
  try {
    const response = await fetch(`${BASE_URL}/task/${taskId}`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch task");
    }
    return await response.json();
  } catch (error) {
    console.error("API Error (getTaskById):", error);
    throw error;
  }
};

// Update task
export const updateTask = async (taskId, updates) => {
  try {
    const response = await fetch(`${BASE_URL}/task/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to update task");
    }
    return await response.json();
  } catch (error) {
    console.error("API Error (updateTask):", error);
    throw error;
  }
};

// Update task status
export const updateTaskStatus = async (taskId, status) => {
  try {
    const response = await fetch(`${BASE_URL}/task/${taskId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to update task status");
    }
    return await response.json();
  } catch (error) {
    console.error("API Error (updateTaskStatus):", error);
    throw error;
  }
};

// Delete task
export const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`${BASE_URL}/task/${taskId}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to delete task");
    }
    return await response.json();
  } catch (error) {
    console.error("API Error (deleteTask):", error);
    throw error;
  }
};
