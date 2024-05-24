import { useState, useRef, useEffect } from "react";
import "./countdown.css";

// custom Hook to use CountdownTimer
const CountdownTimer = (intialMinutes, initialSeconds) => {
  const [time, setTime] = useState(intialMinutes * 60 + initialSeconds);
  const [started, setStarted] = useState(false);
  const intervalRef = useRef();

  // componentDidMount, componentDidUpdate, componentShallUnmount - takes cb and what var it depends on
  useEffect(() => {
    if (started) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          if (prev > 0) return prev - 1;
          else {
            clearInterval(intervalRef.current);
            return 0;
          }
        });
      }, 1000);
    } else clearInterval(intervalRef.current);
  }, [started]);

  // start will take minutes and seconds & set timer for those many seconds, make it active
  const start = (minutes, seconds) => {
    setTime(minutes * 60 + seconds);
    setStarted(true);
  };

  // pauseresume will toggle started
  const pauseresume = () => {
    setStarted(!started);
  };

  // reset will take minutes and secongs and set timer again with started false
  const reset = (minutes, seconds) => {
    clearInterval(intervalRef.current);
    setTime(minutes * 60 + seconds);
    setStarted(false);
  };

  // time format of MM:SS
  const displayTimeFormat = (time) => {
    var minTime = Math.floor(time / 60);
    var secTime = time % 60;
    return `${String(minTime).padStart(2, "0")}:${String(secTime).padStart(
      2,
      "0"
    )}`;
  };

  return { time, start, pauseresume, reset, displayTimeFormat };
};

// Main functional component in which the above custome hook will be used
export default Countdown = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const { time, start, pauseresume, reset, displayTimeFormat } = CountdownTimer(
    minutes,
    seconds
  );

  const handleReset = () => {
    reset(minutes, seconds);
  };

  const handleStart = async () => {
    await handleReset();
    start(minutes, seconds);
  };

  const handlePauseResume = () => {
    pauseresume();
  };

  return (
    <div>
      <h1>Timer</h1>
      <div>
        <input
          type="number"
          value={minutes}
          onChange={(e) => {
            setMinutes(Number(e.target.value));
          }}
        />
        <label>Minutes</label>
        <input
          type="number"
          value={seconds}
          onChange={(e) => {
            setSeconds(
              Number(e.target.value) > 59 ? 59 : Number(e.target.value)
            );
          }}
        />
        <label>Seconds</label>
        <button onClick={handleStart}>Start</button>
      </div>
      <div>
        <button onClick={handlePauseResume}>Pause/Resume</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div>
        <h1>{displayTimeFormat(time)}</h1>
      </div>
    </div>
  );
};
