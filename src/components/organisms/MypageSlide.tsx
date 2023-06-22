import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import Cookies from 'js-cookie';
import CustomButton from 'components/atoms/CustomButton';
import MyInfo from 'components/atoms/MyInfo';
import MypageLayout from 'components/atoms/MypageLayout';
import { mypageState } from 'stores/routineStore';

interface MypageSlideProps {
  open: boolean;
  email: string | null;
  name: string | null;
}

export default function MypageSlide({ open, email, name }: MypageSlideProps) {
  const router = useRouter();
  const [infoData, setInfoData] = useState([
    { title: 'EMAIL:', content: '' },
    { title: 'NAME:', content: '' }
  ]);
  const [mypage, setMypage] = useRecoilState<boolean>(mypageState);

  const logout = () => {
    Cookies.remove('Authorization');
    Cookies.remove('userId');
    Cookies.remove('userName');
    Cookies.remove('userEmail');
    router.push('/login');
    setMypage(false);
  };

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
        onClick={logout}
      >
        로그아웃
      </CustomButton>
      <CustomButton
        display="flex"
        justifyContent="center"
        borderRadius="10px"
        backgroundColor="#D9D9D9"
        mt={15}
        px={4}
        position="absolute"
        bottom="100px"
        width="100px"
        height="35px"
        color="black"
        onClick={() => setMypage(false)}
      >
        뒤로가기
      </CustomButton>
    </MypageLayout>
  );
}
