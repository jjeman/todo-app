import { useState } from "react";

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

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

      <button className="delete-btn" onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </li>
  );
}

export default TaskItem;