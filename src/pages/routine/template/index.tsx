import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button, Typography } from '@mui/material';
import { getTemplate } from 'controllers/services/api';
import { Template } from 'controllers/Entity/Template';
import MainBody from 'components/atoms/MainBody';
import RoutineTemplateCard from 'components/organisms/RoutineTemplateCard';
import BottomBar from 'components/organisms/BottomBar';

interface TemplateType {
  [key: string]: Template[];
}

export default function RoutineTemplatePage() {
  const router = useRouter();
  const [routineTemplate, setRoutineTemplate] = useState<TemplateType>({});

  const getTemplateApi = async () => {
    const res = await getTemplate();
    if (res.data === null) {
      setRoutineTemplate({});
    }
    setRoutineTemplate(res.data);
  };

  useEffect(() => {
    getTemplateApi();
  }, []);

  const goTemplateAdd = () => {
    router.push('template/add');
  };

  return (
    <>
      <Head>
        <title>addpage</title>
      </Head>
      <MainBody>
        <Typography
          sx={{
            display: 'inline',
            fontWeight: 'bold',
            fontSize: 30
          }}
        >
          습관 선택
        </Typography>
        <Button id="add-user" variant="contained" onClick={goTemplateAdd}>
          사용자 추가
        </Button>
        {Object.keys(routineTemplate).map((theme) => (
          <RoutineTemplateCard
            routineTheme={theme}
            routineList={routineTemplate[theme]}
            key={theme}
          />
        ))}
        <BottomBar state={1} />
      </MainBody>
    </>
  );
}
