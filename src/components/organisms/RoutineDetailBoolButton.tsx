import React from 'react';
import { useRecoilState } from 'recoil';
import CustomButton from 'components/atoms/CustomButton';
import { boolStateRecoil } from 'stores/routineDetailType';

export default function RoutineDetailBoolButton() {
  const [success, setSuccess] = useRecoilState(boolStateRecoil);
  const checkSuccess = () => {
    setSuccess(true);
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
        onClick={checkSuccess}
      >
        실행 취소
      </CustomButton>
    </>
  );
}
