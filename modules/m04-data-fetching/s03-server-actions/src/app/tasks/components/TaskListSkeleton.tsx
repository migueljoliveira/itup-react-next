import styles from "../tasks.module.css";

export default function TaskListSkeleton() {
  return (
    <div className={styles.skeletonList} role="status" aria-label="Loading tasks">
      <div className={styles.skeleton} />
      <div className={styles.skeleton} />
      <div className={styles.skeleton} />
    </div>
  );
}
