import { useEffect, useState } from "react";

const mockData = {
  Alojamiento: [
    { id: 1, text: "Reservar hotel", done: false },
    { id: 2, text: "Buscar Airbnb", done: true },
  ],
  Gastronomia: [
    { id: 3, text: "Probar comida local", done: false },
  ],
  Tours: [
    { id: 4, text: "Reservar tour guiado", done: false },
  ],
  Transporte: [],
  Presupuesto: [],
};

export const useTasks = (categoria) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula un "fetch"
    setLoading(true);
    const timeout = setTimeout(() => {
      setTasks(mockData[categoria] || []);
      setLoading(false);
    }, 500); // simula demora de carga

    return () => clearTimeout(timeout);
  }, [categoria]);

   const handleToggleDone = (id, done) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !done } : task
      )
    );
  };

   const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleAddTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      done: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  return {
    tasks,
    loading,
    handleToggleDone,
    handleDeleteTask,
    handleAddTask,
  };
};

export default useTasks;
