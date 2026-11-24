"use client";

import { useActionState, useState, useTransition } from "react";
import type { ActionState, Task } from "@/types";
import { deleteTask, toggleTaskComplete, updateTask, uploadTaskAttachment } from "../actions";
import TaskFields from "./TaskFields";
import styles from "../tasks.module.css";

export default function TaskCard({ task }: { task: Task }) {
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const updateThisTask = updateTask.bind(null, task.id);
  const [editState, editAction, isSaving] = useActionState(
    async (previous: ActionState, formData: FormData) => {
      const result = await updateThisTask(previous, formData);
      if (result.success) setIsEditing(false);
      return result;
    },
    {}
  );
  const [uploadState, uploadAction, isUploading] = useActionState(
    uploadTaskAttachment.bind(null, task.id),
    {}
  );

  function toggleCompleted() {
    startTransition(async () => {
      const result = await toggleTaskComplete(task.id);
      setMessage(result.message ?? "");
    });
  }

  function removeTask() {
    if (!window.confirm(`Delete "${task.title}"?`)) return;
    startTransition(async () => {
      const result = await deleteTask(task.id);
      setMessage(result.message ?? "");
    });
  }

  return (
    <article className={`${styles.card} ${task.completed ? styles.completed : ""}`}>
      {isEditing ? (
        <form action={editAction} className={styles.form}>
          <TaskFields task={task} state={editState} />
          <div className={styles.actions}>
            <button type="submit" className={styles.button} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </button>
            <button type="button" className={styles.secondary} onClick={() => setIsEditing(false)} disabled={isSaving}>
              Cancel
            </button>
          </div>
          {editState.message && <p className={styles.error} role="alert">{editState.message}</p>}
        </form>
      ) : (
        <>
          <h2 className={styles.title}>{task.title}</h2>
          {task.description && <p>{task.description}</p>}
          <p>
            <span className={`${styles.badge} ${styles[task.priority]}`}>{task.priority}</span>
            {task.completed && <span className={styles.muted}> Completed</span>}
          </p>
          {task.attachment && <p className={styles.muted}>Attachment: {task.attachment}</p>}
          <div className={styles.actions}>
            <button type="button" className={styles.secondary} onClick={toggleCompleted} disabled={isPending}>
              {task.completed ? "Mark incomplete" : "Mark complete"}
            </button>
            <button type="button" className={styles.secondary} onClick={() => setIsEditing(true)} disabled={isPending}>
              Edit
            </button>
            <button type="button" className={styles.secondary} onClick={removeTask} disabled={isPending}>
              Delete
            </button>
          </div>
          {message && <p className={styles.error} role="alert">{message}</p>}
          <form action={uploadAction} className={styles.upload}>
            <label>
              Attachment
              <input type="file" name="attachment" />
            </label>
            <button type="submit" className={styles.secondary} disabled={isUploading}>
              {isUploading ? "Attaching..." : "Attach"}
            </button>
            {uploadState.message && (
              <p className={uploadState.success ? styles.success : styles.error} role="status">
                {uploadState.message}
              </p>
            )}
          </form>
        </>
      )}
    </article>
  );
}
