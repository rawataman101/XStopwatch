import "./index.css";
import { useEffect, useState } from "react";

export default function App() {
  const [time, setTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const handlingStartStop = () => {
    setIsRunning(!isRunning);
  };
  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setTime(0);
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  return (
    <div className="App">
      <h1>Stopwatch</h1>
      <p>Time: {formatTime(elapsedTime)}</p>
      <button onClick={handlingStartStop}>
        {isRunning ? "Stop" : "Start"}
      </button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
