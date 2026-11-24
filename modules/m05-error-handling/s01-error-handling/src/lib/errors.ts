export type ErrorType = 'network' | 'auth' | 'server' | 'unknown'
// Client errors keep their message. Server Component errors reach the browser
// with a digest; in production their message is replaced by a generic one.
export function getErrorType(error: unknown): ErrorType {
  if (!(error instanceof Error)) return 'unknown'
  if (error.message.startsWith('Network:')) return 'network'
  if (error.message.startsWith('Auth:')) return 'auth'
  if ('digest' in error && error.digest) return 'server'
  return 'unknown'
}
export const errorMessages: Record<ErrorType, { icon: string; title: string; hint: string }> = {
  network: { icon: 'ðŸ“¡', title: 'Connection problem', hint: 'Check your internet connection and try again.' },
  auth: { icon: 'ðŸ”’', title: 'Please sign in again', hint: 'Your session may have expired.' },
  server: { icon: 'ðŸ–¥ï ̧', title: 'Server error', hint: 'Something went wrong on our side. Try again in a moment.' },
  unknown: { icon: 'âš ï ̧', title: 'Unexpected error', hint: 'Try again. If it keeps happening, contact support.' },
}