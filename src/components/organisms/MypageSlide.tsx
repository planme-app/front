import React, { useEffect, useState } from 'react';
import MypageLayout from 'components/atoms/MypageLayout';
import MyInfo from 'components/atoms/MyInfo';
import { MypageLogoutButton } from 'components/atoms/LogoutButton';

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
  }, []);

  return (
    <MypageLayout open={open}>
      {infoData.map((info, index) => (
        <MyInfo key={index} title={info.title} content={info.content} />
      ))}
      <MypageLogoutButton />
    </MypageLayout>
  );
}
