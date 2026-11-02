import { useEffect, useRef, useState } from "react";

const Stopwatch = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Store the timer ID without causing re-renders
  const timerRef = useRef<number | null>(null);

  // Clear the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Start the stopwatch
  const startTimer = () => {
    // Prevent multiple intervals from starting
    if (timerRef.current !== null) return;

    setIsRunning(true);

    timerRef.current = window.setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  // Pause the stopwatch
  const pauseTimer = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setIsRunning(false);
  };

  // Reset the stopwatch
  const resetTimer = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setIsRunning(false);
    setSeconds(0);
  };

  // Convert seconds into HH:MM:SS format
  const formatTime = () => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");

    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-[#F7F4EF] px-5 py-12">
      <div className="w-full max-w-100 rounded-2xl border border-[#E7DFD5] bg-white p-8 text-center shadow-xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[3px] text-[#6F6678]">
          React Practice
        </p>

        <h1 className="mb-8 text-3xl font-bold text-[#21152B]">Stopwatch</h1>

        <div className="mb-8 rounded-xl bg-[#21152B] px-4 py-8">
          <p className="mb-3 text-sm text-[#F7F4EF]">Elapsed Time</p>

          <p className="font-mono text-4xl font-bold tracking-wider text-[#D7FF64]">
            {formatTime()}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={startTimer}
            disabled={isRunning}
            className="cursor-pointer rounded-lg bg-[#21152B] px-5 py-2.5 font-semibold text-white transition hover:bg-[#342442] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Start
          </button>

          <button
            onClick={pauseTimer}
            disabled={!isRunning}
            className="cursor-pointer rounded-lg border border-[#21152B] px-5 py-2.5 font-semibold text-[#21152B] transition hover:bg-[#F7F4EF] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Pause
          </button>

          <button
            onClick={resetTimer}
            className="cursor-pointer rounded-lg bg-[#D7FF64] px-5 py-2.5 font-semibold text-[#21152B] transition hover:bg-[#c6f34d]"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
