function TaskItem({ task, onToggle, onDelete }) {
  return (
  <li className="task-item">
    <input
      type="checkbox"
      checked={task.done}
      onChange={() => onToggle(task.id)}
    />
    <span className={`task-title ${task.done ? "done" : ""}`}>
      {task.title}
    </span>
    <button className="delete-btn" onClick={() => onDelete(task.id)}>
      Delete
    </button>
  </li>
);
}

export default TaskItem;