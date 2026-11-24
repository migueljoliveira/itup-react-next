import { Suspense } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskListSkeleton from "./components/TaskListSkeleton";
import styles from "./tasks.module.css";

export default function TasksPage() {
  return (
    <main className={styles.page}>
      <h1>Tasks</h1>
      <div className={styles.layout}>
        <TaskForm />
        <section aria-label="Task list">
          <Suspense fallback={<TaskListSkeleton />}>
            <TaskList />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
