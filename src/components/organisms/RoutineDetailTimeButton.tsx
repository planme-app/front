import React from 'react';
import CustomButton from 'components/atoms/CustomButton';
import UseTimer from 'components/atoms/UseTimer';

export default function RoutineDetailTimeButton({
  running,
  routineId
}: {
  running: boolean;
  routineId?: string;
}) {
  const { start, stop, reset } = UseTimer({ routineId });

  const startStopTimer = () => {
    if (!running) {
      start();
    } else {
      stop();
    }
  };

  const resetTimer = () => {
    reset();
  };

  return running ? (
    <>
      <CustomButton
        type="startStop"
        display="flex"
        borderRadius="10px"
        backgroundColor="#556cd6"
        mt={15}
        px={4}
        height="35px"
        color="#fff"
        onClick={startStopTimer}
      >
        일시정지
      </CustomButton>
      <CustomButton
        type="resetDelete"
        display="flex"
        borderRadius="10px"
        backgroundColor="#ACB3BF"
        mt={4}
        px={1}
        height="30px"
        color="#fff"
        onClick={resetTimer}
      >
        Reset
      </CustomButton>
    </>
  ) : (
    <>
      <CustomButton
        type="startStop"
        display="flex"
        borderRadius="10px"
        backgroundColor="#556cd6"
        mt={15}
        px={4}
        height="35px"
        color="#fff"
        onClick={startStopTimer}
      >
        시작
      </CustomButton>
    </>
  );
}
