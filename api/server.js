const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors()); // Permitir todas las conexiones (CORS)
app.use(express.json());

// Almacenamiento en memoria
let tasks = [];

// Obtener todas las tareas
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Crear una nueva tarea
app.post('/tasks', (req, res) => {
  const { done, id, text, categoria } = req.body;
  const newTask = { done, id, text, categoria };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Actualizar una tarea por id
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { done, text, categoria } = req.body;
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.done = done !== undefined ? done : task.done;
    task.text = text !== undefined ? text : task.text;
    task.categoria = categoria !== undefined ? categoria : task.categoria;
    res.json(task);
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});

// Eliminar una tarea por id
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(t => t.id === id);
  if (index !== -1) {
    const deletedTask = tasks.splice(index, 1);
    res.json(deletedTask);
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});

// Puerto de escucha
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
