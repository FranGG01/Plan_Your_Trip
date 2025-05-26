import { API_BASE_URL	 } from "../config/api";

export const getTasksByCategory = async (categoria) => {
    try {
    const response = await fetch(`${API_BASE_URL}/tasks?category=${categoria}`);
    if (!response.ok) {
        throw new Error("Error al obtener tareas desde la API");
    }
    const data = await response.json();
    return data;
      } catch (error) {
        console.error("Error en getTasksByCategory:", error);
        throw error;
    }   
};

export const createTask = async (task) => {
    try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    if (!response.ok) {
        throw new Error(`Error al crear tarea: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
} catch (error) {
    console.error("Error en createTask:", error);
    throw error;
}
};
export const deleteTask = async (taskId) => {
    try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`Error al eliminar tarea: ${response.statusText}`);
    }
    return true;
} catch (error) {
    console.error("Error en deleteTask:", error);
    throw error;
}
};

export const toggleTaskDone = async (taskId, done) => {
    try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ done }),
    });
    if (!response.ok) {
        throw new Error(`Error al actualizar tarea: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
} catch (error) {  
    console.error("Error en toggleTaskDone:", error);
    throw error;
}
};