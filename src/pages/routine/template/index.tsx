import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import { Typography } from '@mui/material';
import MainBody from 'components/atoms/MainBody';
import RoutineTemplateCard from 'components/organisms/RoutineTemplateCard';
import { getTemplate } from '@/controllers/services/api';
import { Template } from '@/controllers/Entity/Template';

interface TemplateType {
  [key: string]: Template[];
}

export default function RoutineTemplatePage() {
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
        {Object.keys(routineTemplate).map((theme) => (
          <RoutineTemplateCard
            routineTheme={theme}
            routineList={routineTemplate[theme]}
            key={theme}
          />
        ))}
      </MainBody>
    </>
  );
}
