"use client";

import { JSX, useEffect, useState } from 'react'
interface TimerMessageProps {
duration?: number
message?: string
}
 

export default function TimerMessage({ duration = 5, message = "Time's up!" }: TimerMessageProps):JSX.Element {
const [timeLeft, setTimeLeft] = useState<number>(duration)
const [isFinished, setIsFinished] = useState<boolean>(false)
const [isCancelled, setIsCancelled] = useState<boolean>(false)
 
 
useEffect(() => {
if (timeLeft === 0) setIsFinished(true);
if (isFinished || isCancelled) return;
const timer = setInterval(() => {
setTimeLeft(prev => (prev <= 1 ? 0 : prev - 1));
}, 1000);
return () => clearInterval(timer);
}, [isFinished, timeLeft, isCancelled]);
 
const handleCancel = (): void => {
// Cancel logic here
setIsCancelled(true);
setIsFinished(false);
}
const handleReset = (): void => {
setTimeLeft(duration)
setIsCancelled(false);
setIsFinished(false);
}
return (
<div className="timer-message">
{!isFinished && !isCancelled && (
<div>
<h3>Message in: {timeLeft} seconds</h3>
<button onClick={handleCancel}>Cancel</button>
<button onClick={handleReset}>Reset</button>
</div>
)}
{isFinished && <h2>{message}</h2>}
{isCancelled && <h2>Timer cancelled</h2>}
</div>
)
}