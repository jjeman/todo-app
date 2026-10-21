import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (text.trim() === "") return;
    const newTask = { id: Date.now(), title: text, done: false, dueDate };
    setTasks([...tasks, newTask]);
    setText("");
    setDueDate("");
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function editTask(id, newTitle) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  }

  const remaining = tasks.filter((t) => !t.done).length;

  const visibleTasks = tasks.filter((task) => {
    if (filter === "active") return !task.done;
    if (filter === "completed") return task.done;
    return true;
  });

  return (
    <div className="app">
      <div className="card">
        <h1 className="title">My To-Do List</h1>

        <div className="add-form">
  <input
    className="task-input"
    type="text"
    value={text}
    onChange={(e) => setText(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && addTask()}
    placeholder="Add a task..."
  />
  <label className="date-field">
    <span className="date-label">Due date (optional)</span>
    <input
      type="date"
      className="date-input"
      value={dueDate}
      onChange={(e) => setDueDate(e.target.value)}
    />
  </label>
  <button className="add-btn" onClick={addTask}>
    Add
  </button>
</div>

        <p className="counter">
          {remaining} {remaining === 1 ? "task" : "tasks"} remaining
        </p>

        <div className="filters">
          {["all", "active", "completed"].map((name) => (
            <button
              key={name}
              className={`filter-btn ${filter === name ? "active" : ""}`}
              onClick={() => setFilter(name)}
            >
              {name}
            </button>
          ))}
        </div>

        <ul className="task-list">
          {visibleTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          ))}
        </ul>

        {visibleTasks.length === 0 && (
          <p className="empty">Nothing here yet.</p>
        )}
      </div>
    </div>
  );
}


export default App;