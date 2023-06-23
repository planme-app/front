import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { routineList, timerState } from 'stores/routineStore';

interface TimeType {
  routineId?: string;
}

export default function UseTimer({ routineId }: TimeType) {
  const [running, setRunning] = useRecoilState(timerState);
  const [routines, setRoutines] = useRecoilState(routineList);

  useEffect(() => {
    if (running) {
      const interval = setInterval(() => {
        setRoutines((prevRoutines) =>
          prevRoutines.map((prev) =>
            prev.routine_instance_id === routineId &&
            typeof prev.progress === 'number' &&
            typeof prev.goal === 'number' &&
            prev.progress < prev.goal
              ? { ...prev, progress: prev.progress + 1 }
              : prev
          )
        );
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [running]);

  const start = () => setRunning(true);
  const stop = () => setRunning(false);
  const reset = () => {
    setRunning(false);
    setRoutines((prevRoutines) =>
      prevRoutines.map((prev) =>
        prev.routine_instance_id === routineId &&
        typeof prev.progress === 'number'
          ? { ...prev, progress: 0 }
          : prev
      )
    );
  };

  return {
    start,
    stop,
    reset
  };
}
