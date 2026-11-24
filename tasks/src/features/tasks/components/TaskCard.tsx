"use client";

import { formatDate } from "@/lib/formatDate";
import { Task } from "@/types/task";

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
}

export default function TaskCard({ task, onToggle }: TaskCardProps) {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span
          style={{ textDecoration: task.completed ? "line-through" : "none" }}
        >
          {task.title}
        </span>
      </label>
      <small>{formatDate(task.createdAt)}</small>
    </div>
  );
}
