import { Suspense } from "react";
import ServerErrorComponent from "../components/ServerErrorComponent";
import styles from "../error-demo.module.css";

export default function ServerErrorPage() {
  return (
    <main className={styles.page}>
      <h1>Server error</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <ServerErrorComponent shouldFail />
      </Suspense>
    </main>
  );
}
