"use client";

import { useActionState } from "react";
import type { ActionState } from "@/types";
import { createTask } from "../actions";
import TaskFields from "./TaskFields";
import styles from "../tasks.module.css";

const initialState: ActionState = {};

export default function TaskForm() {
  const [state, formAction, isPending] = useActionState(createTask, initialState);

  return (
    <form action={formAction} className={styles.form}>
      <h2>New task</h2>
      <TaskFields state={state} />
      <button type="submit" className={styles.button} disabled={isPending}>
        {isPending ? "Saving..." : "Add task"}
      </button>
      {state.message && (
        <p className={state.success ? styles.success : styles.error} role="status">{state.message}</p>
      )}
    </form>
  );
}
