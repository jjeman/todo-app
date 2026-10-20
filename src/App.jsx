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
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (text.trim() === "") return;
    const newTask = { id: Date.now(), title: text, done: false };
    setTasks([...tasks, newTask]);
    setText("");
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

    return (
  <div className="app">
    <div className="card">
      <h1 className="title">My To-Do List</h1>

      <div className="add-form">
        <input
          className="task-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Add a task..."
        />
        <button className="add-btn" onClick={addTask}>
          Add
        </button>
      </div>

      <p className="counter">
        {tasks.filter((t) => !t.done).length} tasks remaining
      </p>

      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </ul>
    </div>
  </div>
);
}

export default App;