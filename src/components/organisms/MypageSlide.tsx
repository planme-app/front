import React, { useEffect, useState } from 'react';
import CustomButton from 'components/atoms/CustomButton';
import MyInfo from 'components/atoms/MyInfo';
import MypageLayout from 'components/atoms/MypageLayout';

interface MypageSlideProps {
  open: boolean;
  email: string | null;
  name: string | null;
}

export default function MypageSlide({ open, email, name }: MypageSlideProps) {
  const [infoData, setInfoData] = useState([
    { title: 'EMAIL:', content: '' },
    { title: 'NAME:', content: '' }
  ]);

  useEffect(() => {
    if (email && name) {
      setInfoData([
        { title: 'EMAIL:', content: email },
        { title: 'NAME:', content: name !== 'undefined' ? name : 'unknown' }
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
