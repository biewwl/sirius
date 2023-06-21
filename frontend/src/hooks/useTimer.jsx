import { useEffect, useState } from "react";
import elapsedTime from "../helpers/elapsedTime";

function useTimer(date) {
  const [currentTimer, setCurrentTimer] = useState("...");
  const [currentFormat, setCurrentFormat] = useState("");

  useEffect(() => {
    const getTimer = () => {
      const interval = setInterval(() => {
        const { timer, format } = elapsedTime(date);
        setCurrentTimer(timer);
        setCurrentFormat(format);
      }, 1000);
      return interval;
    };
    const interval = getTimer();
    return () => clearInterval(interval);
  }, [date]);

  return [currentTimer, currentFormat];
}

export default useTimer;