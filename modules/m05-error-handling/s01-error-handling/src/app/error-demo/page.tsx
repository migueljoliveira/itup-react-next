import { Suspense } from 'react'
import Link from 'next/link'
import ErrorTriggers from './components/ErrorTriggers'
import ServerErrorComponent from './components/ServerErrorComponent'
import styles from './error-demo.module.css'
export default function ErrorDemoPage() {
  return (
    <main className={styles.page}>
      <h1>Error Handling Demo</h1>
      <p>This page demonstrates various error scenarios in Next.js.</p>
      <section className={styles.section}>
        <h2>Client-side error triggers</h2>
        <ErrorTriggers />
      </section>
      <section className={styles.section}>
        <h2>Server Component</h2>
        <Suspense fallback={<p>Loading server component...</p>}>
          <ServerErrorComponent />
        </Suspense>
      </section>
      <section className={styles.section}>
        <h2>Routes to test</h2>
        <div className={styles.links}>
          <Link href="/error-demo/server-error">Server error</Link>
          <Link href="/error-demo/items/1">Existing item</Link>
          <Link href="/error-demo/items/99">Missing item (notFound)</Link>
          <Link href="/error-demo/does-not-exist">Unknown URL</Link>
        </div>
      </section>
    </main>
  )
}