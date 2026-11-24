"use client";

import { useState } from "react";

// Define types for the component
interface Settings {
  maxClicks: number;
  showHistory: boolean;
}
interface ClickEvent {
  timestamp: Date;
  count: number;
}

const COLORS = ["blue", "green", "orange", "purple", "red"];

function ClickTracker() {
  // 1. Basic counter
  const [count, setCount] = useState<number>(0);
  // 2. Color state
  const [buttonColor, setButtonColor] = useState<string>("blue");
  // 3. Settings object
  const [settings, setSettings] = useState<Settings>({
    maxClicks: 20,
    showHistory: false,
  });
  // 4. Click history array
  const [history, setHistory] = useState<ClickEvent[]>([]);

  const maxReached = count >= settings.maxClicks;

  const handleClick = () => {
    if (maxReached) return;

    setCount((prev) => {
      const newCount = prev + 1;
      setButtonColor(COLORS[Math.floor(newCount / 5) % COLORS.length]);
      setHistory((prevHistory) => [...prevHistory, { timestamp: new Date(), count: newCount }]);
      return newCount;
    });
  };

  const handleReset = () => {
    setCount(0);
    setButtonColor("blue");
    setHistory([]);
  };

  const handleToggleHistory = () => {
    setSettings((prev) => ({ ...prev, showHistory: !prev.showHistory }));
  };

  const handleMaxClicksChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setSettings((prev) => ({ ...prev, maxClicks: value }));
  };

  return (
    <div>
      <p>
        Clicks: {count} / {settings.maxClicks}
      </p>

      {count > 10 && <p>reached 10!</p>}

      <button
        onClick={handleClick}
        disabled={maxReached}
        style={{ backgroundColor: buttonColor, color: "white" }}
      >
        {maxReached ? "Max clicks reached" : "Click me"}
      </button>

      <button onClick={handleReset}>Reset</button>

      <div>
        <label>
          Max clicks:{" "}
          <input
            type="number"
            min={1}
            value={settings.maxClicks}
            onChange={handleMaxClicksChange}
          />
        </label>
      </div>

      <button onClick={handleToggleHistory}>
        {settings.showHistory ? "Hide history" : "Show history"}
      </button>

      {settings.showHistory && (
        <ul>
          {history.map((event, index) => (
            <li key={index}>
              #{event.count} at {event.timestamp.toLocaleTimeString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ClickTracker;