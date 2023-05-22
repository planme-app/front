import React, { useEffect, useState } from 'react';
import MypageLayout from 'components/atoms/MypageLayout';
import MyInfo from 'components/atoms/MyInfo';
import { CustomButton } from 'components/atoms/CustomButton';

interface MypageSlideProps {
  open: boolean;
  email?: string;
  name?: string;
}

export default function MypageSlide({ open, email, name }: MypageSlideProps) {
  const [infoData, setInfoData] = useState([
    { title: 'EMAIL:', content: '12345@naver.com' },
    { title: 'NAME:', content: '홍길동' }
  ]);

  useEffect(() => {
    if (email && name) {
      setInfoData([
        { ...infoData[0], content: email },
        { ...infoData[1], content: name }
      ]);
    }
  }, [email, name]);

  return (
    <MypageLayout open={open}>
      {infoData.map((info, index) => (
        <MyInfo key={index} title={info.title} content={info.content} />
      ))}
      <CustomButton
        type="logout"
        display="flex"
        justifyContent="center"
        borderRadius="10px"
        backgroundColor="#FC5C5C"
        mt={15}
        px={4}
        height="35px"
        position="absolute"
        bottom="150px"
        color="#fff"
        width="250px"
      >
        로그아웃
      </CustomButton>
    </MypageLayout>
  );
}
