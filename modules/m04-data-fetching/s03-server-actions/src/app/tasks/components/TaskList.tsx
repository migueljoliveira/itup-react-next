import { db } from "@/lib/tasks";
import TaskCard from "./TaskCard";
import styles from "../tasks.module.css";

export default async function TaskList() {
  const tasks = await db.findAll();
  if (tasks.length === 0) {
    return <p className={styles.muted}>No tasks yet. Add one with the form.</p>;
  }

  return (
    <ul className={styles.list}>
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskCard task={task} />
        </li>
      ))}
    </ul>
  );
}
