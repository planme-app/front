import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { timerState, timeStateRecoil } from 'stores/routineDetailType';

export default function UseTimer() {
  const [running, setRunning] = useRecoilState(timerState);
  const [recoilTime, setRecoilTime] = useRecoilState(timeStateRecoil);

  useEffect(() => {
    if (running) {
      const interval = setInterval(() => {
        setRecoilTime((prevTime) => {
          if (prevTime.progress < recoilTime.goal) {
            const nextTime = prevTime.progress + 1;
            return {
              ...prevTime,
              progress: nextTime,
              time: `${String(Math.floor(nextTime / 60)).padStart(
                2,
                '0'
              )}:${String(nextTime % 60).padStart(2, '0')}`,
              percent: Math.floor((nextTime / prevTime.goal) * 100)
            };
          } else {
            clearInterval(interval);
            return prevTime;
          }
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [running]);

  const start = () => setRunning(true);
  const stop = () => setRunning(false);
  const reset = () => {
    setRunning(false);
    setRecoilTime({ ...recoilTime, progress: 0, time: '00:00', percent: 0 });
  };

  return {
    time: recoilTime.time,
    start,
    stop,
    reset
  };
}
