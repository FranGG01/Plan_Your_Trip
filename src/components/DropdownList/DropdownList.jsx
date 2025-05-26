import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import "./DropdownList.css";
import { useTasks } from "../../hooks/useTasks";

function DropdownList({ categoria = "Alojamiento", isOpen, toggleCategory }) {
  const [taskInput, setTaskInput] = useState("");
  const { tasks, loading, addTask, removeTask, toggleTask } =
    useTasks(categoria);

  const handleAddTask = async () => {
    if (taskInput.trim() === "") return;

    await addTask(taskInput);
    setTaskInput("");
  };

  const handleDeleteTask = async (id) => {
    await removeTask(id);
  };

  const handleToggleDone = async (id, done) => {
    await toggleTask(id, !done);
  };

  return (
    <div className="mydropdown-container">
      <div
        className="mydropdown-header"
        onClick={() => toggleCategory(categoria)}
      >
        <p className="mydropdown-category">{categoria}</p>
        <button className="mydropdown-arrow">{isOpen ? "▲" : "▼"}</button>
      </div>

      {isOpen && (
        <div className="mydropdown-content">
          {loading ? (
            <p>Cargando tareas...</p>
          ) : (
            <>
              {tasks.map((task) => (
                <div key={task.id} className="mydropdown-task-item">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => handleToggleDone(task.id, task.done)}
                    className="mydropdown-radio"
                  />
                  <motion.p
                    initial={{ scale: 1 }}
                    animate={task.done ? { scale: 1.05 } : { scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    className={
                      task.done
                        ? "mydropdown-text mydropdown-done"
                        : "mydropdown-text"
                    }
                  >
                    {task.text}
                  </motion.p>

                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="mydropdown-delete-button"
                    aria-label="Eliminar tarea"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}

              <div className="mydropdown-add-task">
                <input
                  type="text"
                  placeholder="Escribe una tarea..."
                  value={taskInput}
                  onChange={(e) => setTaskInput(e.target.value)}
                />
                <button onClick={handleAddTask}>Agregar</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default DropdownList;
