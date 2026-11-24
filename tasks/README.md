This is a [Next.js](https://nextjs.org) project with a Task Manager app and a Timer demo.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the task manager.

Open [http://localhost:3000/timer-demo](http://localhost:3000/timer-demo) to see the timer demo on its own page.

## Project Structure

- `src/types/task.ts` — shared `Task` interface.
- `src/lib/` — pure, framework-agnostic helpers (`formatDate`, `generateId`).
- `src/hooks/useLocalStorage.ts` — generic hook that persists state to `localStorage`.
- `src/hooks/useTimer.ts` — generic count-up/countdown timer hook (`start`, `pause`, `resume`, `toggle`, `reset`).
- `src/components/` — generic, reusable UI (`Button`, `Modal`, `Layout`, `TimerDemo`).
- `src/features/tasks/` — the tasks feature (`useTasks` hook, `TaskCard`, `TaskForm`), re-exported via `src/features/tasks/index.ts`.
- `src/app/page.tsx` — renders the task manager and the `TimerDemo`.
- `src/app/timer-demo/page.tsx` — renders only the `TimerDemo`.

## Known issue: countdown timer ticks too slowly

In `src/components/TimerDemo.tsx`, the countdown timer is created like this:

```tsx
const countdownTimer = useTimer(60, {
  direction: "down",
  onComplete: () => alert("Time's up!"), // new function reference on every render
});
```

`src/hooks/useTimer.ts` includes `onComplete` in the dependency array of the effect that manages
`setInterval`/`clearInterval`:

```ts
useEffect(() => {
  // ...starts setInterval...
  return () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };
}, [isRunning, direction, interval, onComplete]);
```

Because the count-up timer ticks every second, it re-renders `TimerDemo`, which recreates the
inline `onComplete` arrow function for the countdown timer. That new reference fails the effect's
dependency check, so React tears down and restarts the countdown's interval on almost every
render — starving it of a full second before being reset again. This makes the countdown appear
to tick much slower than once per second. The count-up timer isn't affected because it doesn't
pass an `onComplete` (always `undefined`, so its identity never changes).

### Fix

Memoize the callback so its identity stays stable across renders:

```tsx
import { useCallback } from "react";

// ...

const handleCountdownComplete = useCallback(() => alert("Time's up!"), []);

const countdownTimer = useTimer(60, {
  direction: "down",
  onComplete: handleCountdownComplete,
});
```
