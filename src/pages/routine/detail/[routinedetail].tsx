import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  ParsedUrlQuery
} from 'next';
import Head from 'next/head';
import { Stack } from '@mui/material';
import LoginBody from 'components/atoms/LoginBody';
import Header from 'components/organisms/Header';
import RoutinePercent from 'components/atoms/RoutinePercent';
import CustomButton from 'components/atoms/CustomButton';

export interface DoProps {
  params: {
    routinsDetail: string;
  };
}

export default function Do({
  params
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(params.routinsDetail);
  return (
    <>
      <Head>
        <title>진행 중...</title>
      </Head>
      <LoginBody>
        <Header page={'detail'} />
        <Stack minHeight={'74vh'} direction="column" alignItems="center">
          <RoutinePercent size={300} />
          <CustomButton
            type="startStop"
            display="flex"
            borderRadius="10px"
            backgroundColor="#556cd6"
            mt={15}
            px={4}
            height="35px"
            color="#fff"
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
          >
            리셋
          </CustomButton>
        </Stack>
      </LoginBody>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  DoProps,
  ParsedUrlQuery
> = async (context) => {
  const { routinsDetail } = context.params ?? {};

  // `routinsDetail` 매개변수를 사용하여 서버 사이드 로직을 수행할 수 있습니다.

  return {
    props: {
      params: {
        routinsDetail: routinsDetail ?? ''
      }
    }
  };
};
