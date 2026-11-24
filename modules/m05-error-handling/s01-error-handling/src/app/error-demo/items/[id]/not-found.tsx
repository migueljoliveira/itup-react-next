import Link from "next/link";
import styles from "../../error-demo.module.css";

export default function ItemNotFound() {
  return (
    <main className={styles.errorBox}>
      <p className={styles.notFoundCode}>404</p>
      <h1>Item not found</h1>
      <p>We couldn&apos;t find an item with that id.</p>
      <Link href="/error-demo">Back to demo</Link>
    </main>
  );
}
