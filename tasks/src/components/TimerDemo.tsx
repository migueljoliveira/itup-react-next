"use client";

import Button from "@/components/Button";

import { useTimer } from "../hooks/useTimer";

export default function TimerDemo() {
  const countUpTimer = useTimer(0);

  const countdownTimer = useTimer(60, {
    direction: "down",
    onComplete: () => alert("Time's up!"),
  });

  const pausedCountUpTimer = useTimer(10, { startPaused: true });

  const timers = [
    { label: "Count Up (from 0)", timer: countUpTimer },
    { label: "Countdown (from 60)", timer: countdownTimer },
    { label: "Paused Count Up (from 10)", timer: pausedCountUpTimer },
  ];

  return (
    <section>
      <h2>Timer Demo</h2>
      {timers.map(({ label, timer }) => (
        <div key={label}>
          <h3>{label}</h3>
          <p>
            Time: {timer.time}s &mdash; {timer.isRunning ? "Running" : "Paused"}
          </p>
          <Button title="Start" action={timer.start} />
          <Button title="Pause" action={timer.pause} />
          <Button title="Resume" action={timer.resume} />
          <Button title="Toggle" action={timer.toggle} />
          <Button title="Reset" action={timer.reset} />
        </div>
      ))}
    </section>
  );
}
