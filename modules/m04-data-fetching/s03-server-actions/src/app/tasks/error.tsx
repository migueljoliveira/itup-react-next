"use client";

import { useEffect } from "react";
import styles from "./tasks.module.css";

export default function TaskError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={styles.page}>
      <h1>Something went wrong</h1>
      <p>We couldn&apos;t load or update your tasks.</p>
      <button type="button" className={styles.button} onClick={retry}>Try again</button>
    </main>
  );
}
