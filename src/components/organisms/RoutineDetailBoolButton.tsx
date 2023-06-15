import React from 'react';
import { useRecoilState } from 'recoil';
import CustomButton from 'components/atoms/CustomButton';
import { routineList } from 'stores/routines';

export default function RoutineDetailBoolButton({
  routineId
}: {
  routineId: string;
}) {
  const [success, setSuccess] = useRecoilState(routineList);

  const checkSuccess = () => {
    setSuccess((prevRoutines) =>
      prevRoutines.map((prev) =>
        prev.routine_instance_id === routineId
          ? { ...prev, progress: true }
          : prev
      )
    );
  };
  const cancleSuccess = () => {
    setSuccess((prevRoutines) =>
      prevRoutines.map((prev) =>
        prev.routine_instance_id === routineId
          ? { ...prev, progress: false }
          : prev
      )
    );
  };

  return (
    <>
      <CustomButton
        type="startStop"
        display="flex"
        borderRadius="10px"
        backgroundColor="#556cd6"
        mt={15}
        px={3}
        height="35px"
        color="#fff"
        onClick={checkSuccess}
      >
        완료
      </CustomButton>
      <CustomButton
        type="startStop"
        display="flex"
        borderRadius="10px"
        backgroundColor="#ACB3BF"
        mt={2}
        px={1}
        height="35px"
        color="#fff"
        onClick={cancleSuccess}
      >
        실행 취소
      </CustomButton>
    </>
  );
}
