import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import "./DropdownList.css";




function DropdownList({ categoria = "Alojamiento", isOpen, toggleCategory }) {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");


  useEffect(() => {
    fetch("https://jubilant-space-barnacle-4jwjg7qwr9xpf577g-3000.app.github.dev/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.filter((task) => task.categoria === categoria))
      })
      .catch(() => console.log("ERROR"))
  }, [categoria]);


  const handleAddTask = () => {
    if (taskInput.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: taskInput,
      done: false,
      categoria,
    };

    fetch("https://jubilant-space-barnacle-4jwjg7qwr9xpf577g-3000.app.github.dev/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((savedTask) => {
        setTasks([savedTask, ...tasks]);
        setTaskInput("");
      })
      .catch(() => console.log("ERROR"))
  };

  const handleDeleteTask = (id) => {
    fetch(`https://jubilant-space-barnacle-4jwjg7qwr9xpf577g-3000.app.github.dev/tasks/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch(() => console.log("ERROR"))
  };

  const handleToggleDone = (id) => {

    const filteredTasks = tasks.filter((task) => task.id === id);
    if(filteredTasks.length === 0) return;

    const taskToUpdate = filteredTasks[0];
    const updatedTask = { ...taskToUpdate, done: !taskToUpdate.done };


    fetch(`https://jubilant-space-barnacle-4jwjg7qwr9xpf577g-3000.app.github.dev/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    })
      .then((res) => res.json())
      .then(() => {
        setTasks(
          tasks.map((task) =>
            task.id === id ? updatedTask : task
          )
        );
      })
      .catch(() => console.log("ERROR"))


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
          {tasks.map((task) => (
            <div key={task.id} className="mydropdown-task-item">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => handleToggleDone(task.id)}
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
        </div>
      )}
    </div>
  );
}

export default DropdownList;
