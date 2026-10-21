import { useState } from "react";

function todayString() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatDate(dateString) {
  return new Date(dateString + "T00:00:00").toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

  const isOverdue = task.dueDate && !task.done && task.dueDate < todayString();

  function startEditing() {
    setDraft(task.title);
    setIsEditing(true);
  }

  function save() {
    const trimmed = draft.trim();
    if (trimmed !== "") onEdit(task.id, trimmed);
    setIsEditing(false);
  }

  function cancel() {
    setIsEditing(false);
  }

  return (
    <li className="task-item">
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />

      {isEditing ? (
        <input
          className="edit-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") save();
            if (e.key === "Escape") cancel();
          }}
          onBlur={cancel}
          autoFocus
        />
      ) : (
        <span
          className={`task-title ${task.done ? "done" : ""}`}
          onDoubleClick={startEditing}
          title="Double-click to edit"
        >
          {task.title}
        </span>
      )}

      {task.dueDate && (
        <span className={`due ${isOverdue ? "overdue" : ""}`}>
          {isOverdue ? "Overdue · " : ""}
          {formatDate(task.dueDate)}
        </span>
      )}

      <button className="delete-btn" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </li>
  );
}

export default TaskItem;