import React, { useState } from 'react';
import MypageLayout from 'components/atoms/MypageLayout';
import MyInfo, { MyInfoProps } from 'components/atoms/MyInfo';
import { MypageLogoutButton } from 'components/atoms/LogoutButton';

interface MypageSlideProps extends MyInfoProps {
  open: boolean;
}

export default function MypageSlide({
  open,
  title,
  content
}: MypageSlideProps) {
  const [nameTitle, SetNameTitle] = useState<string>('NAME:');
  const [userName, SetUserName] = useState<string>('홍길동');
  return (
    <MypageLayout open={open}>
      <MyInfo title={title} content={content} />
      <MyInfo title={nameTitle} content={userName} />
      <MypageLogoutButton />
    </MypageLayout>
  );
}
