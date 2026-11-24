'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { errorMessages, getErrorType } from '@/lib/errors'
import styles from './error-demo.module.css'
interface ErrorProps {
  error: unknown


  retry: () => void
}
// Not named `Error`: that would hide the built-in Error class used below
export default function ErrorDemoError({ error, retry }: ErrorProps) {
  const type = getErrorType(error)
  const { icon, title, hint } = errorMessages[type]
  const message = error instanceof Error ? error.message : String(error)
  const digest = error instanceof Error && 'digest' in error ? String(error.digest) : undefined
  useEffect(() => {
    // In a real app, send this to a monitoring service (Sentry, Datadog...)
    console.error('[error-demo]', { type, message, digest, time: new Date().toISOString() })
  }, [type, message, digest])
  return (
    <div className={styles.errorBox} role="alert">
      <span className={styles.icon}>{icon}</span>
      <h2>{title}</h2>
      <p>{hint}</p>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => retry()}>
          Try again
        </button>
        <Link className={styles.button} href="/">
          Go home
        </Link>
      </div>
      <p className={styles.muted}>
        Still not working? <a href="mailto:support@example.com">Contact support</a>
      </p>
      <details className={styles.details}>
        <summary>Technical details</summary>
        <pre>
          Type: {type}
          {'\n'}Message: {message}
          {digest && `\nDigest: ${digest}`}
        </pre>
      </details>
    </div>
  )
}